const express = require('express');
const router = express.Router();
const { Question } = require('../models');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
  const questions = await Question.findAll();
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json(questions);
  } else {
    res.render('question/index', { questions });
  }
});
router.get('/new', (req, res) => {
  res.render('question/create');
});

router.post('/', async (req, res) => {
  const { name, weight } = req.body;
  const question = await Question.create({ name, weight });
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json(question);
  } else {
    res.redirect('/questions/' + question.id);
  }
});

router.get('/:id', async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json(question);
  } else {
    res.render('question/show', { question });
  }
});

router.get('/:id/edit', async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  res.render('question/edit', { question });
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
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json(question);
  } else {
    res.redirect('/questions/' + id);
  }
});

router.get('/:id/delete', async (req, res) => {
  const { id } = req.params;
  const deleted = await Question.destroy({
    where: { id },
  });
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json({ success: true });
  } else {
    res.redirect('/questions');
  }
});

module.exports = router;
