const express = require('express');
const loginUser = require('../controllers/loginController');
const { validateUser } = require('../middlewares/validateData');

const loginRoute = express.Router();

loginRoute.post('/login', validateUser, loginUser);

module.exports = loginRoute;
