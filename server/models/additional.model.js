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
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The id_owner is required.',
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
