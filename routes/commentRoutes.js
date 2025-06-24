const express = require("express");
const uploadS3 = require("../middleware/uploadS3");
const { authMiddleware, authorizeRole } = require("../middleware/authMiddleware");
const { createComment, getCommentsByPost, updateComment } = require("../controllers/commentController");
const router = express.Router();


router.post("/", authMiddleware, uploadS3.upload.single("image"), createComment);

router.get(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  getCommentsByPost
);

router.put(
  "/edit/:id",
  authMiddleware,
  uploadS3.upload.single("image"),
  updateComment
);
  

module.exports = router;