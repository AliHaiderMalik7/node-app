const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")
require("dotenv").config(); // 🔁 load env variables


const profileRoutes = require("./routes/profileRoutes");
const commentRoutes = require("./routes/commentRoutes");

const postRoutes = require("./routes/postRoutes");
const PORT = 3000;

const pool = require("./config/db");
const connectMongo = require("./config/mongodb");
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes); // Route for user APIs

//route for profile apis
app.use('/api/profile', profileRoutes); // Route for user APIs

app.use('/api/post', postRoutes); // Route for user APIs

app.use('/api/comment', commentRoutes); // Route for user APIs


app.get("/", (req, res) => res.send("Hello Backend!"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
