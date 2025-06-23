const mongoose = require("mongoose");

const connectMongo = async(req,res) => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");
    }
    catch(err){
        console.error("❌ MongoDB connection failed:", error);
    }
}

module.exports = connectMongo;
