const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getQuestions,
  getDueRevisions,
  toggleSolved,
  addQuestion,
  deleteQuestion,
} = require("../controllers/questionsController");

router.get("/", authMiddleware, getQuestions);
router.get("/revisions/due", authMiddleware, getDueRevisions);
router.put("/:id", authMiddleware, toggleSolved);
router.post("/add", authMiddleware, addQuestion);
router.delete("/:id", authMiddleware, deleteQuestion);

module.exports = router;