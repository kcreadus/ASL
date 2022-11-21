const express = require('express');
const choiceCtrl = express.Router();
const { Choice, Question } = require('../models');

choiceCtrl.get('/', async (req, res) => {
  const choices = await Choice.findAll({
    include: Question,
  });
  res.json(choices);
});

choiceCtrl.post('/', async (req, res) => {
  const choice = await Choice.create(req.body);
  res.json(choice);
});

choiceCtrl.get('/:id', async (req, res) => {
  const choice = await Choice.findByPk(Number(req.params.id), {
    include: Question,
  });
  res.json(choice.Quiz);
});

choiceCtrl.post('/:id', async (req, res) => {
  var choice = await Choice.update(req.body, {
    where: { id: Number(req.params.id) },
  });
  var choice = await Choice.findByPk(Number(req.params.id));
  res.json(choice);
});

choiceCtrl.delete('/:id', async (req, res) => {
  const deleted = await Choice.destroy({
    where: { id: Number(req.params.id) },
  });
  res.json(deleted);
});

module.exports = choiceCtrl;
