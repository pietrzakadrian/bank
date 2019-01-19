const db = require('../config/db.config.js');
const Bill = db.bills;
const Additional = db.additionals;

// Find a Customer by Id
exports.getUserdata = (req, res) => {
  Bill.findAll({
    where: { id_owner: req.params.userId },
    attributes: ['account_bill', 'available_funds'],
    include: [
      {
        model: Additional,
        where: { id_owner: db.Sequelize.col('bill.id_owner') },
        attributes: ['account_balance_history'],
      },
    ],
  })
    .then(bill => {
      res.send(bill);
    })
    .catch(err => {
      /* just ignore */
    });
};
