const db = require('../config/db.config.js');
const Additional = db.additionals;
const Transaction = db.transactions;
const User = db.users;
const Currency = db.currency;
const Op = db.Sequelize.Op;

// Update User's Notification Status
exports.isNotification = (req, res) => {
  const id_owner = req.params.userId;
  Additional.findOne({ where: { id_owner } })
    .then(isUser => {
      if (isUser) {
        const notificationStatus = isUser.notification_status;
        const notificationCount = isUser.notification_count;

        if (notificationStatus) {
          res.status(200).json({
            isNotification: true,
            notificationCount,
          });
        } else {
          res.status(200).json({ isNotification: false });
        }
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
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
          notification_count: isUser.notification_count + 1,
        },
        { where: { id_owner } },
      )
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch(() => {
          res.status(500).json({ error: 'Internal server error' });
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
          notification_count: 0,
        },
        { where: { id_owner } },
      )
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch(() => {
          res.status(500).json({ error: 'Internal server error' });
        });
    }
  });
};

exports.newNotification = (req, res) => {
  function setAuthorizationStatus(status) {
    const authorizationStatus = status;
    return authorizationStatus;
  }

  const id_recipient = req.body.userId;
  const limit = req.body.notificationCount;

  Transaction.findAll({
    where: {
      id_recipient,
      authorization_status: setAuthorizationStatus(1),
    },
    attributes: [
      'amount_money',
      'date_time',
      'id_recipient',
      'id_sender',
      'transfer_title',
    ],
    order: [['date_time', 'DESC']],
    limit,
    include: [
      {
        model: User,
        as: 'getSenderdata',
        where: { id: db.Sequelize.col('transaction.id_sender') },
        attributes: ['name', 'surname'],
      },
      {
        model: Currency,
        where: { id: db.Sequelize.col('transaction.id_sender') },
        attributes: ['currency'],
      },
    ],
  })
    .then(transactions => {
      if (transactions) {
        res.status(200).json({ result: transactions, success: true });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};
