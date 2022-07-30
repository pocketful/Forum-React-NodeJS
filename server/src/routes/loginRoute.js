const express = require('express');
const loginUser = require('../controllers/loginController');
const { validateUserLog } = require('../middlewares/validateData');

const loginRoute = express.Router();

loginRoute.post('/login', validateUserLog, loginUser);

module.exports = loginRoute;
