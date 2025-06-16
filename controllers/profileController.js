const { createProfile } = require("../models/profileModel");
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

module.exports = {
    createUserProfile
}