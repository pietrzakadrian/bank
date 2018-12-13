const db = require('../config/db.config.js');
const Bill = db.bills;

// Post a Customer
exports.create = (req, res) => {
  // Save to MySQL database
  Bill.create({
    id_owner: req.body.id_owner,
    account_bill: req.body.account_bill,
    available_funds: req.body.available_funds,
  })
    .then(bill => {
      // Send created customer to client
      res.send(bill);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// // FETCH all Customers
exports.findAll = (req, res) => {
  Bill.findAll()
    .then(bills => {
      // Send all customers to Client
      res.send(bills);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// // Find a Customer by Id
// exports.findById = (req, res) => {
//   Bill.findById(req.params.billId).then(bill => {
//     res.send(bill);
//   });
// };

// Find a Customer by Id
exports.findAllByIdOwner = (req, res) => {
  Bill.findAll({ where: { id_owner: req.params.billOwnerId } })
    .then(bill => {
      res.send(bill);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Update a Customer
exports.update = (req, res) => {
  const id = req.params.billId;

  Bill.update(
    {
      id_owner: req.body.id_owner,
      account_bill: req.body.account_bill,
      available_funds: req.body.available_funds,
    },
    { where: { id: req.params.billId } },
  )
    .then(() => {
      res.status(200).send(`updated successfully a customer with id = ${id}`);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Delete a Customer by Id
exports.delete = (req, res) => {
  const id = req.params.billId;
  Bill.destroy({
    where: { id },
  })
    .then(() => {
      res.status(200).send(`deleted successfully a customer with id = ${id}`);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
