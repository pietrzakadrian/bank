const db = require('../config/db.config.js');
const Bill = db.bills;
const Additional = db.additionals;

// Find a Customer by Id
exports.getUserdata = (req, res) => {
  const id_owner = req.params.userId;
  Bill.findAll({
    include: [
      {
        model: Additional,
        where: {
          id_owner: db.Sequelize.col('bill.id_owner'),
        },
        attributes: ['account_balance_history'],
      },
    ],
    where: { id_owner },
    attributes: ['account_bill', 'available_funds'],
  })
    .then(bill => {
      res.send(bill);
    })
    .catch(err => {
      res.send(err);
      console.log(err);
    });
};
