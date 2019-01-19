const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');
const env = require('../config/env.config.js');
const User = db.users;
const Bill = db.bills;
const Additional = db.additionals;

// Register Action
exports.register = (req, res) => {
  function getAvailableFunds() {
    const availableFunds = 0;
    return availableFunds;
  }

  function getAccountBill() {
    const accountBill = `2222${Math.floor(
      Math.random() * 90000000000000000000,
    ) + 10000000000000000000}`;

    Bill.findOne({
      where: {
        account_bill: accountBill,
      },
    })
      .then(isAccountBill => {
        if (isAccountBill) {
          getAccountBill();
        }
        return accountBill;
      })
      .catch(err => {
        /* just ignore */
      });
  }

  function getAccountBalanceHistory() {
    const accountBalanceHistory = '0,0';
    return accountBalanceHistory;
  }

  function getTodayDate() {
    const today = new Date();
    return today;
  }

  User.findOne({
    where: { login: req.body.login },
  }).then(isUser => {
    if (!isUser) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash;

        User.create({
          login: req.body.login,
          password: req.body.password,
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          date_registration: getTodayDate(),
        })
          .then(user =>
            Bill.create({
              id_owner: user.id,
              account_bill: `2222${Math.floor(
                Math.random() * 90000000000000000000,
              ) + 10000000000000000000}`,
              available_funds: getAvailableFunds(),
            })
              .then(bill => {
                Additional.create({
                  id_owner: user.id,
                  account_balance_history: getAccountBalanceHistory(),
                })
                  .then(() => {
                    res.status(200).json({ register: true });
                  })
                  .catch(err => {
                    res.status(400).json({ error: err });
                  });
              })
              .catch(err => {
                res.status(400).json({ error: err });
              }),
          )
          .catch(err => {
            res.status(400).json({ error: err });
          });
      });
    } else {
      res.status(400).json({ error: 'User already exists.' });
    }
  });
};

// Login Action
exports.login = (req, res) => {
  function getTodayDate() {
    const today = new Date();
    return today;
  }

  function getToken(userId) {
    const token = jwt.sign(
      {
        id: userId,
      },
      env.SECRET_KEY,
      {
        expiresIn: '15m',
      },
    );
    return token;
  }

  User.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then(isUser => {
      if (isUser) {
        if (bcrypt.compareSync(req.body.password, isUser.password)) {
          User.update(
            {
              last_present_logged: getTodayDate(),
            },
            { where: { login: req.body.login } },
          ).then(() => {
            res.status(200).json({
              message: 'Auth successful',
              token: getToken(isUser.id),
            });
          });
        } else {
          User.update(
            {
              last_failed_logged: getTodayDate(),
            },
            { where: { login: req.body.login } },
          ).then(() => {
            res
              .status(400)
              .json({ error: 'Auth failed. The password is incorrect.' });
          });
        }
      } else {
        res.status(400).json({ error: 'Auth failed. User does not exist' });
      }
    })
    .catch(err => {
      /* just ignore */
    });
};

// Update the Last Successful Logged date
exports.logout = (req, res) => {
  const id = req.params.userId;
  User.findOne({
    where: {
      id,
    },
  }).then(isUser => {
    if (isUser) {
      User.update(
        {
          last_successful_logged: isUser.last_present_logged,
        },
        { where: { id } },
      )
        .then(() => {
          res.status(200).json({
            message: 'Logout successful',
          });
        })
        .catch(err => {
          /* just ignore */
        });
    }
  });
};

// Check if the User's Login already exists
exports.isLogin = (req, res) => {
  const login = req.params.userLogin;
  User.findOne({
    where: {
      login,
    },
  })
    .then(isLogin => {
      if (isLogin) {
        res.status(200).json({ isLogin: true });
      } else {
        res.status(400).json({ isLogin: false });
      }
    })
    .catch(err => {
      /* just ignore */
    });
};

// Check if the User's Email already exists
exports.isEmail = (req, res) => {
  const email = req.params.userEmail;
  User.findOne({
    where: {
      email,
    },
  })
    .then(isEmail => {
      if (isEmail) {
        res.status(200).json({ isEmail: true });
      } else {
        res.status(400).json({ isEmail: false });
      }
    })
    .catch(err => {
      /* just ignore */
    });
};

// Return basic User's Data
exports.getUserdata = (req, res) => {
  const id = req.params.userId;
  User.findOne({
    where: {
      id,
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
      /* just ignore */
    });
};

// Update basic User's Data
exports.setUserdata = (req, res) => {
  const id = req.params.userId;
  User.update(
    {
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      address: req.body.address,
    },
    { where: { id } },
  )
    .then(() => {
      res.status(200).json({ update: true });
    })
    .catch(err => {
      /* just ignore */
    });
};
