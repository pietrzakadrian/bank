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
    const accountBill = `${Math.floor(Math.random() * 90000000000000000000) +
      10000000000000000000}220097`;

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

  function getIncomingTransfersSum() {
    const incomingTransfersSum = '0';
    return incomingTransfersSum;
  }

  function getOutgoingTransfersSum() {
    const outgoingTransfersSum = '0';
    return outgoingTransfersSum;
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
            id_currency: 1,
          });
          await Additional.create({
            id_owner: bill.id_owner,
            id_currency: bill.id_currency,
            account_balance_history: getAccountBalanceHistory(),
            incoming_transfers_sum: getIncomingTransfersSum(),
            outgoing_transfers_sum: getOutgoingTransfersSum(),
          });
          res.status(200).json({ success: true });
        } catch (e) {
          res.status(200).json({ error: 'Invalid E-Mail', success: false });
        }
      });
    } else {
      res.status(200).json({ error: 'User already exists.', success: false });
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
        expiresIn: '60min',
      },
    );
    return token;
  }

  function setLastPresentLogged(token) {
    return User.update(
      {
        last_present_logged: getTodayDate(),
      },
      { where: { login: req.body.login } },
    ).then(() =>
      res.status(200).json({
        success: true,
        token: getToken(token),
      }),
    );
  }

  function setLastFailedLogged() {
    return User.update(
      {
        last_failed_logged: getTodayDate(),
      },
      { where: { login: req.body.login } },
    ).then(() => {
      res.status(200).json({
        error: 'Auth failed. The password is incorrect.',
        success: false,
      });
    });
  }

  User.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then(isUser => {
      if (isUser) {
        if (bcrypt.compareSync(req.body.password, isUser.password)) {
          return setLastPresentLogged(isUser.id);
        }
        return setLastFailedLogged();
      }
      return res
        .status(200)
        .json({ error: 'Auth failed. User does not exist', success: false });
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Update the Last Successful Logged date
exports.logout = (req, res) => {
  const id = req.params.userId;

  function setLastSuccessfulLogged(isUser) {
    return User.update(
      {
        last_successful_logged: isUser.last_present_logged,
      },
      { where: { id } },
    )
      .then(() => {
        res.status(200).json({
          message: 'Logout successful',
          success: true,
        });
      })
      .catch(() => {
        res.status(500).json({ error: 'Internal server error' });
      });
  }

  User.findOne({
    where: {
      id,
    },
  }).then(isUser => {
    if (isUser) {
      setLastSuccessfulLogged(isUser);
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
        res.status(200).json({ isLogin: false });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
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
        res.status(200).json({ isEmail: false });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Return basic User's Data
exports.getUserdata = (req, res) => {
  const id = req.params.userId;
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
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Update basic User's Data
exports.setUserdata = (req, res) => {
  const id = req.params.userId;

  User.findOne({
    where: {
      id,
    },
  })
    .then(isUser => {
      if (isUser) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          req.body.password = hash;

          return User.update(
            {
              password: req.body.password ? req.body.password : isUser.password,
              name: req.body.name ? req.body.name : isUser.name,
              surname: req.body.surname ? req.body.surname : isUser.surname,
              email: req.body.email ? req.body.email : isUser.email,
            },
            { where: { id } },
          )
            .then(isChange => {
              if (isChange) {
                res.status(200).json({ success: true });
              } else {
                res.status(200).json({ success: false });
              }
            })
            .catch(() => {
              /* just ignore */
            });
        });
      }
    })
    .catch(e => {
      res.status(500).json({ error: e });
    });
};
