const express = require('express');
const registerUser = require('../controllers/registerController');
const { validateUser } = require('../middlewares/validateData');

const registerRoute = express.Router();

registerRoute.post('/register', validateUser, registerUser);

module.exports = registerRoute;
