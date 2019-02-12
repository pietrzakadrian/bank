/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
const db = require('../config/db.config.js');
const Additional = db.additionals;

// Update User's Notification Status
exports.isNotification = (req, res) => {
  const id_owner = req.params.userId;
  Additional.findOne({ where: { id_owner } })
    .then(isUser => {
      if (isUser) {
        const notificationStatus = isUser.notification_status;

        if (notificationStatus) {
          res.status(200).json({ isNotification: true });
        } else {
          res.status(200).json({ isNotification: false });
        }
      }
    })
    .catch(() => {
      /* just ignore */
    });
};

// Update User's Notification Status
exports.setNotification = (req, res) => {
  const id_owner = req.params.userId;
  Additional.findOne({ where: { id_owner } }).then(isUser => {
    if (!isUser.notification_status) {
      Additional.update(
        {
          notification_status: 1,
        },
        { where: { id_owner } },
      )
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch(() => {
          /* just ignore */
        });
    }
  });
};

exports.unsetNotification = (req, res) => {
  const id_owner = req.params.userId;
  Additional.findOne({ where: { id_owner } }).then(isUser => {
    if (isUser.notification_status) {
      Additional.update(
        {
          notification_status: 0,
        },
        { where: { id_owner } },
      )
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch(() => {
          /* just ignore */
        });
    }
  });
};
