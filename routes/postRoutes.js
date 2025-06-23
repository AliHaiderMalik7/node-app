const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createPost } = require("../controllers/postController");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);


module.exports = router;