/* eslint-disable camelcase */
const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
const cron = require('node-cron');
const net = require('net');
const farmhash = require('farmhash');
const db = require('../config/db.config.js');
const port = require('./port');
const env = require('../config/env.config.js');

function createNecessaryTables() {
  try {
    // todo: sprawdz najpierw czy to istnieje
    Promise.all([
      db.currency.create({
        id: 1,
        currency: 'USD',
        date_currency_exchange_rate_sync: new Date(),
        main_currency: 0,
      }),
      db.currency.create({
        id: 2,
        currency: 'PLN',
        date_currency_exchange_rate_sync: new Date(),
        main_currency: 1,
      }),
      db.currency.create({
        id: 3,
        currency: 'EUR',
        date_currency_exchange_rate_sync: new Date(),
        main_currency: 0,
      }),
    ]).then(currency => {
      if (currency) {
        require('../crons/currency.cron.js')();

        db.users
          .create({
            login: env.adminAccount.login,
            password: env.adminAccount.password,
            name: env.adminAccount.name,
            surname: env.adminAccount.surname,
            email: env.adminAccount.email,
            date_registration: new Date(),
          })
          .then(user => {
            if (user) {
              db.bills
                .create({
                  id_owner: user.id,
                  account_bill: env.adminAccount.account_bill,
                  available_funds: env.adminAccount.available_funds,
                  id_currency: 1,
                })
                .then(bill => {
                  if (bill) {
                    db.additionals.create({
                      id_owner: bill.id_owner,
                      id_currency: bill.id_currency,
                      account_balance_history:
                        env.adminAccount.account_balance_history,
                      incoming_transfers_sum:
                        env.adminAccount.incoming_transfers_sum,
                      outgoing_transfers_sum:
                        env.adminAccount.outgoing_transfers_sum,
                    });
                  }
                });
            }
          });
      }
    });
  } catch (e) {
    /* just ignore */
  }
}

function masterProcess() {
  // eslint-disable-next-line no-console
  console.log(`Master ${process.pid} is running`);
  const workers = [];

  const spawn = function(i) {
    workers[i] = cluster.fork();

    // Optional: Restart worker on exit
    workers[i].on('exit', () => {
      // eslint-disable-next-line no-console
      console.log('respawning worker', i);
      spawn(i);
    });
  };

  // Spawn workers.
  for (let i = 0; i <= 1; i += 1) {
    spawn(i);
  }
  const worker_index = function(ip, len) {
    return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
  };

  // Create the outside facing server listening on our port.
  net
    .createServer({ pauseOnConnect: true }, connection => {
      // We received a connection and need to pass it to the appropriate
      // worker. Get the worker for this connection's source IP and pass
      // it the connection.
      const worker = workers[worker_index(connection.remoteAddress, 1)];
      worker.send('sticky-session:connection', connection);
    })
    .listen(port);

  // Sequelize reset db
  db.sequelize.sync({ force: true }).then(() => {
    createNecessaryTables();
  });

  // Crons Schedule
  cron.schedule('0 0 0 * * *', () => {
    require('../crons/currency.cron.js')();
  });
}

function childProcess() {
  // eslint-disable-next-line no-console
  console.log(`Worker ${process.pid} started and finished`);
  require('../index.js');
}

if (cluster.isMaster) {
  masterProcess();
} else if (cluster.isWorker) {
  childProcess();
}
