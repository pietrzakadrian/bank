const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');
const env = require('../config/env.config.js');
const User = db.users;
const Bill = db.bills;

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
        })
          .then(user =>
            // ! TODO: If account_bill exist
            Bill.create({
              id_owner: user.id,
              account_bill: `022232${Math.floor(
                Math.random() * 90000000000000000000,
              ) + 10000000000000000000}`,
              available_funds: 0,
            }).then(account => {
              res.status(200).send('User register OK');
            }),
          )
          .catch(err => {
            res.status(400).json({ error: 'Register failed.' });
          });
      });
    } else {
      res.status(400).json({ error: 'User already exists.' });
    }
  });
};

// Login Action
exports.login = (req, res) => {
  User.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then(user => {
      if (user) {
        const today = new Date();
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(
            {
              id: user.id,
            },
            env.SECRET_KEY,
            {
              expiresIn: '15m',
            },
          );

          User.update(
            {
              last_present_logged: today,
            },
            { where: { login: req.body.login } },
          ).then(() => {});

          return res.status(200).json({
            message: 'Auth successful',
            token,
          });
        }
        res
          .status(400)
          .json({ error: 'Auth failed. The password is incorrect.' });

        User.update(
          {
            last_failed_logged: today,
          },
          { where: { login: req.body.login } },
        ).then(() => {});
      } else {
        res.status(400).json({ error: 'Auth failed. User does not exist' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Find a User by Login for Register Action
exports.findByLogin = (req, res) => {
  User.findOne({
    where: {
      login: req.params.userLogin,
    },
  })
    .then(login => {
      if (login) {
        res.status(200).json({ user_exist: true });
      } else {
        res.status(400).json({ user_exist: false });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Find a User by Id Action
exports.findById = (req, res) => {
  User.findOne({
    where: {
      id: req.params.userId,
    },
  })
    .then(user => {
      if (user) {
        res.status(200).json({
          name: user.name,
          surname: user.surname,
          last_successful_logged: user.last_successful_logged,
          last_failed_logged: user.last_failed_logged,
          last_present_logged: user.last_present_logged,
        });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Update Last Logged after Logout by Id Action
exports.updateLastLoggedDate = (req, res) => {
  const id = req.params.userId;
  User.findOne({
    where: {
      id,
    },
  }).then(user => {
    if (user) {
      User.update(
        {
          last_successful_logged: user.last_present_logged,
        },
        { where: { id } },
      ).then(() => {
        res.status(200).send('logged successful');
      });
    }
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
