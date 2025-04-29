const { createUser, getAllUsers, getUserByID, deleteUserByID } = require("../models/userModel");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await createUser({ name, email, password });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async(req,res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users)
  }
  catch(error){

    res.status(500).json({error:"Internal Server Error!"})
    
  }
}

const getUserByIDController = async (req, res) => {
    const { id } = req.params;

  try {
    const user = await getUserByID(id);
    if(!user){
      res.status(404).json({message: "User not found"})
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





module.exports = {
  addUser,
  getUsers,
  getUserByIDController,
  deleteUser,
};