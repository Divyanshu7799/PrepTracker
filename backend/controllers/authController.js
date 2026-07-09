const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).send("All fields required");

  const hashedPassword = await bcrypt.hash(password, 10);
  connection.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") return res.status(409).send("Email already registered");
        return res.status(500).send("Registration Failed");
      }
      res.send("User Registered Successfully");
    }
  );
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("All fields required");

  connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).send("Login Failed");
    if (result.length === 0) return res.status(401).send("Invalid Credentials");

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid Credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
};

module.exports = { register, login };