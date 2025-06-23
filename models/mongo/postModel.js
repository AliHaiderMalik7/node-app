const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: String,
  image: String,
  approved: {
    type: Boolean,
    default: false, // posts must be approved by admin
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Post",postSchema)