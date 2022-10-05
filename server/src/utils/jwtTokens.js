const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function signingJwt(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

function verifyToken(tokenFromHeader) {
  return jwt.verify(tokenFromHeader, jwtSecret);
}

module.exports = {
  signingJwt,
  verifyToken,
};
