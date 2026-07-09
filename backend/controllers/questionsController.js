const connection = require("../config/db");
const { getNextRevision, toMySQLDate } = require("../utils/spacedRepetition");

const getQuestions = (req, res) => {
  connection.query(
    "SELECT * FROM user_questions WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).send("Database Error");
      res.json(result);
    }
  );
};

const getDueRevisions = (req, res) => {
  const today = toMySQLDate(new Date());
  connection.query(
    `SELECT * FROM user_questions WHERE user_id = ? AND solved = 1 
     AND next_revision_date IS NOT NULL AND next_revision_date <= ?
     ORDER BY next_revision_date ASC`,
    [req.user.id, today],
    (err, result) => {
      if (err) return res.status(500).send("Database Error");
      res.json(result);
    }
  );
};

const toggleSolved = (req, res) => {
  const { id } = req.params;
  const { solved } = req.body;
  const userId = req.user.id;

  if (solved) {
    connection.query(
      "SELECT revision_stage FROM user_questions WHERE id = ? AND user_id = ?",
      [id, userId],
      (err, rows) => {
        if (err) return res.status(500).send("Database Error");
        if (rows.length === 0) return res.status(404).send("Not found");

        const { nextRevisionDate, nextStage } = getNextRevision(rows[0].revision_stage || 0);

        connection.query(
          `UPDATE user_questions SET solved = ?, solved_at = NOW(),
           revision_stage = ?, next_revision_date = ? WHERE id = ? AND user_id = ?`,
          [solved, nextStage, toMySQLDate(nextRevisionDate), id, userId],
          (err2) => {
            if (err2) return res.status(500).send("Database Error");
            res.json({ message: "Updated", nextRevisionDate: toMySQLDate(nextRevisionDate) });
          }
        );
      }
    );
  } else {
    connection.query(
      `UPDATE user_questions SET solved = ?, solved_at = NULL,
       revision_stage = 0, next_revision_date = NULL WHERE id = ? AND user_id = ?`,
      [solved, id, userId],
      (err) => {
        if (err) return res.status(500).send("Database Error");
        res.send("Updated");
      }
    );
  }
};

const addQuestion = (req, res) => {
  const { title, topic, difficulty } = req.body;
  if (!title || !topic || !difficulty) return res.status(400).send("All fields required");

  connection.query(
    "INSERT INTO user_questions (user_id, title, topic, difficulty) VALUES (?, ?, ?, ?)",
    [req.user.id, title, topic, difficulty],
    (err, result) => {
      if (err) return res.status(500).send("Database Error");
      res.json({ message: "Question Added", id: result.insertId });
    }
  );
};

const deleteQuestion = (req, res) => {
  connection.query(
    "DELETE FROM user_questions WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).send("Database Error");
      res.send("Deleted");
    }
  );
};

module.exports = { getQuestions, getDueRevisions, toggleSolved, addQuestion, deleteQuestion };