const { uploadToS3 } = require("../middleware/uploadS3");
const commentModel = require("../models/mongo/commentModel");
const postModel = require("../models/mongo/postModel");

const createComment = async (req, res) => {
  try {
    const { post_id, description } = req.body;
    const user_id = req.user.id; // from auth middleware

    const image = req.file ? req.file.location : null; // S3 URL
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadToS3(req.file); // 🟢 Upload to S3
    }

    const post = await postModel.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = await commentModel.create({
      post_id,
      user_id: req.user.id,
      content: description,
      image: imageUrl,
    });

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const post_id = req.params.id;
    console.log("postid", post_id);

    const post = await postModel.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await commentModel
      .find({ post_id })
      .sort({ created_at: -1 });
    const total_comments = await commentModel.countDocuments({ post_id });
    res.status(200).json({ post_id, comments, total_comments });
  } catch (err) {
    console.error("Error getting comments:", err);
    res.status(500).json({ message: "Failed to get comments" });
  }
};

const updateComment = async (req,res) => {
    try{
        const id = req.params.id;
        console.log("id us", id);
        
        const { description } = req.body || {};
        console.log("req", req.body);
        

        const comment = await commentModel.findById(id);
        if (!comment) {
          return res.status(404).json({ message: "Comment not found" });
        }

        
        let imageUrl = comment.image;
        if (req.file) {
          imageUrl = await uploadToS3(req.file);
        }    comment.content = description || comment.content;
        comment.image = imageUrl;
        await comment.save();
        res.status(200).json({ message: "Comment updated", comment });


    }
    catch(err){
        console.error("Error updating comment:", err);
        res.status(500).json({ message: "Failed to update comment" });
    }
}

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
};
