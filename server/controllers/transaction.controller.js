const db = require('../config/db.config.js');
const Op = db.Sequelize.Op;
const Transaction = db.transactions;
const Bill = db.bills;
const Additional = db.additionals;

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
    // zaaktualizuj dostępne środki nadawcy przelewu (-)
    Bill.update(
      {
        available_funds: (
          parseFloat(senderAvailableFunds) - parseFloat(amountMoney)
        ).toFixed(2),
      },
      { where: { id_owner: senderId } },
    ).then(() => {
      console.log('odebrano środki nadawcy');
    });

    // zaaktualizuj dostępne środki odbiorcy przelewu (+)
    Bill.update(
      {
        available_funds: (
          parseFloat(recipientAvailableFunds) + parseFloat(amountMoney)
        ).toFixed(2),
      },
      { where: { id_owner: recipientId } },
    ).then(() => {
      console.log('dodano środki nadawcy');
    });
  }

  function setTransferHistory(
    senderId,
    recipientId,
    amountMoney,
    transferTitle,
  ) {
    Transaction.create({
      id_sender: senderId,
      id_recipient: recipientId,
      date_time: getTodayDate(),
      amount_money: amountMoney,
      transfer_title: transferTitle,
    }).then(() => {
      // zaaktualizuj widget
      setWidgetStatus(senderId);
      setWidgetStatus(recipientId);
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
        ).then(() => {
          console.log('historia została zaaktualizowana dla sender');
        });
      }
    });
  }

  // sprawdź, czy istnieje numer konta, na który ma dojść przelew
  Bill.findOne({
    where: {
      account_bill: req.body.account_bill,
    },
  }).then(isAccountBill => {
    const recipientId = isAccountBill.id_owner;
    // jeśli istnieje taki numer konta i czy nie wysylasz do siebie przelewu, to daj mi ID właściela-odbiorcy przelewu
    if (isAccountBill && recipientId !== req.body.id_sender) {
      const senderId = req.body.id_sender;
      const recipientAvailableFunds = isAccountBill.available_funds;
      const amountMoney = req.body.amount_money;
      const transferTitle = req.body.transfer_title;

      // sprawdź czy nadawca posiada wystarczającą ilość gotówki, aby zrealizować przelew
      Bill.findOne({
        where: {
          id_owner: senderId,
        },
      }).then(isAvailableFunds => {
        if (isAvailableFunds) {
          const senderAvailableFunds = isAvailableFunds.available_funds;

          if (senderAvailableFunds >= amountMoney && amountMoney > 0) {
            // zaaktualizuj dostępne środki
            setAvailableFunds(
              senderId,
              recipientId,
              senderAvailableFunds,
              recipientAvailableFunds,
              amountMoney,
            );

            // zaaktualizuj historię płatności
            setTransferHistory(
              senderId,
              recipientId,
              amountMoney,
              transferTitle,
            );
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
  }).then(transactions => {
    res.send(transactions);
  });
};
