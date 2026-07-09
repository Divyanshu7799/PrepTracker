const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getResources, addResource, deleteResource } = require("../controllers/resourcesController");

router.get("/", authMiddleware, getResources);
router.post("/add", authMiddleware, addResource);
router.delete("/:id", authMiddleware, deleteResource);

module.exports = router;