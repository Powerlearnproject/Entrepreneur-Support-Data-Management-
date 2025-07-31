const express = require('express');
const router = express.Router();

const {
  createFund,
  getAllFunds,
  getFundsByEntrepreneur,
  getTotalFunds
} = require('../controllers/fundController');

router.post('/', createFund);
router.get('/', getAllFunds);
router.get('/total', getTotalFunds);
router.get('/:entrepreneurId', getFundsByEntrepreneur);

module.exports = router;
