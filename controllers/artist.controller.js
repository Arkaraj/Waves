import { customErrorHandler } from "../helper/ErrorHandler";
// Models
import Songs from "../models/Songs";
import Artist from "../models/Artist";

export default {
  getAllArtists: async (_req, res) => {
    try {
      const artists = await Artist.find().sort({ avgRating: -1 });

      res.status(200).json(artists);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSpecificArtist: async (req, res) => {
    try {
      const id = req.params.id;
      const artist = await Artist.findById(id);

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
          .json({ msg: "New User Registered!", success: true, artist });
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
  deleteArtist: async (req, res) => {
    try {
      const id = req.params.id;
      const artist = await Artist.findById(id);

      if (artist) {
        await artist.remove();
        res.status(200).json({ success: true });
      } else {
        return customErrorHandler(res, 400, "No Such Artist");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
