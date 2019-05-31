const newError = require('http-errors');

module.exports = (req, res, next) => {
  try {
    const id =
      req.params.userId ||
      req.params.recipientId ||
      req.params.senderId ||
      req.body.id_sender ||
      req.body.userId;

    if (req.userData.id === parseInt(id, 10)) {
      return next();
    }
    return next(newError(401, 'Auth failed'));
  } catch (error) {
    return next(newError(500, error));
  }
};
