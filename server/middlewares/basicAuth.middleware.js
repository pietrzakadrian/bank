/* eslint-disable no-buffer-constructor */
const env = require('../config/env.config.js');

module.exports = function(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.search('Basic ') === 0
  ) {
    if (
      new Buffer(
        req.headers.authorization.split(' ')[1],
        'base64',
      ).toString() === `${env.adminAccount.login}:${env.adminAccount.password}`
    ) {
      next();
    } else {
      res
        .status(401)
        .json({ message: 'Authentication required', success: false });
    }
  }
};
