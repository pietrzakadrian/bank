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

exports.setCurrency = (req, res) => {
  const id = req.body.currencyId;
  const currency_exchange_rate = req.body.currencyExchangeRate;
  const date_currency_exchange_rate_sync =
    req.body.dateCurrencyExchangeRateSync;

  Currency.update(
    {
      currency_exchange_rate,
      date_currency_exchange_rate_sync,
    },
    { where: { id } },
  )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};
