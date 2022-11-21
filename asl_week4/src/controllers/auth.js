const express = require('express');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/callback', async (req, res) => {
  const { code } = req.query;
  await request(
    {
      uri: 'https://github.com/login/oauth/access_token',
      qs: {
        client_id: 'aee1dd5b09289a32d1d9',
        client_secret: '9d0a1bf8048c3ef6844390d909d2eeeb041dcf18',
        code,
      },
    },
    async (error, response, body) => {
      const { access_token } = querystring.parse(body);
      req.session.access_token = access_token;
      res.redirect('/');
    }
  );
});

module.exports = router;
