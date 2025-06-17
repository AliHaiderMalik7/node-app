const { createProfile, getProfileByUserID, getAllProfiles, updateProfile } = require("../models/profileModel");
const { getUserByID } = require("../models/userModel");

const createUserProfile = async (req,res) => {
    const userID = req.user.id;
    const user = await getUserByID(userID);
    const {bio, address, phone} = req.body;

    const avatar = req.file.filename || null
    console.log("userID", userID, user);
    try{
   
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if profile already exists
    //   const existingProfile = await getProfileByUserId(userId);
    //   if (existingProfile) {
    //     return res.status(400).json({ error: "Profile already exists" });
    //   }

    const profile = await createProfile({
      user_id: userID,
      bio,
      address,
      phone,
      avatar,
    });


    console.log("profile creation", profile);
    
    res.status(201).json(profile)
    }
    catch(err){
        console.log("err", err.message);
        
    res.status(500).json({ error: "Failed to create profile" });

    }
}

const getProfileController = async(req,res) => {
    try {
      const userID = req.user.id;
      const profile = await getProfileByUserID(userID);

      if (!profile) {
        res.status(404).json({ message: "Profile not found!" });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
}

const getAnyProfileController = async (req,res) => {
    try{
        const userId = req.params.user_id;
        const profile = await getProfileByUserID(userId);
        if (!profile) {
          res.status(404).json({ message: "Profile not found!" });
        }

        res.status(200).json(profile);
    }
    catch(err){
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}

const updateProfileController = async(req,res) => {
    try{
        const userID = req.user.id;
        const { bio, address, phone } = req.body;
        const avatar = req.file ? req.file.filename : null;

        console.log(bio);
        
        const profile = await updateProfile(userID, {
          bio,
          address,
          phone,
          avatar,
        });

        console.log("profile updated", profile);

        res.status(201).json(profile);
    }
    catch(err){
        console.error("Error updating profile:", err);
        res.status(500).json({ error: "Failed to update profile" });
    }
}

const getAllProfilesController = async (req,res) => {
    try{
        const profiles = await getAllProfiles();
        res.status(200).json(profiles);
    }   
    catch(err){
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Failed to fetch profiles" });
    } 
}


module.exports = {
  createUserProfile,
  getProfileController,
  getAnyProfileController,
  getAllProfilesController,
  updateProfileController,
};