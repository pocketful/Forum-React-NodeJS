const express = require('express');
const controller = require('../controllers/answersController');
const { validateAnswer } = require('../middlewares/validateData');
const handleToken = require('../middlewares/handleToken');

const answersRoute = express.Router();

// Answers
answersRoute.get('/questions/:questionId/answers', handleToken(false), controller.getAnswers);
answersRoute.post('/questions/:questionId/answers', handleToken(), validateAnswer, controller.postAnswer);
answersRoute.patch('/answers/:answerId', handleToken(), validateAnswer, controller.updateAnswer);
answersRoute.delete('/answers/:answerId', handleToken(), controller.deleteAnswer);

// Voting for an answer:
// Update an existing user vote for the answer
answersRoute.patch('/answers/:answerId/vote', handleToken(), controller.updateAnswerVote);
// Insert a new vote for the answer
answersRoute.post('/answers/:answerId/vote', handleToken(), controller.postAnswerVote);
// Delete an existing user vote for the answer
answersRoute.delete('/answers/:answerId/vote', handleToken(), controller.deleteAnswerVote);

module.exports = answersRoute;
