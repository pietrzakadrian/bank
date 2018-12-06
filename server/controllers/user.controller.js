const db = require('../config/db.config.js');
const User = db.users;

// Post a Customer
exports.create = (req, res) => {
  // Save to MySQL database
  User.create({
    login: req.body.login,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    address: req.body.address,
  }).then(user => {
    // Send created customer to client
    res.send(user);
  });
};

// FETCH all Customers
exports.findAll = (req, res) => {
  User.findAll().then(users => {
    // Send all customers to Client
    res.send(users);
  });
};

// Find a Customer by Id
exports.findById = (req, res) => {
  User.findById(req.params.userId).then(user => {
    res.send(user);
  });
};

// Update a Customer
exports.update = (req, res) => {
  const id = req.params.userId;
  User.update(
    {
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      address: req.body.address,
    },
    { where: { id: req.params.userId } },
  ).then(() => {
    res.status(200).send(`updated successfully a customer with id = ${id}`);
  });
};

// Delete a Customer by Id
exports.delete = (req, res) => {
  const id = req.params.userId;
  User.destroy({
    where: { id },
  }).then(() => {
    res.status(200).send(`deleted successfully a customer with id = ${id}`);
  });
};
