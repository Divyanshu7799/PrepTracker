
const express = require("express");

const router = express.Router();

const connection = require("../config/db");

const authMiddleware = require("../middleware/authMiddleware");


// GET ALL QUESTIONS

// GET USER QUESTIONS

router.get(

  "/",

  authMiddleware,

  (req, res) => {

    const userId = req.user.id;


    const query = `
    
      SELECT *

      FROM user_questions

      WHERE user_id = ?

      ORDER BY created_at DESC
    
    `;


    connection.query(

      query,

      [userId],

      (err, result) => {

        if (err) {

          console.log(err);

          res.status(500).send(
            "Database Error"
          );

          return;

        }

        res.json(result);

      }

    );

  }

);




// SOLVE QUESTION

// TOGGLE SOLVED STATUS

router.put(

  "/:id",

  authMiddleware,

  (req, res) => {

    const questionId = req.params.id;

    const userId = req.user.id;

    const { solved } = req.body;


    const query = `
    
      UPDATE user_questions

      SET solved = ?

      WHERE id = ?
      AND user_id = ?
    
    `;


    connection.query(

      query,

      [

        solved,
        questionId,
        userId

      ],

      (err, result) => {

        if (err) {

          console.log(err);

          res.status(500).send(
            "Database Error"
          );

          return;

        }

        res.send("Updated");

      }

    );

  }

);


// ADD QUESTION

router.post(

  "/add",

  authMiddleware,

  (req, res) => {

    const userId = req.user.id;

    const {

      title,
      topic,
      difficulty

    } = req.body;


    if (

      !title ||
      !topic ||
      !difficulty

    ) {

      res.status(400).send(
        "All fields are required"
      );

      return;

    }


    const query = `
    
      INSERT INTO user_questions

      (
        user_id,
        title,
        topic,
        difficulty
      )

      VALUES (?, ?, ?, ?)
    
    `;


    connection.query(

      query,

      [

        userId,
        title,
        topic,
        difficulty

      ],

      (err, result) => {

        if (err) {

          console.log(err);

          res.status(500).send(
            "Database Error"
          );

          return;

        }

        res.send("Question Added");

      }

    );

  }

);

// DELETE QUESTION

router.delete(

  "/:id",

  authMiddleware,

  (req, res) => {

    const questionId = req.params.id;

    const userId = req.user.id;


    const query = `
    
      DELETE FROM user_questions

      WHERE id = ?
      AND user_id = ?
    
    `;


    connection.query(

      query,

      [questionId, userId],

      (err, result) => {

        if (err) {

          console.log(err);

          res.status(500).send(
            "Database Error"
          );

          return;

        }

        res.send("Question Deleted");

      }

    );

  }

);




module.exports = router;
