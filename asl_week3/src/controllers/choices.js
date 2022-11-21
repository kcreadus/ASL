const express = require('express');
const router = express.Router();
const { Choice } = require('../models');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
  const choices = await Choice.findAll();
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json(choices);
  } else {
    res.render('choice/index', { choices });
  }
});
router.get('/new', (req, res) => {
  res.render('choice/create');
});

router.post('/', async (req, res) => {
  const { name, weight } = req.body;
  const choice = await Choice.create({ name, weight });
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json(choice);
  } else {
    res.redirect('/choices/' + choice.id);
  }
});

router.get('/:id', async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json(choice);
  } else {
    res.render('choice/show', { choice });
  }
});

router.get('/:id/edit', async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  res.render('choice/edit', { choice });
});

router.post('/:id', async (req, res) => {
  const { name, weight } = req.body;
  const { id } = req.params;
  const choice = await Choice.update(
    { name, weight },
    {
      where: { id },
    }
  );
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json(choice);
  } else {
    res.redirect('/choices/' + id);
  }
});

router.get('/:id/delete', async (req, res) => {
  const { id } = req.params;
  const deleted = await Choice.destroy({
    where: { id },
  });
  if (req.headers.accept.indexOf('/json') > -1) {
    res.json({ success: true });
  } else {
    res.redirect('/choices');
  }
});

module.exports = router;
