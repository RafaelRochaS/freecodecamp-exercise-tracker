const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: Date
}, { versionKey: false });

module.exports = mongoose.model("User", schema);