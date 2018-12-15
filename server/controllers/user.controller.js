const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');
const env = require('../config/env.config.js');
const User = db.users;

// Register Action
exports.create = (req, res) => {
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

// Login Action
exports.findOne = (req, res) => {
  User.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(
            {
              id: user.id,
              login: user.login,
              name: user.name,
              password: req.body.password,
              surname: user.surname,
              address: user.address,
              last_logged: user.last_logged,
            },
            env.SECRET_KEY,
            {
              expiresIn: 1440,
            },
          );
          return res.status(200).json({
            message: 'Auth successful',
            token,
          });
        }
        res
          .status(400)
          .json({ error: 'Auth failed. The password is incorrect.' });
      } else {
        res.status(400).json({ error: 'Auth failed. User does not exist' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Find a User by Id
exports.findById = (req, res) => {
  User.findById(req.params.userId).then(user => {
    res.send(user);
  });
};

// Update a User
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

// Delete a User by Id
exports.delete = (req, res) => {
  const login = req.params.userLogin;
  User.destroy({
    where: { login: req.body.login },
  }).then(() => {
    res
      .status(200)
      .send(`deleted successfully a customer with login = ${login}`);
  });
};

// // Display all Users
// exports.findAll = (req, res) => {
//   User.findAll().then(users => {
//     // Send all customers to Client
//     res.send(users);
//   });
// };
