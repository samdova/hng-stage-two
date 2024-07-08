// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const generateToken = (user) => {
  return jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
