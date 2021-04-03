const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  attraction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attractions",
    required: true,
  },
});

module.exports = mongoose.model("Populars", schema);
