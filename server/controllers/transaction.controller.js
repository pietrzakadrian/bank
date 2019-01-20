const db = require('../config/db.config.js');
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

  Bill.findOne({
    where: {
      account_bill: req.body.account_bill,
    },
  }).then(isAccountBill => {
    const recipientId = isAccountBill.id_owner;

    if (isAccountBill && recipientId !== req.body.id_sender) {
      const senderId = req.body.id_sender;
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
};

exports.getRecipientdata = (req, res) => {
  const userId = req.params.recipientId;
  Transaction.findAll({
    where: {
      id_recipient: userId,
    },
    attributes: [
      'amount_money',
      'date_time',
      'transfer_title',
      'id_recipient',
      'id_sender',
    ],
  }).then(transactions => {
    res.send(transactions);
  });
};

exports.getSenderdata = (req, res) => {
  const userId = req.params.senderId;
  Transaction.findAll({
    where: {
      id_sender: userId,
    },
    attributes: [
      'amount_money',
      'date_time',
      'transfer_title',
      'id_recipient',
      'id_sender',
    ],
  }).then(transactions => {
    res.send(transactions);
  });
};
