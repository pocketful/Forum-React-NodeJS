const express = require('express');
const getAnswers = require('../controllers/answersController');

const answersRoute = express.Router();

answersRoute.get('/answers', getAnswers);

module.exports = answersRoute;
