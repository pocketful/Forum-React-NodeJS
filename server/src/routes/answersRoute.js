const express = require('express');
const controller = require('../controllers/answersController');
const validateToken = require('../middlewares/validateToken');

const answersRoute = express.Router();

answersRoute.get('/answers', controller.getAnswers);
answersRoute.post('/answers', validateToken, controller.postAnswer);
answersRoute.patch('/answers/:answerId', validateToken, controller.updateAnswer);
answersRoute.delete('/answers/:answerId', validateToken, controller.deleteAnswer);

module.exports = answersRoute;
