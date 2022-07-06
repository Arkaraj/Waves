import { Schema, model } from "mongoose";

const RatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  song: {
    type: Schema.Types.ObjectId,
    ref: "Songs",
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    max: [5, "Maximum value can be only 5."],
    min: [0, "Minimum value should be greater than or equal to 0. "],
  },
});

export default model("Rating", RatingSchema);
