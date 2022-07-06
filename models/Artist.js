import { Schema, model } from "mongoose";

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
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
});

export default model("Artist", ArtistSchema);
