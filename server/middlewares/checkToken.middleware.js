module.exports = (req, res, next) => {
  try {
    const id =
      req.params.userId ||
      req.params.recipientId ||
      req.params.senderId ||
      req.body.id_sender;
    if (req.userData.id == id) {
      next();
    } else {
      return res.status(401).json({
        message: 'Auth failed',
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};
