const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  test: Number,
});

module.exports = mongoose.model("Test", schema);