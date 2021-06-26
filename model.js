const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  exercises: [{
    description: String,
    duration: Number,
    date: String
  }]
}, { versionKey: false });

module.exports = mongoose.model("User", schema);