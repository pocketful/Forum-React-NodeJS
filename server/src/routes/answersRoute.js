const express = require('express');
const controller = require('../controllers/answersController');
const validateToken = require('../middlewares/validateToken');

const answersRoute = express.Router();

answersRoute.get('/questions/:questionId/answers', controller.getAnswers);
answersRoute.post('/questions/:questionId/answers', validateToken, controller.postAnswer);
answersRoute.patch('/answers/:answerId', validateToken, controller.updateAnswer);
answersRoute.delete('/answers/:answerId', validateToken, controller.deleteAnswer);
// answers votes:
answersRoute.get('/answers/:answerId', controller.getAnswerVotes);
answersRoute.post('/answers/:answerId', validateToken, controller.postAnswerVote);

module.exports = answersRoute;
