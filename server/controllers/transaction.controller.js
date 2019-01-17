const db = require('../config/db.config.js');
const Op = db.Sequelize.Op;
const Transaction = db.transactions;
const Bill = db.bills;
const Additional = db.additionals;
const moment = require('moment');

exports.makePayment = (req, res) => {
  // sprawdź, czy istnieje numer konta, na który ma dojść przelew
  Bill.findOne({
    where: {
      account_bill: req.body.account_bill,
    },
  }).then(accountBill => {
    // jeśli istnieje taki numer konta i czy nie wysylasz do siebie przelewu, to daj mi ID właściela-odbiorcy przelewu
    if (accountBill && accountBill.id_owner !== req.body.id_sender) {
      console.log('accountBill.id_owner', accountBill.id_owner);

      // sprawdź czy nadawca posiada wystarczającą ilość gotówki, aby zrealizować przelew
      Bill.findOne({
        where: {
          id_owner: req.body.id_sender,
        },
      }).then(ownerId => {
        if (ownerId) {
          console.log('ownerId.available_funds', ownerId.available_funds);

          const availableFunds = ownerId.available_funds;
          const amountMoney = req.body.amount_money;
          if (availableFunds >= amountMoney && amountMoney > 0) {
            console.log('prawidlowa suma pieniedzy');

            // zaaktualizuj dostępne środki nadawcy przelewu (-)
            Bill.update(
              {
                available_funds: (
                  parseFloat(ownerId.available_funds) - parseFloat(amountMoney)
                ).toFixed(2),
              },
              { where: { id_owner: req.body.id_sender } },
            ).then(() => {
              console.log('odebrano środki nadawcy');
            });

            // zaaktualizuj dostępne środki odbiorcy przelewu (+)
            Bill.update(
              {
                available_funds: (
                  parseFloat(accountBill.available_funds) +
                  parseFloat(amountMoney)
                ).toFixed(2),
              },
              { where: { id_owner: accountBill.id_owner } },
            ).then(() => {
              console.log('dodano środki nadawcy');
            });

            const today = new Date();
            const previousMonth = new Date();
            previousMonth.setMonth(today.getMonth() - 1);
            // zaaktualizuj historię płatności sender
            Transaction.create({
              id_sender: req.body.id_sender,
              id_recipient: accountBill.id_owner,
              data_time: today,
              amount_money: req.body.amount_money,
              transfer_title: req.body.transfer_title,
            }).then(() => {
              var number = null;
              var string = '0'; // change string to string in database
              // ! TODO: baza danych pokazuje rekordy z ostatniego miesiaca, a zawsze przed te rekordy pchasz 0
              // zaaktualizuj widget dla sender
              Transaction.findAll({
                where: db.Sequelize.and(
                  {
                    data_time: { [Op.between]: [previousMonth, today] },
                  },
                  db.Sequelize.or(
                    { id_sender: req.body.id_sender },
                    { id_recipient: req.body.id_sender },
                  ),
                ),
                order: [['data_time', 'ASC']],
              }).then(transaction_history => {
                if (transaction_history) {
                  for (let i = 0; i < transaction_history.length; i++) {
                    if (
                      transaction_history[i].id_sender === req.body.id_sender
                    ) {
                      number -= transaction_history[i].amount_money;
                      string += `,${number}`;
                    }

                    if (
                      transaction_history[i].id_recipient === req.body.id_sender
                    ) {
                      number += transaction_history[i].amount_money;
                      string += `,${number}`;
                    }
                  }

                  Additional.update(
                    {
                      account_balance_history: string,
                    },
                    { where: { id_owner: req.body.id_sender } },
                  ).then(() => {
                    console.log('historia została zaaktualizowana dla sender');
                  });
                }
              });
            });
            var number = null;
            var string = '0';
             // zaaktualizuj widget dla recipient
            Transaction.findAll({
               where: db.Sequelize.and(
                 {
                   data_time: { [Op.between]: [previousMonth, today] },
                 },
                 db.Sequelize.or(
                   { id_sender: accountBill.id_owner },
                   { id_recipient: accountBill.id_owner },
                 ),
               ),
               order: [['data_time', 'ASC']],
             }).then(transaction_history => {
               if (transaction_history) {
                 for (let i = 0; i < transaction_history.length; i++) {
                   if (
                     transaction_history[i].id_sender === accountBill.id_owner
                   ) {
                     number -= transaction_history[i].amount_money;
                     string += `,${number}`;
                   }

                   if (
                     transaction_history[i].id_recipient === accountBill.id_owner
                   ) {
                     number += transaction_history[i].amount_money;
                     string += `,${number}`;
                   }
                 }

                 Additional.update(
                   {
                     account_balance_history: string,
                   },
                   { where: { id_owner: accountBill.id_owner } },
                 ).then(() => {
                   console.log('historia została zaaktualizowana dla recipient');
                 });
               }
             });
          } else {
            res.status(404).send(`Id sender doesn't have enough money`);
          }
        } else {
          res.status(404).send(`Id sender doesn't exist`);
        }
      });
    } else {
      res.status(404).send(`Account bill doesn't exist`);
    }
  });
  res.status(200).send(`Payment ok`);
};

// Create new transaction Action
exports.create = (req, res) => {
  const today = new Date();
  Transaction.create({
    id_sender: req.body.id_sender,
    id_recipient: req.body.id_recipient,
    data_time: today,
    amount_money: req.body.amount_money,
    transfer_title: req.body.transfer_title,
  }).then(transaction => {
    // Send created customer to client
    res.send(transaction);
  });
};

// FETCH all Customers
exports.findAll = (req, res) => {
  Transaction.findAll().then(transactions => {
    // Send all customers to Client
    res.send(transactions);
  });
};

exports.findAllByIdRecipient = (req, res) => {
  Transaction.findAll({
    where: {
      id_recipient: req.params.transactionRecipientId,
    },
  }).then(transaction => {
    res.send(transaction);
  });
};

exports.findAllByIdSender = (req, res) => {
  Transaction.findAll({
    where: {
      id_sender: req.params.transactionSenderId,
    },
  }).then(transaction => {
    res.send(transaction);
  });
};

// Find a Customer by Id
exports.findById = (req, res) => {
  Transaction.findById(req.params.transactionId).then(user => {
    res.send(user);
  });
};

// Update a Customer
exports.update = (req, res) => {
  const id = req.params.transactionId;
  Transaction.update(
    {
      id_sender: req.body.id_sender,
      id_recipient: req.body.id_recipient,
      amount_money: req.body.amount_money,
      transfer_title: req.body.transfer_title,
    },
    { where: { id: req.params.transactionId } },
  ).then(() => {
    res.status(200).send(`updated successfully a customer with id = ${id}`);
  });
};

// Delete a Customer by Id
exports.delete = (req, res) => {
  const id = req.params.transactionId;
  Transaction.destroy({
    where: { id },
  }).then(() => {
    res.status(200).send(`deleted successfully a customer with id = ${id}`);
  });
};
