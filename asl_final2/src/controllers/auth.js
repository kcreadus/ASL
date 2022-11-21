const express = require('express');
const authCtlr = express.Router();
const axios = require('axios');
const queryString = require('querystring');
const { LoginToken } = require('../models/index');

const client_id = 'aee1dd5b09289a32d1d9';
const client_secret = '9d0a1bf8048c3ef6844390d909d2eeeb041dcf18';

authCtlr.get('/login', (req, res) => {
  res.render('auth/login');
});

authCtlr.get('/callback', async (req, res) => {
  const { code } = req.query;
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id,
      client_secret,
    }
  );
  const { access_token } = queryString.parse(response.data);
  req.session.access_token = access_token;
  const loginToken = await LoginToken.create({ token: access_token });
  res.redirect('http://localhost:4000?token=' + access_token);
});

authCtlr.get('/token', async (req, res) => {
  const token = await LoginToken.findOne({
    where: {
      token: req.headers.token,
    },
  });
  if (token) {
    req.session.access_token = req.headers.token;
    res.json(token);
  } else {
    res.json({ token: false });
  }
});

module.exports = authCtlr;
