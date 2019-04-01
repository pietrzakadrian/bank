module.exports = (req, res, next) => {
  try {
    const id =
      req.params.userId ||
      req.params.recipientId ||
      req.params.senderId ||
      req.body.id_sender;
    if (req.userData.id === parseInt(id, 10)) {
      next();
      return false;
    }
    return res.status(401).json({
      message: 'Auth failed',
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};
