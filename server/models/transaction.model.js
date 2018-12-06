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
      },
      id_recipient: {
        type: Sequelize.INTEGER,
      },
      data_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      amount_money: {
        type: Sequelize.DOUBLE,
      },
      transfer_title: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'bankapplication_transactions',
    },
  );

  return Transaction;
};
