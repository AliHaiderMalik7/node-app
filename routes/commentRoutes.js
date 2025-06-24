const express = require("express");
const uploadS3 = require("../middleware/uploadS3");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createComment } = require("../controllers/commentController");
const router = express.Router();


router.post("/", authMiddleware, uploadS3.upload.single("image"), createComment);


module.exports = router;