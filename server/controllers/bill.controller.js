/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
const db = require('../config/db.config.js');

const Bill = db.bills;
const Additional = db.additionals;
const User = db.users;
const Currency = db.currency;
const Op = db.Sequelize.Op;

// Return All User's Bill Data
exports.getUsersdata = (req, res) => {
  const partOfAccountBill = req.params.accountBill;

  Bill.findAll({
    attributes: ['account_bill'],
    where: {
      id_owner: {
        [Op.ne]: [req.userData.id],
      },
      account_bill: {
        [Op.like]: `${partOfAccountBill}%`,
      },
    },
    include: [
      {
        model: User,
        where: {
          id: db.Sequelize.col('bill.id_owner'),
        },
        attributes: ['name', 'surname'],
      },
    ],
  })
    .then(bill => {
      res.send(bill);
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Return basic User's Bill Data
exports.getUserdata = (req, res) => {
  const id_owner = req.params.userId;
  Bill.findAll({
    include: [
      {
        model: Additional,
        where: {
          id_owner: db.Sequelize.col('bill.id_owner'),
        },
        attributes: [
          'account_balance_history',
          'incoming_transfers_sum',
          'outgoing_transfers_sum',
        ],
      },
      {
        model: Currency,
        where: {
          id: db.Sequelize.col('bill.id_currency'),
        },
        attributes: ['currency'],
      },
    ],
    where: { id_owner },
    attributes: ['account_bill', 'available_funds'],
  })
    .then(bill => {
      res.send(bill);
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Check if the User's Account Bill already exists
exports.isAccountBill = (req, res) => {
  const account_bill = req.params.accountBill;
  Bill.findOne({
    where: {
      account_bill,
    },
  })
    .then(isAccountBill => {
      if (isAccountBill && isAccountBill.id !== req.userData.id) {
        res
          .status(200)
          .json({ isAccountBill: true, recipientId: isAccountBill.id });
      } else {
        res.status(200).json({ isAccountBill: false });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Check if the User's Amount Money correctly
exports.isAmountMoney = (req, res) => {
  const senderId = req.body.id_sender;
  const amountMoney = req.body.amount_money;
  Bill.findOne({
    where: {
      id_owner: senderId,
    },
  })
    .then(isSender => {
      if (isSender.available_funds >= amountMoney && amountMoney > 0) {
        res.status(200).json({ isAmountMoney: true });
      } else {
        res.status(200).json({ isAmountMoney: false });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
};
