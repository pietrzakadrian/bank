/* eslint-disable no-plusplus */
const cluster = require('cluster');

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  require('./index.js');
}
