const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  user_id: {
    type: Number, // PostgreSQL user ID
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema)