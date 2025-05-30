const {
  createUser,
  getAllUsers,
  getUserByID,
  deleteUserByID,
  getUserByEmail,
} = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10; // You can increase this for more security

const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("hashed password", hashedPassword);
    console.log("role",role);
    

    // If role is undefined, it won't be inserted — DB will apply default 'user'
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role, 
    });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const getUserByIDController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserByID(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUserByID(id);
    console.log("user received is ", deletedUser);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.log("error in delete", error);

    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    const user = await getUserByEmail(email);
    console.log("user received is ", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("ismatch", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Optionally store refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserByIDController,
  deleteUser,
  loginUser
};
