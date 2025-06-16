const express = require("express");
const { createUserProfile } = require("../controllers/profileController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router()

router.post(
  "/",
  authMiddleware,
  upload.single("avatar"), // 👈 This handles file upload
  createUserProfile
);


module.exports = router;