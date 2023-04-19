const { verifyToken } = require('../utils/jwtTokens');

async function decodeToken(req, res, next) {
  // if token doesn't exist
  if (!req.headers.authorization) {
    console.log('decodeToken no token');
    next();
  }

  // if token exist then pass userId as req to the next function
  const tokenFromHeader = req.headers.authorization.split(' ')[1];

  try {
    const tokenPayload = verifyToken(tokenFromHeader);
    const { userId } = tokenPayload;
    req.userId = userId;
    next();
  } catch (err) {
    console.log('err in decodeToken middleware:', err);
    res.status(403).json({ success: false, message: 'Cannot decode token.' });
  }
}

module.exports = decodeToken;
