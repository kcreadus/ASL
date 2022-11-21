const express = require("express");
const router = express.Router();
let questions = require("../models/questions");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.json(questions);
});

router.post("/", (req, res) => {
  const { id, name } = req.body;
  questions.push({
    id: Number(id),
    name,
  });
  res.json(questions);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const question = questions.find((q) => q.id == id);
  res.json(question);
});

router.post("/:id", (req, res) => {
  const id = Number(req.params.id);
  questions.map((q) => {
    if (id === q.id) {
      q.name = req.body.name;
    }
    return q;
  });
  res.json(questions);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  questions = questions.filter((q) => q.id !== id);
  res.json(questions);
});

module.exports = router;
