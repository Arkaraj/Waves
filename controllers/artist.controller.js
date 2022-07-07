import { customErrorHandler } from "../helper/ErrorHandler";
// Models
import Artist from "../models/Artist";

export default {
  getAllArtists: async (_req, res) => {
    try {
      const artists = await Artist.find().lean().sort({ avgRating: -1 });

      res.status(200).json(artists);
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },

  getSpecificArtist: async (req, res) => {
    try {
      const id = req.params.id;
      const artist = await Artist.findById(id)
        .lean()
        .populate("songs", "name")
        .exec();

      if (artist) {
        res.status(200).json({ artist, success: true });
      } else {
        return customErrorHandler(res, 404, "No Such Artist");
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
  createNewArtist: async (req, res) => {
    // validate this
    const { name, dob, bio } = req.body;
    try {
      const oldartist = await Artist.findOne({ name });
      if (oldartist) {
        return customErrorHandler(res, 400, "This Artist already Exists");
      } else {
        const artist = new Artist({ name, bio, dob });
        await artist.save();
        return res
          .status(200)
          .json({ msg: "New Artist Registered!", success: true, artist });
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
  deleteArtist: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return customErrorHandler(res, 404, "No Id Specified");
      }
      const artist = await Artist.findById(id);

      if (artist) {
        await artist.remove();
        res.status(200).json({ success: true });
      } else {
        return customErrorHandler(res, 404, "No Such Artist");
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
};
