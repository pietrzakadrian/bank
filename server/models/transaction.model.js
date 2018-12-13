module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define(
    'transaction',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_sender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The id_sender is required.',
          },
        },
      },
      id_recipient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The id_recipient is required.',
          },
        },
      },
      data_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The data_time is required.',
          },
        },
      },
      amount_money: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The amount_money is required.',
          },
        },
      },
      transfer_title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The transfer_title is required.',
          },
        },
      },
    },
    {
      timestamps: false,
      tableName: 'bankapplication_transactions',
    },
  );

  return Transaction;
};
