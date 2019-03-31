/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./utils/logger');
const sio_redis = require('socket.io-redis');
const argv = require('./utils/argv');
const port = require('./utils/port');
const setup = require('./middlewares/frontendMiddleware');
const db = require('./config/db.config.js');
const morgan = require('morgan');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.json({
    limit: '2000kb',
  }),
);
app.disable('x-powered-by');

db.sequelize.sync({ force: false });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

require('./routes/user.route.js')(app);
require('./routes/transaction.route.js')(app);
require('./routes/bill.route.js')(app);
require('./routes/additional.route.js')(app);

app.use(morgan('dev'));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

io.adapter(sio_redis({ host: 'localhost', port: 6379 }));
io.on('connection', socket => {
  socket.on('new notification', id => {
    io.sockets.emit('new notification', id);
  });

  socket.on('disconnect', () => {
    io.emit('user disconnected');
  });
});

// Start your app.
server.listen(0, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);

    console.log('url', url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

process.on('message', (message, connection) => {
  if (message !== 'sticky-session:connection') {
    return;
  }
  server.emit('connection', connection);

  connection.resume();
});
