const db = require('../config/db.config.js');
const User = db.users;
const Bill = db.bills;
const Additional = db.additionals;
const Transaction = db.transactions;

module.exports = (req, res, next) => {
  function getTodayDate() {
    const today = new Date();
    return today;
  }

  function setAuthorizationStatus(status) {
    const authorizationStatus = status;
    return authorizationStatus;
  }

  function setAvailableFunds(
    recipientId,
    recipientAvailableFunds,
    amountMoney,
  ) {
    Bill.update(
      {
        available_funds: (
          parseFloat(recipientAvailableFunds) + parseFloat(amountMoney)
        ).toFixed(2),
      },
      { where: { id_owner: recipientId } },
    );
  }

  function setTransferHistory(
    senderId,
    recipientId,
    amountMoney,
    transferTitle,
    authorizationKey,
  ) {
    return Transaction.create({
      id_sender: senderId,
      id_recipient: recipientId,
      date_time: getTodayDate(),
      amount_money: amountMoney,
      transfer_title: transferTitle,
      authorization_key: authorizationKey,
      authorization_status: setAuthorizationStatus(1),
    });
  }

  function setWidgetStatus(recipientId) {
    return Additional.update(
      {
        account_balance_history: '0,10',
        outgoing_transfers_sum: 0,
        incoming_transfers_sum: 10,
      },
      { where: { id_owner: recipientId } },
    );
  }
  try {
    User.findOne({
      where: { login: req.body.login },
    }).then(isUser => {
      if (isUser) {
        const recipientId = isUser.id;
        Transaction.findOne({
          where: {
            id_recipient: recipientId,
            authorization_key: 'PROMO10',
            authorization_status: 1,
          },
        }).then(isTransaction => {
          if (!isTransaction) {
            setAvailableFunds(recipientId, 0, 10);
            setTransferHistory(
              1,
              recipientId,
              10,
              'Rejestracja konta',
              'PROMO10',
            ).then(() => {
              setWidgetStatus(recipientId).then(() => {
                next();
              });
            });
          } else {
            next();
          }
        });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};
