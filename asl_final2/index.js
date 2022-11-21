const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pageCtlr = require('./src/controllers/page');
const quizCtlr = require('./src/controllers/quizzes');
const questionCtlr = require('./src/controllers/questions');
const authCtlr = require('./src/controllers/auth');
const chioceCtlr = require('./src/controllers/choices');
const cors = require('cors');
var session = require('express-session');
app.use(
  session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
  })
);

app.set('views', __dirname + '/src/views');
app.set('view engine', 'twig');
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowCrossDomain: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/quizzes', quizCtlr);
app.use('/questions', questionCtlr);
app.use('/choices', chioceCtlr);
app.use('/auth', authCtlr);
app.use('/', pageCtlr);

app.listen(3000);
