const express = require('express');
const registerUser = require('../controllers/registerController');
const { validateData } = require('../middlewares/validateData');

const registerRoute = express.Router();

registerRoute.post('/register', validateData, registerUser);

module.exports = registerRoute;
