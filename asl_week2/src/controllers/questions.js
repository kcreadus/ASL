const express = require('express');
const router = express.Router();
const { Question } = require('../models');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
  const questions = await Question.findAll();
  res.json(questions);
});

router.post('/', async (req, res) => {
  const { name, weight } = req.body;
  const question = await Question.create({ name, weight });
  res.json(question);
});

router.get('/:id', async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  res.json(question);
});

router.post('/:id', async (req, res) => {
  const { name, weight } = req.body;
  const { id } = req.params;
  const question = await Question.update(
    { name, weight },
    {
      where: { id },
    }
  );
  res.json(question);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Question.destroy({
    where: { id },
  });
  res.redirect('/questions');
});

module.exports = router;
