const newError = require('http-errors');
const { validationResult } = require('express-validator/check');
const db = require('../config/db.config.js');
const Additional = db.additionals;
const Transaction = db.transactions;
const User = db.users;
const Currency = db.currency;

// Update User's Notification Status
exports.isNotification = (req, res, next) => {
  const errors = validationResult(req);
  const id_owner = req.params.userId;

  if (!errors.isEmpty()) {
    return next(newError(422, errors.array()));
  }

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
    .catch(error => {
      next(newError(500, error));
    });
};

exports.unsetNotification = (req, res, next) => {
  const id_owner = req.params.userId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(newError(422, errors.array()));
  }

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
        .catch(error => {
          next(newError(500, error));
        });
    }
  });
};

exports.newNotification = (req, res, next) => {
  const errors = validationResult(req);
  const id_recipient = req.body.userId;
  const limit = req.body.notificationCount;

  function setAuthorizationStatus(status) {
    const authorizationStatus = status;
    return authorizationStatus;
  }

  if (!errors.isEmpty()) {
    return next(newError(422, errors.array()));
  }

  Transaction.findAll({
    limit,
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
    .catch(error => {
      next(newError(500, error));
    });
};
