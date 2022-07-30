const express = require('express');
const loginUser = require('../controllers/loginController');
const { validateData } = require('../middlewares/validateData');

const loginRoute = express.Router();

loginRoute.post('/login', validateData, loginUser);

module.exports = loginRoute;
