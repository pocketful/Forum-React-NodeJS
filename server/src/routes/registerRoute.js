const express = require('express');
const registerUser = require('../controllers/registerController');

const registerRoute = express.Router();

registerRoute.post('/register', registerUser);

module.exports = registerRoute;
