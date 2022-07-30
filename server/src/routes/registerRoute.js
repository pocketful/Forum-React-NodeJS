const express = require('express');
const registerUser = require('../controllers/registerController');
const { validateUserReg } = require('../middlewares/validateData');

const registerRoute = express.Router();

registerRoute.post('/register', validateUserReg, registerUser);

module.exports = registerRoute;
