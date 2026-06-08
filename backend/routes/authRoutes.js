const express = require("express");

const router = express.Router();

const connection = require("../config/db");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

// REGISTER USER
router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        res.status(400).send("All fields are required");

        return;

    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
  
    INSERT INTO users (name, email, password)

    VALUES (?, ?, ?)
  
  `;


    connection.query(

        query,

        [name, email, hashedPassword],

        (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).send("Registration Failed");

                return;
            }

            res.send("User Registered Successfully");

        }

    );

});
// LOGIN USER

router.post("/login", (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {

        res.status(400).send("All fields are required");

        return;

    }

    const query = `
  
    SELECT * FROM users

    WHERE email = ? 
  
  `;


    connection.query(

        query,

        [email],

        async (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).send("Login Failed");

                return;
            }


            if (result.length === 0) {

                res.status(401).send("Invalid Credentials");

                return;
            }
            const user = result[0];

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );


            if (!isMatch) {

                res.status(401).send("Invalid Credentials");

                return;

            }
            const token = jwt.sign(

                {

                    id: user.id,
                    email: user.email

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: "1d"

                }

            );
            res.json({

                message: "Login Successful",

                token

            });

        }

    );

});

module.exports = router;