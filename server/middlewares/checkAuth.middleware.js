const jwt = require('jsonwebtoken');
const env = require('../config/env.config.js');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, env.SECRET_KEY);
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};
