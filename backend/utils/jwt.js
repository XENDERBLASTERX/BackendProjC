const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.signToken = (user) => jwt.sign(
  { id: user.id, username: user.username, role: user.role },
  JWT_SECRET,
  { expiresIn: '1d' }
);

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
