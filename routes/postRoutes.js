const express = require("express");
const { authMiddleware, authorizeRole } = require("../middleware/authMiddleware");
const { createPost, approvePost } = require("../controllers/postController");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.put("/:id", authMiddleware, authorizeRole("admin"), approvePost)

module.exports = router;