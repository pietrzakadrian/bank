module.exports = (sequelize, Sequelize) => {
  const Bill = sequelize.define(
    'bill',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_owner: {
        type: Sequelize.INTEGER,
      },
      account_bill: {
        type: Sequelize.DOUBLE,
      },
      available_funds: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      timestamps: false,
      tableName: 'bankapplication_bills',
    },
  );

  return Bill;
};
