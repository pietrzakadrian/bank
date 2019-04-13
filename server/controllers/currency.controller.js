const db = require('../config/db.config.js');
const Currency = db.currency;

// Return All Currency
exports.getCurrency = (req, res) => {
  Currency.findAll({})
    .then(currency => {
      res.send(currency);
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// todo: add security, because everybody user can change rate!
// https://api.exchangeratesapi.io/latest?base=PLN&symbols=USD%2CEUR
exports.setCurrency = (req, res) => {
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
    .catch(e => {
      res.status(500).json({ error: 'Internal server error', e });
    });
};
