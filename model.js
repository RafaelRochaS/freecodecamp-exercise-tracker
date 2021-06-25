const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  log: [{
    description: String,
    duration: Number,
    date: String
  }]
});

module.exports = mongoose.model("User", schema);