const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  category: { type: [String], default: ["All"] },
  location: { type: String, required: true },
  date: { type: String, required: true },
  detailURL: { type: String, required: true },
  imageURL: { type: String, required: true },
});

module.exports = mongoose.model("Events", schema);
