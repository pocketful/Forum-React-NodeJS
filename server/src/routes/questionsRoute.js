const express = require('express');
const controller = require('../controllers/questionsController');
const { validateQuestion } = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');

const questionsRoute = express.Router();

questionsRoute.get('/questions', controller.getQuestions);
questionsRoute.get('/questions/:questionId', controller.getOneQuestion);
questionsRoute.post('/questions', validateToken, validateQuestion, controller.postQuestion);
questionsRoute.put('/questions/:questionId', validateToken, validateQuestion, controller.updateQuestion);
questionsRoute.delete('/questions/:questionId', validateToken, controller.deleteQuestion);

module.exports = questionsRoute;
