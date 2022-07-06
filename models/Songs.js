import { Schema, model } from "mongoose";

const SongSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  dateOfRelease: {
    type: Date,
    required: true,
  },
  coverImage: {
    type: String,
    trime: true,
  },
  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      default: [],
      required: true,
    },
  ],
  rating: [
    {
      score: {
        type: Number,
        default: 0,
        max: [5, "Maximum value can be only 5."],
        min: [0, "Minimum value should be greater than or equal to 0. "],
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  avgRating: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
});

export default model("Songs", SongSchema);
