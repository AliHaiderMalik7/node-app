const postModel = require("../models/mongo/postModel");

const createPost = async (req, res) => {
  try {
    const userID = req.user.id;
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    const newPost = await postModel({
      user_id: userID,
      title,
      content,
      image,
      approved: false, // always false at creation
    });

    await newPost.save();

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    console.error("Error saving post to MongoDB:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const approvePost = async (req, res) => {
  try {
    const postID = req.params.id;
    const updatedPost = await postModel.findByIdAndUpdate(postID, {
      approved: true,
    },{new:true});

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post approved", post: updatedPost });
  } catch (err) {
    res.status(500).json({ error: "Failed to approve post" });
  }
};

module.exports = {
  createPost,
  approvePost,
};
