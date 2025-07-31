const express = require('express');
const router = express.Router();
const { authenticateToken, requireEntrepreneur } = require('../middleware/auth');
const { getRows, getRow } = require('../../config/db');

// Get entrepreneur dashboard data
router.get('/dashboard', authenticateToken, requireEntrepreneur, async (req, res) => {
  try {
    // Get user's applications
    const applications = await getRows(
      'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
      [req.user.id]
    );

    // Get recent notifications
    const notifications = await getRows(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
      [req.user.id]
    );

    // Get fund utilization
    const fundUtilization = await getRows(
      'SELECT * FROM fund_utilization WHERE user_id = $1 ORDER BY reported_at DESC LIMIT 5',
      [req.user.id]
    );

    // Get repayment summary
    const repaymentSummary = await getRow(`
      SELECT 
        COUNT(*) as total_repayments,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_repayments,
        COUNT(CASE WHEN status = 'overdue' THEN 1 END) as overdue_repayments,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as total_paid,
        SUM(amount) as total_due
      FROM repayments 
      WHERE user_id = $1
    `, [req.user.id]);

    res.json({
      applications,
      notifications,
      fundUtilization,
      repaymentSummary
    });
  } catch (error) {
    console.error('Get entrepreneur dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get loan status tracker
router.get('/loan-status', authenticateToken, requireEntrepreneur, async (req, res) => {
  try {
    const applications = await getRows(
      `SELECT 
        id, loan_type, amount, status, admin_comments, created_at, updated_at
       FROM applications 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({ applications });
  } catch (error) {
    console.error('Get loan status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get fund utilization reports
router.get('/fund-utilization', authenticateToken, requireEntrepreneur, async (req, res) => {
  try {
    const utilization = await getRows(
      `SELECT 
        fu.*,
        a.loan_type,
        a.purpose
       FROM fund_utilization fu
       JOIN applications a ON fu.application_id = a.id
       WHERE fu.user_id = $1
       ORDER BY fu.reported_at DESC`,
      [req.user.id]
    );

    res.json({ utilization });
  } catch (error) {
    console.error('Get fund utilization error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 