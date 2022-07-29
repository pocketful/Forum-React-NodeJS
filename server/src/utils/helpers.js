const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config');

function hashPassword(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function passwordsMatch(passwordInput, foundedHashedPass) {
  return bcrypt.compareSync(passwordInput, foundedHashedPass);
}

function signingJwt(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

module.exports = {
  hashPassword,
  passwordsMatch,
  signingJwt,
};
