const express = require('express');
const getQuestions = require('../controllers/questionsController');

const questionsRoute = express.Router();

questionsRoute.get('/questions', getQuestions);

module.exports = questionsRoute;
