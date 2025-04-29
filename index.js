const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")
const PORT = 3000;

const pool = require("./config/db");

app.use(express.json());
app.use('/api/users', userRoutes); // Route for user APIs


app.get("/", (req, res) => res.send("Hello Backend!"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
