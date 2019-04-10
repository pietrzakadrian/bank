/* eslint-disable camelcase */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const net = require('net');
const farmhash = require('farmhash');
const port = require('./port');

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
  for (let i = 0; i < 2; i += 1) {
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
      const worker = workers[worker_index(connection.remoteAddress, 2)];
      worker.send('sticky-session:connection', connection);
    })
    .listen(port);
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
