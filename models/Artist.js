import { Schema, model } from "mongoose";

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  bio: {
    type: String,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Songs",
      default: [],
    },
  ],
  avgRating: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
});

export default model("Artist", ArtistSchema);
