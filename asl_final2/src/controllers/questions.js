const express = require('express');
const questionCtrl = express.Router();
const { Question } = require('../models');

questionCtrl.get('/', async (req, res) => {
  const questions = await Question.findAll({});
  res.json(questions);
});

questionCtrl.post('/', async (req, res) => {
  const question = await Question.create(req.body);
  res.json(question);
});

questionCtrl.get('/:id', async (req, res) => {
  const question = await Question.findByPk(Number(req.params.id), {});
  res.json(question.Quiz);
});

questionCtrl.post('/:id', async (req, res) => {
  let question = await Question.update(req.body, {
    where: { id: Number(req.params.id) },
  });
  let ques = await Question.findByPk(Number(req.params.id));
  res.json(ques);
});

questionCtrl.delete('/:id', async (req, res) => {
  const deleted = await Question.destroy({
    where: { id: Number(req.params.id) },
  });
  res.json(deleted);
});

module.exports = questionCtrl;
