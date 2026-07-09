const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const questionsRoutes = require("./routes/questionsRoutes");
const resourcesRoutes = require("./routes/resourcesRoutes");

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.use("/auth", authRoutes);
app.use("/questions", questionsRoutes);
app.use("/resources", resourcesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});