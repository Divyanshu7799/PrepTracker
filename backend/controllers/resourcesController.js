const connection = require("../config/db");

const getResources = (req, res) => {
  const { topic, type } = req.query;
  let query = "SELECT * FROM resources WHERE user_id = ?";
  const params = [req.user.id];

  if (topic) { query += " AND topic = ?"; params.push(topic); }
  if (type)  { query += " AND type = ?";  params.push(type);  }

  query += " ORDER BY created_at DESC";

  connection.query(query, params, (err, result) => {
    if (err) return res.status(500).send("Database Error");
    res.json(result);
  });
};

const addResource = (req, res) => {
  const { title, type, url, topic, notes } = req.body;
  if (!title || !type) return res.status(400).send("Title and type required");

  connection.query(
    "INSERT INTO resources (user_id, title, type, url, topic, notes) VALUES (?, ?, ?, ?, ?, ?)",
    [req.user.id, title, type, url || null, topic || null, notes || null],
    (err, result) => {
      if (err) return res.status(500).send("Database Error");
      res.json({ message: "Resource Added", id: result.insertId });
    }
  );
};

const deleteResource = (req, res) => {
  connection.query(
    "DELETE FROM resources WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).send("Database Error");
      res.send("Deleted");
    }
  );
};

module.exports = { getResources, addResource, deleteResource };