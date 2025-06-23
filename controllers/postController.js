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

module.exports = {
  createPost,
};
