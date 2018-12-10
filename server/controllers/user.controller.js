const db = require('../config/db.config.js');
const User = db.users;
const bcrypt = require('bcrypt');

// Post a Customer
exports.create = (req, res) => {
  // Save to MySQL database
  const today = new Date();

  User.findOne({
    where: { login: req.body.login },
  }).then(user => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash;

        User.create({
          login: req.body.login,
          password: req.body.password,
          name: req.body.name,
          surname: req.body.surname,
          address: req.body.address,
          date_registration: today,
          last_logged: today,
        })
          .then(user => {
            // Send created customer to client
            res.json({ status: `${user.login} registered` });
          })
          .catch(err => {
            res.send(`error: ${err}`);
          });
      });
    } else {
      res.json({ error: 'User already exists' });
    }
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
