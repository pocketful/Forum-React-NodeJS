const { verifyToken } = require('../utils/jwtTokens');

function handleToken(requireToken = true) {
  return function tokenHandler(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    // token false
    if (!authorizationHeader) {
      // token not required, proceed without userId
      if (!requireToken) {
        return next();
      }
      // token required, but not provided
      return res.status(401).json({ success: false, message: 'You have to login first.' });
    }

    // token true
    try {
      const tokenFromHeader = authorizationHeader.split(' ')[1];
      const tokenPayload = verifyToken(tokenFromHeader);
      // user identified
      req.userId = tokenPayload.userId;
      return next();
    } catch (err) {
      console.log('Error in handle token middleware:', err);
      const statusCode = requireToken ? 403 : 401;
      return res.status(statusCode).json({ success: false, message: 'Invalid or expired token.' });
    }
  };
}

module.exports = handleToken;
