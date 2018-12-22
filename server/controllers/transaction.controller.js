const db = require('../config/db.config.js');
const Transaction = db.transactions;
const Bill = db.bills;

// ! TODO: Validation
exports.makePayment = (req, res) => {
  // sprawdź, czy istnieje numer konta, na który ma dojść przelew
  Bill.findOne({
    where: {
      account_bill: req.body.account_bill,
    },
  }).then(accountBill => {
    // jeśli istnieje taki numer konta, to daj mi ID właściela-odbiorcy przelewu
    if (accountBill) {
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
            // zaaktualizuj historię płatności sender
            Transaction.create({
              id_sender: req.body.id_sender,
              id_recipient: accountBill.id_owner,
              data_time: today,
              amount_money: req.body.amount_money,
              transfer_title: req.body.transfer_title,
            }).then(() => {
              console.log('utworzono historie');
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
