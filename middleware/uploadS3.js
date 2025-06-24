// middleware/s3Upload.js
const multer = require("multer");
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require("fs");
const s3 = require("../config/s3");
require("dotenv").config(); // 🔁 load env variables

const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const fileName = `${Date.now()}-${file.originalname}`;

    console.log("bucket", process.env.AWS_BUCKET_NAME);
    

  const upload = new Upload({
    client: s3, // ✅ must be a valid S3Client
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileStream,
    //   ACL: "public-read",
    },
  });

  const result = await upload.done();
  return result.Location;
};

// Multer setup to store file locally first
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports = { upload, uploadToS3 };
