const db = require('../config/db.config.js');
const Transaction = db.transactions;

// Post a Customer
exports.create = (req, res) => {
  // Save to MySQL database
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
