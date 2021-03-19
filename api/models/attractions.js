const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  category: { type: [String], default: ["All"] },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  rating: { type: String, required: true },
  priceRating: { type: String, required: true },
  address: { type: String, required: true },
  coordinate: { type: Map, of: Number },
});

module.exports = mongoose.model("Attractions", schema);
