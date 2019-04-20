module.exports = (sequelize, Sequelize) => {
  const Additional = sequelize.define(
    'additional',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The id_owner is required.',
          },
        },
      },
      account_balance_history: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The id_owner is required.',
          },
        },
      },
      incoming_transfers_sum: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The incoming_transfers_sum is required.',
          },
        },
      },
      outgoing_transfers_sum: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The outgoing_transfers_sum is required.',
          },
        },
      },
      notification_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: {
            msg: 'The notification_status is required.',
          },
        },
      },
    },
    {
      timestamps: false,
      tableName: 'bankapplication_additionals',
    },
  );

  return Additional;
};
