const express = require("express");
const { addUser, getUsers, getUserByIDController, deleteUser } = require("../controllers/userController");
const router = express.Router();


router.post("/", addUser);
router.get("/", getUsers);
router.get("/:id", getUserByIDController);
router.delete("/:id", deleteUser);



module.exports = router;