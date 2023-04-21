const express = require('express');
const controller = require('../controllers/questionsController');
const { validateQuestion } = require('../middlewares/validateData');
const handleToken = require('../middlewares/handleToken');

const questionsRoute = express.Router();

questionsRoute.get('/questions', controller.getQuestions);
questionsRoute.get('/questions/:questionId', controller.getOneQuestion);
questionsRoute.post('/questions', handleToken(), validateQuestion, controller.postQuestion);
questionsRoute.put('/questions/:questionId', handleToken(), validateQuestion, controller.updateQuestion);
questionsRoute.delete('/questions/:questionId', handleToken(), controller.deleteQuestion);

module.exports = questionsRoute;
