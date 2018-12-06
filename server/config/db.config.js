const Sequelize = require('sequelize');
const env = require('./env.config.js');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.users = require('../models/user.model.js')(sequelize, Sequelize);
db.bills = require('../models/bill.model.js')(sequelize, Sequelize);
db.transactions = require('../models/transaction.model.js')(
  sequelize,
  Sequelize,
);

module.exports = db;
