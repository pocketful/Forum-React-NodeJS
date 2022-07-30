const express = require('express');
const controller = require('../controllers/answersController');

const answersRoute = express.Router();

answersRoute.get('/answers', controller.getAnswers);
answersRoute.post('/answers', controller.postAnswer);
answersRoute.patch('/answers/:answerId', controller.updateAnswer);
answersRoute.delete('/answers/:answerId', controller.deleteAnswer);

module.exports = answersRoute;
