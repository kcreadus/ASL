const express = require("express");
const app = express();
const quizzesCtrl = require("./src/controllers/quizzes");
const questionsCtrl = require("./src/controllers/questions");
const choicesCtrl = require("./src/controllers/choices");
//Get / HTTP/1.1
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/quizzes", quizzesCtrl);

app.use("/questions", questionsCtrl);

app.use("/choices", choicesCtrl);

app.listen(3000);
