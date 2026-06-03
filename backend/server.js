const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("./config/db");
const app = express();
const questionsRoutes = require("./routes/questionsRoutes");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running Divyanshu  🚀");
});
app.use("/questions", questionsRoutes);
app.use("/auth", authRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});