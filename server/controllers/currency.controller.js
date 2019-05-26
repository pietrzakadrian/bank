const newError = require('http-errors');
const db = require('../config/db.config.js');
const Currency = db.currency;

// Return All Currency
exports.getCurrency = (req, res, next) => {
  Currency.findAll({})
    .then(currency => {
      res.send(currency);
    })
    .catch(error => {
      next(newError(500, error));
    });
};

exports.setCurrency = (req, res, next) => {
  const objects = req.body;

  Promise.all(
    objects.map(object =>
      Currency.update(
        {
          currency_exchange_rate: object.currency_exchange_rate,
          date_currency_exchange_rate_sync:
            object.date_currency_exchange_rate_sync,
        },
        {
          where: {
            currency: object.currency,
          },
        },
      ),
    ),
  )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(error => {
      next(newError(500, error));
    });
};
