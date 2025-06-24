const { uploadToS3 } = require("../middleware/uploadS3");
const commentModel = require("../models/mongo/commentModel");
const postModel = require("../models/mongo/postModel");

const createComment = async (req,res) => {
    try{
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
        content:description,
        image: imageUrl,
              });

      res.status(201).json({ message: "Comment added", comment });
    }
    catch(err){
        console.error("Error creating comment:", err);
        res.status(500).json({ error: "Failed to create comment" });
    }
}

const getCommentsByPost = async (req,res) => {
    try{
        const post_id = req.params.id;
        console.log("postid", post_id);
        
        
        const post = await postModel.findById(post_id);
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }


        const comments = await commentModel.find({post_id}).sort({created_at:-1});

        res.status(200).json({post_id, comments})
    }
    catch(err){
        console.error("Error getting comments:", err);
        res.status(500).json({ message: "Failed to get comments" });
    }
}

module.exports = {
  createComment,
  getCommentsByPost,
};