const Sequelize = require('sequelize');
const env = require('./env.config.js');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  dialectOptions: {
    useUTC: true,
  },
  timezone: '+01:00',

  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },

  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
    ],
    max: 5,
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
db.additionals = require('../models/additional.model.js')(sequelize, Sequelize);

db.bills.belongsTo(db.users, {
  foreignKey: 'id_owner',
  targetKey: 'id',
});
db.users.hasOne(db.bills, { foreignKey: 'id_owner', targetKey: 'id' });

db.transactions.belongsTo(db.users, {
  foreignKey: 'id_sender',
  targetKey: 'id',
});
db.users.hasOne(db.transactions, { foreignKey: 'id_sender', targetKey: 'id' });

db.transactions.belongsTo(db.users, {
  foreignKey: 'id_recipient',
  targetKey: 'id',
});
db.users.hasOne(db.transactions, {
  foreignKey: 'id_recipient',
  targetKey: 'id',
});

db.additionals.belongsTo(db.bills, {
  foreignKey: 'id_owner',
  targetKey: 'id_owner',
});
db.bills.hasOne(db.additionals, {
  foreignKey: 'id_owner',
  targetKey: 'id_owner',
});

module.exports = db;
