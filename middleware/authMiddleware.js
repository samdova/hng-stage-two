// middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: 'Unauthorized',
      message: 'No token provided',
      statusCode: 401,
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'Unauthorized',
      message: 'Invalid token',
      statusCode: 401,
    });
  }
};

module.exports = authMiddleware;
