import { customErrorHandler } from "../helper/ErrorHandler";
// Models
import Song from "../models/Songs";
import { addRatingToArtist, addSongToArtists } from "../helper/artistHelper";
import { uploadCoverImage } from "../helper/songHelper";
import { config } from "../config";

const ITEMS_PER_PAGE = parseInt(config.ITEMS_PER_PAGE);

export default {
  getAllSongs: async (req, res) => {
    try {
      let pageNo = req.query.page ? parseInt(req.query.page) : 1;
      if (isNaN(pageNo) || pageNo <= 0)
        return customErrorHandler(res, 400, "Bad request. Invalid page no.");
      let name = req.query.name ? req.query.name : "";
      const songs = await Song.find({ name: { $regex: name, $options: "i" } })
        .sort({ avgRating: -1 })
        .skip((pageNo - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .lean();

      res.status(200).json({ songs, success: true });
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },

  getSpecificSongs: async (req, res) => {
    try {
      const id = req.params.id;
      const song = await Song.findById(id)
        .lean()
        .populate("artists", "name")
        .exec();

      if (song) {
        res.status(200).json({ song, success: true });
      } else {
        return customErrorHandler(res, 404, "No Such Song");
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
  createNewSong: async (req, res) => {
    const { name, dateOfRelease, artists } = req.body;
    try {
      let song = new Song({ name, dateOfRelease, artists });
      await song.save();
      await addSongToArtists(artists, song._id);
      return res
        .status(200)
        .json({ msg: "New Song Registered!", success: true, song });
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
  AddSongCoverImage: async (req, res) => {
    try {
      if (req.file) {
        let id = req.params.id;
        let image = "";
        image = await uploadCoverImage(req, id);
        let song = await Song.findById(id);
        song.coverImage = image;
        await song.save();
        return res.status(200).json({
          msg: "Uploaded Cover Successfully!",
          success: true,
          song,
        });
      } else {
        return customErrorHandler(res, 400, "No Image Sent!", err);
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
  deleteSong: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return customErrorHandler(res, 404, "No Id Specified");
      }
      const song = await Song.findById(id);

      if (song) {
        await song.remove();
        res.status(200).json({ success: true });
      } else {
        return customErrorHandler(res, 404, "No Such Song");
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
  rateASong: async (req, res) => {
    try {
      let songId = req.params.id;
      let rating = { user: req.user._id, score: req.body.rating };
      let newRating = req.body.new; // 1 -> new, 0->old
      if (!songId) {
        return customErrorHandler(res, 404, "No Id Specified");
      }

      let song = await Song.findById(songId, {
        artists: 1,
        rating: 1,
        avgRating: 1,
      });
      if (song) {
        if (newRating) {
          let n = song.rating.length,
            total = n * song.avgRating;
          total += rating.score;
          song.rating.push(rating);
          let avgRating = total / (n + 1);
          song.avgRating = avgRating;
          await song.save();
          await addRatingToArtist(song.artists, rating.score);
          res
            .status(200)
            .json({ success: true, message: "Successfully Rated!" });
        } else {
          let oldScore = req.body.oldScore || 0;
          if (!oldScore) {
            song.rating.map((r) => {
              if (r.user.toString() == req.user._id) {
                oldScore = r.score;
                r.score = req.body.rating;
              }
            });
          }
          let n = song.rating.length,
            total = n * song.avgRating;
          // req.body.oldScore
          total = total - oldScore + req.body.rating;
          let avgRating = total / n;
          song.avgRating = avgRating;
          console.log(oldScore);
          await song.save();
          await addRatingToArtist(song.artists, rating.score, false, oldScore);
          res.status(200).json({
            success: true,
            message: "Successfully Updated the Rating",
          });
        }
      } else {
        return customErrorHandler(res, 404, "No Such Song");
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
};
