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
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The id_owner is required.',
          },
        },
      },
      account_bill: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The account_bill is required.',
          },
        },
      },
      available_funds: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The available_funds is required.',
          },
        },
      },
    },
    {
      timestamps: false,
      tableName: 'bankapplication_bills',
    },
  );

  return Bill;
};
