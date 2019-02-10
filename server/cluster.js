/* eslint-disable no-var */
/* eslint-disable vars-on-top */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const net = require('net');
const farmhash = require('farmhash');

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();
}

function masterProcess() {
  // eslint-disable-next-line no-console
  console.log(`Master ${process.pid} is running`);
  // This stores our workers. We need to keep them to be able to reference
  // them based on source IP address. It's also useful for auto-restart,
  // for example.
  const workers = [];

  // Helper function for spawning worker at index 'i'.
  // eslint-disable-next-line func-names
  var spawn = function(i) {
    workers[i] = cluster.fork();

    // Optional: Restart worker on exit
    workers[i].on('exit', () => {
      console.log('respawning worker', i);
      spawn(i);
    });
  };

  // Spawn workers.
  for (let i = 0; i < numCPUs; i += 1) {
    spawn(i);
  }

  // Helper function for getting a worker index based on IP address.
  // This is a hot path so it should be really fast. The way it works
  // is by converting the IP address to a number by removing non numeric
  // characters, then compressing it to the number of slots we have.
  //
  // Compared against "real" hashing (from the sticky-session code) and
  // "real" IP number conversion, this function is on par in terms of
  // worker index distribution only much faster.
  const worker_index = function(ip, len) {
    return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
  };

  // Create the outside facing server listening on our port.
  net
    .createServer({ pauseOnConnect: true }, connection => {
      // We received a connection and need to pass it to the appropriate
      // worker. Get the worker for this connection's source IP and pass
      // it the connection.
      const worker = workers[worker_index(connection.remoteAddress, numCPUs)];
      worker.send('sticky-session:connection', connection);
    })
    .listen(3000);

  // process.exit();
}

function childProcess() {
  console.log(`Worker ${process.pid} started and finished`);
  require('./index.js');

  // process.exit();
}

//
