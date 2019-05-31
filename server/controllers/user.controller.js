/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const newError = require('http-errors');
const db = require('../config/db.config.js');
const env = require('../config/env.config.js');
const User = db.users;
const Bill = db.bills;
const Additional = db.additionals;
const Currency = db.currency;

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
            id_currency: req.body.currencyId,
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
exports.login = (req, res, next) => {
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
    .catch(error => {
      next(newError(500, error));
    });
};

// Update the Last Successful Logged date
exports.logout = (req, res, next) => {
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
      .catch(error => {
        next(newError(500, error));
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
exports.isLogin = (req, res, next) => {
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
    .catch(error => {
      next(newError(500, error));
    });
};

// Check if the User's Email already exists
exports.isEmail = (req, res, next) => {
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
    .catch(error => {
      next(newError(500, error));
    });
};

// Return basic User's Data
exports.getUserdata = (req, res, next) => {
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
      'email',
    ],
  })
    .then(user => {
      if (user) {
        res.status(200).json({
          user,
        });
      }
    })
    .catch(error => {
      next(newError(500, error));
    });
};

// Update basic User's Data
exports.setUserdata = (req, res, next) => {
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
              res.status(500).json({ error: 'Internal server error' });
            });
        });
      }
    })
    .catch(error => {
      next(newError(500, error));
    });
};

exports.setCurrency = (req, res, next) => {
  const id_owner = req.params.userId;
  const id_currency = req.body.currencyId;

  async function getIncomingTransfersSum(id_owner) {
    try {
      const incomingTransfersSum = await Additional.findOne({
        where: {
          id_owner,
        },
      });
      return incomingTransfersSum.incoming_transfers_sum;
    } catch (e) {
      /* just ignore */
    }
  }

  async function getOutgoingTransfersSum(id_owner) {
    try {
      const incomingTransfersSum = await Additional.findOne({
        where: {
          id_owner,
        },
      });
      return incomingTransfersSum.outgoing_transfers_sum;
    } catch (e) {
      /* just ignore */
    }
  }

  async function isCurrencyMain(id) {
    try {
      const currencyMain = await Currency.findOne({
        where: {
          id,
        },
      });
      return currencyMain.main_currency;
    } catch (e) {
      /* just ignore */
    }
  }

  async function getCurrencyExchangeRate(currencyId) {
    try {
      const isCurrencyExchangeRate = await Currency.findOne({
        where: {
          id: currencyId,
        },
      });
      return isCurrencyExchangeRate.currency_exchange_rate;
    } catch (e) {
      /* just ignore */
    }
  }

  async function setExchangeCurrency(
    userAvailableFunds,
    userCurrencyId,
    id_currency,
    id_owner,
  ) {
    const newCurrencyExchangeRate = await getCurrencyExchangeRate(id_currency);
    const userCurrencyExchangeRate = await getCurrencyExchangeRate(
      userCurrencyId,
    );
    const mainCurrency = await isCurrencyMain(id_currency);
    const userIncomingTransfersSum = await getIncomingTransfersSum(id_owner);
    const userOutgoingTransfersSum = await getOutgoingTransfersSum(id_owner);

    if (mainCurrency) {
      const convertedAmountMoney =
        userAvailableFunds / userCurrencyExchangeRate;
      const convertedIncomingTransfersSum =
        userIncomingTransfersSum / userCurrencyExchangeRate;
      const convertedOutgoingTransfersSum =
        userOutgoingTransfersSum / userCurrencyExchangeRate;

      Bill.update(
        {
          available_funds: convertedAmountMoney.toFixed(2),
        },
        { where: { id_owner } },
      );

      Additional.update(
        {
          incoming_transfers_sum: convertedIncomingTransfersSum.toFixed(2),
        },
        { where: { id_owner } },
      );

      Additional.update(
        {
          outgoing_transfers_sum: convertedOutgoingTransfersSum.toFixed(2),
        },
        { where: { id_owner } },
      );
    } else {
      const convertedAmountMoney =
        (userAvailableFunds / userCurrencyExchangeRate) *
        newCurrencyExchangeRate;
      const convertedIncomingTransfersSum =
        (userIncomingTransfersSum / userCurrencyExchangeRate) *
        newCurrencyExchangeRate;
      const convertedOutgoingTransfersSum =
        (userOutgoingTransfersSum / userCurrencyExchangeRate) *
        newCurrencyExchangeRate;

      Bill.update(
        {
          available_funds: convertedAmountMoney.toFixed(2),
        },
        { where: { id_owner } },
      );

      Additional.update(
        {
          incoming_transfers_sum: convertedIncomingTransfersSum.toFixed(2),
        },
        { where: { id_owner } },
      );

      Additional.update(
        {
          outgoing_transfers_sum: convertedOutgoingTransfersSum.toFixed(2),
        },
        { where: { id_owner } },
      );
    }
  }

  function setNewCurrency(id_currency, id_owner) {
    return Bill.update(
      {
        id_currency,
      },
      {
        where: { id_owner },
      },
    )
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(error => {
        next(newError(500, error));
      });
  }

  if (id_currency) {
    Bill.findOne({
      where: {
        id_owner,
      },
    }).then(async isAccountBill => {
      if (isAccountBill) {
        const userCurrencyId = isAccountBill.id_currency;
        const userAvailableFunds = isAccountBill.available_funds;

        Currency.findOne({
          where: {
            id: id_currency,
          },
        }).then(async isCurrencyId => {
          if (isCurrencyId) {
            if (userCurrencyId !== id_currency) {
              try {
                await setExchangeCurrency(
                  userAvailableFunds,
                  userCurrencyId,
                  id_currency,
                  id_owner,
                );
                setNewCurrency(id_currency, id_owner);
              } catch (e) {
                /* just ignore */
              }
            } else {
              res.status(200).json({
                error: 'You are trying to set the same currency',
                success: false,
              });
            }
          } else {
            res.status(200).json({
              error: 'You are trying to set a non-existing currency',
              success: false,
            });
          }
        });
      }
    });
  } else {
    res.status(200).json({
      error: 'currencyId can not be a null',
      success: false,
    });
  }
};
