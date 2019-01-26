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

  async function getAccountBill() {
    const accountBill = `002222${Math.floor(
      Math.random() * 90000000000000000000,
    ) + 10000000000000000000}`;

    try {
      const isAccountBill = await Bill.findOne({
        where: {
          account_bill: accountBill,
        },
      });
      return isAccountBill ? await getAccountBill() : accountBill;
    } catch (e) {
      /* just ignore */
    }
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
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        req.body.password = hash;

        try {
          const user = await User.create({
            login: req.body.login,
            password: req.body.password,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            date_registration: getTodayDate(),
          });
          const bill = await Bill.create({
            id_owner: user.id,
            account_bill: await getAccountBill(),
            available_funds: getAvailableFunds(),
          });
          await Additional.create({
            id_owner: bill.id_owner,
            account_balance_history: getAccountBalanceHistory(),
          });
          res.status(200).json({ register: true });
        } catch (e) {
          res.status(400).json({ error: 'Invalid E-Mail' });
        }
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
  if (req.userData.id == id) {
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
  } else {
    res.status(400).json({
      error: 'no access',
    });
  }
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
  if (req.userData.id == id) {
    User.findOne({
      where: {
        id,
      },
      attributes: [
        'name',
        'surname',
        'last_successful_logged',
        'last_failed_logged',
        'last_present_logged',
      ],
    })
      .then(user => {
        if (user) {
          res.status(200).json({
            user,
          });
        }
      })
      .catch(err => {
        /* just ignore */
      });
  } else {
    res.status(400).json({
      error: 'no access',
    });
  }
};

// Update basic User's Data
exports.setUserdata = (req, res) => {
  const id = req.params.userId;
  if (req.userData.id == id) {
    User.update(
      {
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
      },
      { where: { id } },
    )
      .then(() => {
        res.status(200).json({ update: true });
      })
      .catch(err => {
        /* just ignore */
      });
  } else {
    res.status(400).json({
      error: 'no access',
    });
  }
};
