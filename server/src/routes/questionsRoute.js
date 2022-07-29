const express = require('express');
const controller = require('../controllers/questionsController');

const questionsRoute = express.Router();

questionsRoute.get('/questions', controller.getQuestions);
questionsRoute.post('/questions', controller.postQuestion);
questionsRoute.delete('/questions/:questionId', controller.deleteQuestion);

module.exports = questionsRoute;
