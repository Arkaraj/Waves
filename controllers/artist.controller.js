import { customErrorHandler } from "../helper/ErrorHandler";
import { config } from "../config";

// Models
import Artist from "../models/Artist";

const ITEMS_PER_PAGE = parseInt(config.ITEMS_PER_PAGE);

export default {
  getAllArtists: async (req, res) => {
    try {
      let pageNo = req.query.page ? parseInt(req.query.page) : 1;
      if (isNaN(pageNo) || pageNo <= 0)
        return customErrorHandler(res, 400, "Bad request. Invalid page no.");
      let name = req.query.name ? req.query.name : "";
      const artists = await Artist.find({ name })
        .lean()
        .sort({ avgRating: -1 })
        .skip((pageNo - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);

      res.status(200).json({ artists, success: true });
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
