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

  async function getCurrencyId(id_sender) {
    const isCurrency = await Bill.findOne({
      where: {
        id_owner: id_sender,
      },
    });
    return isCurrency.id_currency;
  }

  function setAvailableFunds(
    recipientId,
    recipientAvailableFunds,
    amountMoney,
  ) {
    return Bill.update(
      {
        available_funds: (
          parseFloat(recipientAvailableFunds) + parseFloat(amountMoney)
        ).toFixed(2),
      },
      { where: { id_owner: recipientId } },
    );
  }

  async function setTransferHistory(
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
      id_currency: await getCurrencyId(senderId),
      transfer_title: transferTitle,
      authorization_key: authorizationKey,
      authorization_status: setAuthorizationStatus(1),
    });
  }

  function setWidgetStatus(recipientId) {
    return Additional.findOne({
      where: {
        id_owner: recipientId,
      },
    })
      .then(isRecipient => {
        if (isRecipient) {
          const accountBalanceHistory = isRecipient.account_balance_history;
          const incomingTransfersSum = isRecipient.incoming_transfers_sum;

          if (accountBalanceHistory === '0,0') {
            return Additional.update(
              {
                account_balance_history: '0,10',
                incoming_transfers_sum: incomingTransfersSum + 10,
                notification_status: 1,
              },
              { where: { id_owner: recipientId } },
            );
          }
          return Additional.update(
            {
              account_balance_history: `${accountBalanceHistory},10`,
              incoming_transfers_sum: incomingTransfersSum + 10,
              notification_status: 1,
            },
            { where: { id_owner: recipientId } },
          );
        }
      })
      .catch(() => {
        /* just ignore */
      });
  }

  try {
    User.findOne({
      where: { login: req.body.login },
    }).then(isUser => {
      if (isUser) {
        const recipientId = isUser.id;
        Bill.findOne({
          where: {
            id_owner: recipientId,
          },
        }).then(isBill => {
          if (isBill) {
            const recipientAvailableFunds = isBill.available_funds;

            Transaction.findOne({
              where: {
                id_recipient: recipientId,
                authorization_key: 'PROMO10',
                authorization_status: 1,
              },
            }).then(isTransaction => {
              if (!isTransaction) {
                setAvailableFunds(
                  recipientId,
                  recipientAvailableFunds,
                  10,
                ).then(() => {
                  setTransferHistory(
                    1,
                    recipientId,
                    10,
                    'Create an account',
                    'PROMO10',
                  ).then(() => {
                    setWidgetStatus(recipientId).then(() => {
                      next();
                    });
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
