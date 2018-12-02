const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched',
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Bill was created',
  });
});

router.post('/:billId', (req, res, next) => {
  res.status(200).json({
    message: 'bill details',
    billId: req.params.billId,
  });
});

router.delete('/:billId', (req, res, next) => {
  res.status(200).json({
    message: 'bill delete',
    billId: req.params.billId,
  });
});

module.exports = router;
