const express = require('express');
const controller = require('../controllers/questionsController');

const questionsRoute = express.Router();

questionsRoute.get('/questions', controller.getQuestions);
questionsRoute.post('/questions', controller.postQuestions);

module.exports = questionsRoute;
