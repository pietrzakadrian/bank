const Sequelize = require('sequelize');
const env = require('./env.config.js');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
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

// Associations
// Bill
db.users.hasMany(db.bills, { foreignKey: 'id_owner', sourceKey: 'id' });
db.bills.belongsTo(db.users, { foreignKey: 'id_owner', targetKey: 'id' });

// Additional
db.bills.hasMany(db.additionals, {
  foreignKey: 'id_owner',
  sourceKey: 'id_owner',
});
db.additionals.belongsTo(db.bills, {
  foreignKey: 'id_owner',
  targetKey: 'id_owner',
});

// Transaction
db.users.hasMany(db.transactions, {
  foreignKey: 'id_sender',
  sourceKey: 'id',
});
db.transactions.belongsTo(db.users, {
  as: 'getSenderdata',
  foreignKey: 'id_sender',
  targetKey: 'id',
});
db.users.hasMany(db.transactions, {
  foreignKey: 'id_recipient',
  sourceKey: 'id',
});
db.transactions.belongsTo(db.users, {
  as: 'getRecipientdata',
  foreignKey: 'id_recipient',
  targetKey: 'id',
});

module.exports = db;
