const nodemailer = require('nodemailer');
const db = require('../config/db.config.js');
const env = require('../config/env.config.js');
const Op = db.Sequelize.Op;
const Transaction = db.transactions;
const Bill = db.bills;
const Additional = db.additionals;
const User = db.users;

exports.create = (req, res) => {
  function getTodayDate() {
    const today = new Date();
    return today;
  }

  function getPreviousMonthDate(today) {
    const previousMonth = new Date();
    previousMonth.setMonth(today.getMonth() - 1);
    return previousMonth;
  }

  function getAuthorizationKey() {
    let authorizationKey = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 5; i++)
      authorizationKey += possible.charAt(
        Math.floor(Math.random() * possible.length),
      );

    return authorizationKey;
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

  async function sendAuthorizationKey(senderId, amountMoney) {
    const authorizationKey = getAuthorizationKey();
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
      text: `Drogi kliencie! Zarejestrowaliśmy próbę wykonania płatności na kwotę: ${amountMoney
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace(
          '.',
          ',',
        )}. Potwierdź płatność, wpisując klucz autoryzacyjny: ${authorizationKey}`,
      html: `Drogi kliencie!<br>Zarejestrowaliśmy próbę wykonania płatności na kwotę: ${amountMoney
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace(
          '.',
          ',',
        )} PLN.<br><br>Potwierdź płatność, wpisując klucz autoryzacyjny: <b>${authorizationKey}</b>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
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
  ) {
    return Transaction.create({
      id_sender: senderId,
      id_recipient: recipientId,
      date_time: getTodayDate(),
      amount_money: amountMoney,
      transfer_title: transferTitle,
    });
  }

  function setWidgetStatus(userId) {
    let availableFunds = null;
    let accountBalanceHistory = 0; // TODO: remove prepend 0

    Transaction.findAll({
      where: db.Sequelize.and(
        {
          date_time: {
            [Op.between]: [
              getPreviousMonthDate(getTodayDate()),
              getTodayDate(),
            ],
          },
        },
        db.Sequelize.or({ id_sender: userId }, { id_recipient: userId }),
      ),
      order: [['date_time', 'ASC']],
    }).then(transactionsHistory => {
      if (transactionsHistory) {
        for (let i = 0; i < transactionsHistory.length; i++) {
          if (transactionsHistory[i].id_sender === userId) {
            availableFunds -= transactionsHistory[i].amount_money;
            accountBalanceHistory += `,${availableFunds}`;
          }

          if (transactionsHistory[i].id_recipient === userId) {
            availableFunds += transactionsHistory[i].amount_money;
            accountBalanceHistory += `,${availableFunds}`;
          }
        }

        Additional.update(
          {
            account_balance_history: accountBalanceHistory,
          },
          { where: { id_owner: userId } },
        );
      }
    });
  }

  const senderId = req.body.id_sender;
  if (req.userData.id == senderId) {
    Bill.findOne({
      where: {
        account_bill: req.body.account_bill,
      },
    }).then(isAccountBill => {
      const recipientId = isAccountBill.id_owner;

      if (isAccountBill && recipientId !== req.body.id_sender) {
        const recipientAvailableFunds = isAccountBill.available_funds;
        const amountMoney = req.body.amount_money;
        const transferTitle = req.body.transfer_title;

        Bill.findOne({
          where: {
            id_owner: senderId,
          },
        }).then(isAvailableFunds => {
          if (isAvailableFunds) {
            const senderAvailableFunds = isAvailableFunds.available_funds;

            if (senderAvailableFunds >= amountMoney && amountMoney > 0) {
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
              ).then(() => {
                setWidgetStatus(senderId);
                setWidgetStatus(recipientId);
                sendAuthorizationKey(senderId, amountMoney).catch(
                  console.error,
                );
              });

              return res.status(200).json({ message: 'Payment ok' });
            }
            return res
              .status(400)
              .json({ error: 'Id sender doesnt have enough money' });
          }
          return res.status(400).json({ error: 'Id sender doesnt exist' });
        });
      }
    });
  } else {
    res.status(400).json({ error: 'no access' });
  }
};

exports.getRecipientdata = (req, res) => {
  const id_recipient = req.params.recipientId;
  if (req.userData.id == id_recipient) {
    Transaction.findAll({
      where: {
        id_recipient,
      },
      attributes: [
        'amount_money',
        'date_time',
        'id_recipient',
        'id_sender',
        'transfer_title',
      ],
      include: [
        {
          model: User,
          as: 'getSenderdata',
          where: { id: db.Sequelize.col('transaction.id_sender') },
          attributes: ['name', 'surname'],
        },
      ],
    }).then(transactions => {
      res.send(transactions);
    });
  } else {
    res.status(400).json({ error: 'no access' });
  }
};

exports.getSenderdata = (req, res) => {
  const id_sender = req.params.senderId;
  if (req.userData.id == id_sender) {
    Transaction.findAll({
      where: {
        id_sender,
      },
      attributes: [
        'amount_money',
        'date_time',
        'id_recipient',
        'id_sender',
        'transfer_title',
      ],
      include: [
        {
          model: User,
          as: 'getRecipientdata',
          where: { id: db.Sequelize.col('transaction.id_sender') },
          attributes: ['name', 'surname'],
        },
      ],
    }).then(transactions => {
      res.send(transactions);
    });
  } else {
    res.status(400).json({ error: 'no access' });
  }
};
