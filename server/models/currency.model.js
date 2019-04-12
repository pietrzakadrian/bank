module.exports = (sequelize, Sequelize) => {
  const Currency = sequelize.define(
    'currency',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The currency is required.',
          },
        },
      },
      currency_exchange_rate: {
        defaultValue: 1,
        type: Sequelize.DOUBLE,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The currency_exchange_rate is required.',
          },
        },
      },
      date_currency_exchange_rate_sync: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The date_currency_exchange_rate_sync is required.',
          },
        },
      },
      main_currency: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: {
            msg: 'The main_currency is required.',
          },
        },
      },
    },
    {
      timestamps: false,
      tableName: 'bankapplication_currency',
    },
  );

  return Currency;
};
