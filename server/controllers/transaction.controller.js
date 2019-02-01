const nodemailer = require('nodemailer');
const db = require('../config/db.config.js');
const env = require('../config/env.config.js');
const Op = db.Sequelize.Op;
const Transaction = db.transactions;
const Bill = db.bills;
const Additional = db.additionals;
const User = db.users;

exports.confirm = (req, res) => {
  function getTodayDate() {
    const today = new Date();
    return today;
  }

  function getPreviousMonthDate(today) {
    const previousMonth = new Date();
    previousMonth.setMonth(today.getMonth() - 1);
    return previousMonth;
  }

  function setAuthorizationStatus(status) {
    const authorizationStatus = status;
    return authorizationStatus;
  }

  function setAvailableFunds(
    senderId,
    recipientId,
    senderAvailableFunds,
    recipientAvailableFunds,
    amountMoney,
  ) {
    Bill.update(
      {
        available_funds: (
          parseFloat(senderAvailableFunds) - parseFloat(amountMoney)
        ).toFixed(2),
      },
      { where: { id_owner: senderId } },
    );

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
    return Transaction.update(
      {
        authorization_status: setAuthorizationStatus(1),
        date_time: getTodayDate(),
      },
      {
        where: {
          id_sender: senderId,
          id_recipient: recipientId,
          amount_money: amountMoney,
          transfer_title: transferTitle,
          authorization_key: authorizationKey,
          authorization_status: setAuthorizationStatus(0),
        },
      },
    );
  }

  function setWidgetStatus(userId) {
    let availableFunds = null;
    let accountBalanceHistory = 0; // TODO: always prepend 0, but balance history is only from the last month
    let incomingTransfersSum = 0; // *
    let outgoingTransfersSum = 0; // *

    Transaction.findAll({
      where: db.Sequelize.and(
        {
          date_time: {
            [Op.between]: [
              getPreviousMonthDate(getTodayDate()),
              getTodayDate(),
            ],
          },
          authorization_status: setAuthorizationStatus(1),
        },
        db.Sequelize.or({ id_sender: userId }, { id_recipient: userId }),
      ),
      order: [['date_time', 'ASC']],
    }).then(transactionsHistory => {
      if (transactionsHistory) {
        for (let i = 0; i < transactionsHistory.length; i++) {
          if (transactionsHistory[i].id_sender === userId) {
            outgoingTransfersSum += transactionsHistory[i].amount_money;
            availableFunds -= transactionsHistory[i].amount_money;
            accountBalanceHistory += `,${availableFunds}`;
          }

          if (transactionsHistory[i].id_recipient === userId) {
            incomingTransfersSum += transactionsHistory[i].amount_money;
            availableFunds += transactionsHistory[i].amount_money;
            accountBalanceHistory += `,${availableFunds}`;
          }
        }

        Additional.update(
          {
            account_balance_history: accountBalanceHistory,
            outgoing_transfers_sum: outgoingTransfersSum,
            incoming_transfers_sum: incomingTransfersSum,
          },
          { where: { id_owner: userId } },
        );
      }
    });
  }

  Bill.findOne({
    where: {
      account_bill: req.body.account_bill,
    },
  }).then(isAccountBill => {
    if (isAccountBill) {
      const recipientId = isAccountBill.id_owner;
      const senderId = req.body.id_sender;
      const recipientAvailableFunds = isAccountBill.available_funds;
      const amountMoney = req.body.amount_money;
      const transferTitle = req.body.transfer_title;
      const authorizationKey = req.body.authorization_key;

      if (recipientId !== senderId) {
        Bill.findOne({
          where: {
            id_owner: senderId,
          },
        }).then(isAvailableFunds => {
          if (isAvailableFunds) {
            const senderAvailableFunds = isAvailableFunds.available_funds;
            if (senderAvailableFunds >= amountMoney && amountMoney > 0) {
              Transaction.findOne({
                where: {
                  id_sender: senderId,
                  id_recipient: recipientId,
                  amount_money: amountMoney,
                  transfer_title: transferTitle,
                  authorization_key: authorizationKey,
                  authorization_status: setAuthorizationStatus(0),
                },
                order: [['date_time', 'DESC']],
              }).then(isAuthorizationKey => {
                if (
                  isAuthorizationKey &&
                  isAuthorizationKey.authorization_key === authorizationKey
                ) {
                  setAvailableFunds(
                    senderId,
                    recipientId,
                    senderAvailableFunds,
                    recipientAvailableFunds,
                    amountMoney,
                  );

                  setTransferHistory(
                    senderId,
                    recipientId,
                    amountMoney,
                    transferTitle,
                    authorizationKey,
                  ).then(() => {
                    setWidgetStatus(senderId);
                    setWidgetStatus(recipientId);
                  });
                  return res.status(200).json({ success: true });
                }
                return res.status(404).json({
                  message:
                    'Incorrect authorization key or unregistered payment',
                  success: false,
                });
              });
            } else {
              return res.status(400).json({
                error: 'Sender does not have enough money',
                success: false,
              });
            }
          } else {
            return res
              .status(404)
              .json({ error: 'Sender does not exist', success: false });
          }
        });
      } else {
        return res
          .status(404)
          .json({ error: 'Attempt payment to myself', success: false });
      }
    } else {
      return res
        .status(404)
        .json({ error: 'Recipient does not exist', success: false });
    }
  });
};

exports.register = (req, res) => {
  function getTodayDate() {
    const today = new Date();
    return today;
  }

  function setAuthorizationStatus(status) {
    const authorizationStatus = status;
    return authorizationStatus;
  }

  async function getSenderEmail(id) {
    try {
      const isUser = await User.findOne({
        where: {
          id,
        },
      });
      return isUser.email;
    } catch (e) {
      /* just ignore */
    }
  }

  async function getRecipientName(id) {
    try {
      const isUser = await User.findOne({
        where: {
          id,
        },
      });
      return `${isUser.name} ${isUser.surname}`;
    } catch (e) {
      /* just ignore */
    }
  }

  function setAuthorizationKey() {
    let authorizationKey = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 5; i++)
      authorizationKey += possible.charAt(
        Math.floor(Math.random() * possible.length),
      );

    return authorizationKey;
  }

  // function getAmountMoney(amountMoney) {
  //   const formattedAmountMoney = amountMoney
  //     .toFixed(2)
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  //     .replace('.', ',');

  //   return formattedAmountMoney;
  // }

  async function sendAuthorizationKey(
    senderId,
    recipientId,
    amountMoney,
    authorizationKey,
  ) {
    await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: env.nodemailer.host,
      port: env.nodemailer.port,
      secure: false,
      auth: {
        user: env.nodemailer.username,
        pass: env.nodemailer.password,
      },
    });

    const mailOptions = {
      from: `"Bank Application" <${env.nodemailer.email}>`,
      to: `${await getSenderEmail(senderId)}`,
      subject: 'Autoryzacja płatności',
      text: `Drogi kliencie! Zarejestrowaliśmy próbę wykonania płatności na kwotę: ${amountMoney} PLN do ${await getRecipientName(
        recipientId,
      )}. Potwierdź płatność, wpisując klucz autoryzacyjny: ${authorizationKey}`,
      html: `Drogi kliencie!<br>Zarejestrowaliśmy próbę wykonania płatności na kwotę: ${amountMoney} PLN do ${await getRecipientName(
        recipientId,
      )}.<br><br>Potwierdź płatność, wpisując klucz autoryzacyjny: <b>${authorizationKey}</b>`,
    };

    await transporter.sendMail(mailOptions);
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
      authorization_status: setAuthorizationStatus(0),
    });
  }

  Bill.findOne({
    where: {
      account_bill: req.body.account_bill,
    },
  }).then(isAccountBill => {
    if (isAccountBill) {
      const recipientId = isAccountBill.id_owner;
      const authorizationKey = setAuthorizationKey();
      const senderId = req.body.id_sender;
      const amountMoney = req.body.amount_money;
      const transferTitle = req.body.transfer_title;

      if (recipientId !== senderId) {
        Bill.findOne({
          where: {
            id_owner: senderId,
          },
        }).then(isAvailableFunds => {
          if (isAvailableFunds) {
            const senderAvailableFunds = isAvailableFunds.available_funds;

            if (senderAvailableFunds >= amountMoney && amountMoney > 0) {
              Transaction.findOne({
                where: {
                  id_sender: senderId,
                  id_recipient: recipientId,
                  amount_money: amountMoney,
                  transfer_title: transferTitle,
                  authorization_key: authorizationKey,
                  authorization_status: setAuthorizationStatus(0),
                },
                order: [['date_time', 'DESC']],
              }).then(isAuthorizationKey => {
                if (!isAuthorizationKey) {
                  setTransferHistory(
                    senderId,
                    recipientId,
                    amountMoney,
                    transferTitle,
                    authorizationKey,
                  );

                  sendAuthorizationKey(
                    senderId,
                    recipientId,
                    amountMoney,
                    authorizationKey,
                  ).catch(console.error);

                  return res.status(200).json({ success: true });
                }
                return res.status(400).json({
                  error: 'Authorization key has been sent',
                  success: false,
                });
              });
            } else {
              return res.status(400).json({
                error: 'Sender does not have enough money',
                success: false,
              });
            }
          } else {
            return res
              .status(404)
              .json({ error: 'Id sender doesnt exist', success: false });
          }
        });
      } else {
        return res
          .status(404)
          .json({ error: 'Attempt payment to myself', success: false });
      }
    } else {
      return res
        .status(404)
        .json({ error: 'Recipient does not exist', success: false });
    }
  });
};

exports.getRecipientdata = (req, res) => {
  function setAuthorizationStatus(status) {
    const authorizationStatus = status;
    return authorizationStatus;
  }

  const id_recipient = req.params.recipientId;
  Transaction.findAll({
    limit: 4,
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
    ],
  })
    .then(transactions => {
      res.send(transactions);
    })
    .catch(err => {
      /* just ignore */
    });
};

exports.getSenderdata = (req, res) => {
  function setAuthorizationStatus(status) {
    const authorizationStatus = status;
    return authorizationStatus;
  }

  const id_sender = req.params.senderId;
  Transaction.findAll({
    limit: 4,
    where: {
      id_sender,
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
        as: 'getRecipientdata',
        where: { id: db.Sequelize.col('transaction.id_sender') },
        attributes: ['name', 'surname'],
      },
    ],
  })
    .then(transactions => {
      res.send(transactions);
    })
    .catch(err => {
      /* just ignore */
    });
};
