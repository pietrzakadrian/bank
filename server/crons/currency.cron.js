const axios = require('axios');
const env = require('../config/env.config.js');

module.exports = function() {
  try {
    axios
      .get('https://api.exchangeratesapi.io/latest?base=PLN&symbols=USD,EUR')
      .then(response => {
        const array = Object.entries(response.data.rates).map(
          ([currency, currency_exchange_rate]) => ({
            currency,
            currency_exchange_rate,
            date_currency_exchange_rate_sync: response.data.date,
          }),
        );

        try {
          axios
            .post('http://localhost:3000/api/currency', array, {
              auth: {
                username: env.adminAccount.login,
                password: env.adminAccount.password,
              },
            })
            .then(() => {
              console.log('currency cron: success!');
            })
            .catch(error => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
