const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdminOrReviewerOrAnalyst, requireEntrepreneur } = require('../middleware/auth');

// Placeholder for document routes
router.get('/', authenticateToken, requireAdminOrReviewerOrAnalyst, (req, res) => {
  res.json({ message: 'Document data' });
});

module.exports = router; 