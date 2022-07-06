const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 12,
  },
  dob: {
    type: Date,
    required: true,
  },
  bio: {
    type: String,
  },
});

module.exports = mongoose.model("Artist", ArtistSchema);
