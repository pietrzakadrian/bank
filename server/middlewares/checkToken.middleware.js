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
    return res.status(401).json({
      message: 'Auth failed',
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
      error,
    });
  }
};
