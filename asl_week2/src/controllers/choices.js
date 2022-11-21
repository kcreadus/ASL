const express = require('express');
const router = express.Router();
const { Choice } = require('../models');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
  const choices = await Choice.findAll();
  res.json(choices);
});

router.post('/', async (req, res) => {
  const { name, weight } = req.body;
  const choice = await Choice.create({ name, weight });
  res.json(choice);
});

router.get('/:id', async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  res.json(choice);
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
  res.json(choice);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Choice.destroy({
    where: { id },
  });
  res.redirect('/choices');
});

module.exports = router;
