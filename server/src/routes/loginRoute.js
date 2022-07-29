const express = require('express');
const loginUser = require('../controllers/loginController');

const loginRoute = express.Router();

loginRoute.post('/login', loginUser);

module.exports = loginRoute;
