const express = require('express');
const controller = require('../controllers/questionsController');
const validateToken = require('../middlewares/validateToken');

const questionsRoute = express.Router();

questionsRoute.get('/questions', controller.getQuestions);
questionsRoute.get('/questions/:questionId', controller.getOneQuestion);
questionsRoute.post('/questions', validateToken, controller.postQuestion);
questionsRoute.put('/questions/:questionId', validateToken, controller.updateQuestion);
questionsRoute.delete('/questions/:questionId', validateToken, controller.deleteQuestion);

module.exports = questionsRoute;
