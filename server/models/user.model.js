module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      date_registration: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      last_logged: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
      tableName: 'bankapplication_accounts',
    },
  );

  return User;
};
