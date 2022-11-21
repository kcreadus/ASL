const express = require('express');
const pageRouter = express.Router();
const { Question } = require('../models');

pageCtrl.use('/', async (request, response) => {
  response.render('pages/home');
});

module.exports = pageRouter;
