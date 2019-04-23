/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
const db = require('../config/db.config.js');
const User = db.users;
const Bill = db.bills;
const Additional = db.additionals;
const Transaction = db.transactions;
const Currency = db.currency;

module.exports = (req, res, next) => {
  function getTodayDate() {
    const today = new Date();
    return today;
  }

  function setAuthorizationStatus(status) {
    const authorizationStatus = status;
    return authorizationStatus;
  }

  async function getCurrencyId(id_owner) {
    try {
      const isCurrency = await Bill.findOne({
        where: {
          id_owner,
        },
      });
      return isCurrency.id_currency;
    } catch (e) {
      console.log(e);
    }
  }

  async function isCurrencyMain(id) {
    try {
      const currencyMain = await Currency.findOne({
        where: {
          id,
        },
      });
      return currencyMain.main_currency;
    } catch (e) {
      console.log(e);
    }
  }

  async function getCurrencyExchangeRate(currencyId) {
    try {
      const isCurrencyExchangeRate = await Currency.findOne({
        where: {
          id: currencyId,
        },
      });
      return isCurrencyExchangeRate.currency_exchange_rate;
    } catch (e) {
      console.log(e);
    }
  }

  function setPromotionalAmount(amount) {
    const promotionalAmount = amount;
    return promotionalAmount;
  }

  function setPromotionCurrencyId(currency) {
    const promotionalCurreny = currency;
    return promotionalCurreny;
  }

  function setPromotionAuthorizationKey(authorizationKey) {
    const promotionAuthorizationKey = authorizationKey;
    return promotionAuthorizationKey;
  }

  function setPromotionSenderId(senderId) {
    const promotionSenderId = senderId;
    return promotionSenderId;
  }

  async function setAvailableFunds(
    recipientId,
    recipientAvailableFunds,
    amountMoney,
    transferCurrencyId,
  ) {
    await addAvailableFunds(
      recipientAvailableFunds,
      amountMoney,
      recipientId,
      transferCurrencyId,
    );
  }

  async function addAvailableFunds(
    recipientAvailableFunds,
    amountMoney,
    recipientId,
    transferCurrencyId,
  ) {
    try {
      const recipientCurrencyId = await getCurrencyId(recipientId);

      if (recipientCurrencyId === transferCurrencyId) {
        Bill.update(
          {
            available_funds: (
              parseFloat(recipientAvailableFunds) + parseFloat(amountMoney)
            ).toFixed(2),
          },
          { where: { id_owner: recipientId } },
        ).then(() => {
          setWidgetStatus(
            recipientId,
            false,
            recipientCurrencyId,
            transferCurrencyId,
          );
        });
      } else {
        const mainCurrency = await isCurrencyMain(recipientCurrencyId);
        const recipientCurrencyExchangeRate = await getCurrencyExchangeRate(
          recipientCurrencyId,
        );
        const transferCurrencyExchangeRate = await getCurrencyExchangeRate(
          transferCurrencyId,
        );

        if (mainCurrency) {
          const convertedAmountMoney =
            amountMoney / transferCurrencyExchangeRate;

          Bill.update(
            {
              available_funds: (
                parseFloat(recipientAvailableFunds) +
                parseFloat(convertedAmountMoney)
              ).toFixed(2),
            },
            { where: { id_owner: recipientId } },
          ).then(() => {
            setWidgetStatus(
              recipientId,
              convertedAmountMoney,
              recipientCurrencyId,
              transferCurrencyId,
            );
          });
        } else {
          const convertedAmountMoney =
            (amountMoney / transferCurrencyExchangeRate) *
            recipientCurrencyExchangeRate;

          Bill.update(
            {
              available_funds: (
                parseFloat(recipientAvailableFunds) +
                parseFloat(convertedAmountMoney)
              ).toFixed(2),
            },
            { where: { id_owner: recipientId } },
          ).then(() => {
            setWidgetStatus(
              recipientId,
              convertedAmountMoney,
              recipientCurrencyId,
              transferCurrencyId,
            );
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function setTransferHistory(
    senderId,
    recipientId,
    amountMoney,
    transferTitle,
    authorizationKey,
  ) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  function setWidgetStatus(
    recipientId,
    convertedAmountMoney,
    recipientCurrencyId,
    transferCurrencyId,
  ) {
    Additional.findOne({
      where: {
        id_owner: recipientId,
      },
    })
      .then(isRecipient => {
        if (isRecipient) {
          const accountBalanceHistory = isRecipient.account_balance_history;
          const incomingTransfersSum = isRecipient.incoming_transfers_sum;
          const notificationCount = isRecipient.notification_count;

          if (accountBalanceHistory === '0,0') {
            if (recipientCurrencyId === transferCurrencyId) {
              return Additional.update(
                {
                  account_balance_history: `0,${setPromotionalAmount(10)}`,
                  incoming_transfers_sum:
                    parseFloat(incomingTransfersSum.toFixed(2)) +
                    parseFloat(setPromotionalAmount(10)),
                  notification_status: 1,
                  notification_count: notificationCount + 1,
                },
                { where: { id_owner: recipientId } },
              );
            } else {
              return Additional.update(
                {
                  account_balance_history: `0,${convertedAmountMoney.toFixed(
                    2,
                  )}`,
                  incoming_transfers_sum:
                    parseFloat(incomingTransfersSum.toFixed(2)) +
                    parseFloat(convertedAmountMoney.toFixed(2)),
                  notification_status: 1,
                  notification_count: notificationCount + 1,
                },
                { where: { id_owner: recipientId } },
              );
            }
          } else {
            if (recipientCurrencyId === transferCurrencyId) {
              return Additional.update(
                {
                  account_balance_history: `${accountBalanceHistory},${setPromotionalAmount(
                    10,
                  )}`,
                  incoming_transfers_sum:
                    parseFloat(incomingTransfersSum.toFixed(2)) +
                    parseFloat(convertedAmountMoney.toFixed(2)),
                  notification_status: 1,
                  notification_count: notificationCount + 1,
                },
                { where: { id_owner: recipientId } },
              );
            } else {
              return Additional.update(
                {
                  account_balance_history: `${accountBalanceHistory},${convertedAmountMoney.toFixed(
                    2,
                  )}`,
                  incoming_transfers_sum:
                    parseFloat(incomingTransfersSum.toFixed(2)) +
                    parseFloat(convertedAmountMoney.toFixed(2)),
                  notification_status: 1,
                  notification_count: notificationCount + 1,
                },
                { where: { id_owner: recipientId } },
              );
            }
          }
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
                authorization_key: setPromotionAuthorizationKey('PROMO10'),
                authorization_status: 1,
              },
            }).then(async isTransaction => {
              if (!isTransaction) {
                await setAvailableFunds(
                  recipientId,
                  recipientAvailableFunds,
                  setPromotionalAmount(10),
                  setPromotionCurrencyId(1),
                ).then(() => {
                  setTransferHistory(
                    setPromotionSenderId(1),
                    recipientId,
                    setPromotionalAmount(10),
                    'Create an account',
                    setPromotionAuthorizationKey('PROMO10'),
                  ).then(isTrasferHistory => {
                    if (isTrasferHistory) {
                      next();
                    }
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
