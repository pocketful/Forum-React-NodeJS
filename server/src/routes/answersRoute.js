const express = require('express');
const controller = require('../controllers/answersController');
const { validateAnswer } = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');

const answersRoute = express.Router();

answersRoute.get('/questions/:questionId/answers', controller.getAnswers);
answersRoute.post('/questions/:questionId/answers', validateToken, validateAnswer, controller.postAnswer);
answersRoute.patch('/answers/:answerId', validateToken, validateAnswer, controller.updateAnswer);
answersRoute.delete('/answers/:answerId', validateToken, controller.deleteAnswer);

// Voting for an answer:
// Check if the user has already voted for a particular answer
answersRoute.get('/answers/:answerId/vote', validateToken, controller.getAnswerVoteByUser);
// Update an existing user vote for the answer
answersRoute.patch('/answers/:answerId/vote', validateToken, controller.updateAnswerVote);
// Insert a new vote for the answer
answersRoute.post('/answers/:answerId/vote', validateToken, controller.postAnswerVote);

module.exports = answersRoute;
