const express = require("express");
const {
  createUserProfile,
  getProfileController,
  getAnyProfileController,
  getAllProfilesController,
} = require("../controllers/profileController");
const { authMiddleware, authorizeRole } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("avatar"), // 👈 This handles file upload
  createUserProfile
);

router.get("/", authMiddleware, getProfileController);

//admin get all profiles
router.get(
  "/all",
  authMiddleware,
  authorizeRole("admin"),
  getAllProfilesController
);

//admin get a specific profile
router.get(
  "/:user_id",
  authMiddleware,
  authorizeRole("admin"),
  getAnyProfileController
);

module.exports = router;
