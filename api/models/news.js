const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  headline: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  body: { type: String, required: true },
  imageURL: { type: String, required: true },
});

module.exports = mongoose.model("News", schema);
