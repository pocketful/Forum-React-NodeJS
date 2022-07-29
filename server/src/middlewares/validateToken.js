const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

async function validateToken(req, res, next) {
  const tokenFromHeader = req.headers.authorization?.split(' ')[1];
  console.log('tokenFromHeader ===', tokenFromHeader);

  // if token doesn't exist
  if (!tokenFromHeader) {
    console.log('No token');
    res.status(401).json({ success: false, message: 'No token' });
    return;
  }

  // token exist
  try {
    const tokenPayload = await jwt.verify(tokenFromHeader, jwtSecret);
    console.log('tokenPayload ===', tokenPayload);
    next();
  } catch (err) {
    console.log('err in validateToken middleware:', err);
    res.status(403).json({ success: false, message: 'Invalid token, please login' });
  }
}

module.exports = validateToken;
