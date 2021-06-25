const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: Date
});

module.exports = mongoose.model("User", schema);