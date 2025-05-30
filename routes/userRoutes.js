const express = require("express");
const { addUser, getUsers, getUserByIDController, deleteUser, loginUser } = require("../controllers/userController");
const {
  authMiddleware,
  authorizeRole,
} = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", addUser);
router.get("/", authMiddleware, authorizeRole("admin"), (req, res) => {
  res.send("Welcome admin!");
});router.get("/:id", getUserByIDController);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);


module.exports = router;