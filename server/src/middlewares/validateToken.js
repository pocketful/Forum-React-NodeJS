const { verifyToken } = require('../utils/jwtTokens');

async function validateToken(req, res, next) {
  const tokenFromHeader = req.headers.authorization?.split(' ')[1];
  // console.log('tokenFromHeader:', tokenFromHeader);

  // if token doesn't exist
  if (!tokenFromHeader) {
    console.log('no token');
    res.status(401).json({ success: false, message: 'No token.' });
    return;
  }

  // token exist
  try {
    const tokenPayload = verifyToken(tokenFromHeader);
    // console.log('tokenPayload:', tokenPayload);

    // pass userId as req to the next function
    const { userId } = tokenPayload;
    req.userId = userId;
    next();
  } catch (err) {
    console.log('err in validateToken middleware:', err);
    res.status(403).json({ success: false, message: 'Invalid token, please login.' });
  }
}

module.exports = validateToken;
