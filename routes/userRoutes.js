const express = require("express");
const { addUser, getUsers, getUserByIDController, deleteUser, loginUser } = require("../controllers/userController");
const {
  authMiddleware,
  authorizeRole,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();


router.post("/",upload.single("image"), addUser);
router.get("/", authMiddleware, authorizeRole("admin"), (req, res) => {
  res.send("Welcome admin!");
});router.get("/:id", getUserByIDController);
router.delete("/:id", authMiddleware,  deleteUser);
router.post("/login", loginUser);
router.get("/users/all", getUsers)



module.exports = router;