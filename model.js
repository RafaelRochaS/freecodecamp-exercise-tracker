const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  exercises: {
    description: String,
    duration: String,
    date: String
  }
});

module.exports = mongoose.model("User", schema);