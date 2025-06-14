const { verifyToken } = require('../utils/jwt');
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
