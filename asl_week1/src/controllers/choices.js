const express = require("express");
const router = express.Router();
let choices = require("../models/choices");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.json(choices);
});

router.post("/", (req, res) => {
  const { id, name } = req.body;
  choices.push({
    id: Number(id),
    name,
  });
  res.json(choices);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const choice = choices.find((q) => q.id == id);
  res.json(choice);
});

router.post("/:id", (req, res) => {
  const id = Number(req.params.id);
  choices.map((q) => {
    if (id === q.id) {
      q.name = req.body.name;
    }
    return q;
  });
  res.json(choices);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  choices = choices.filter((q) => q.id !== id);
  res.json(choices);
});

module.exports = router;
