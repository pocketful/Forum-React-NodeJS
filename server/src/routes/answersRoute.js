const express = require('express');
const controller = require('../controllers/answersController');
const { validateAnswer } = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');

const answersRoute = express.Router();

answersRoute.get('/questions/:questionId/answers', controller.getAnswers);
answersRoute.post('/questions/:questionId/answers', validateToken, validateAnswer, controller.postAnswer);
answersRoute.patch('/answers/:answerId', validateToken, validateAnswer, controller.updateAnswer);
answersRoute.delete('/answers/:answerId', validateToken, controller.deleteAnswer);
// answers votes:
answersRoute.get('/answers/:answerId', controller.getAnswerVotes);
answersRoute.post('/answers/:answerId', validateToken, controller.postAnswerVote);

module.exports = answersRoute;
