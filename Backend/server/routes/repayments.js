const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin, requireEntrepreneur } = require('../middleware/auth');
const { query, getRows, getRow } = require('../../config/db');

// Get all repayments (admin)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, applicationId } = req.query;
    const offset = (page - 1) * limit;

    let whereConditions = [];
    let values = [];
    let paramCount = 1;

    if (status) {
      whereConditions.push(`r.status = $${paramCount++}`);
      values.push(status);
    }

    if (applicationId) {
      whereConditions.push(`r.application_id = $${paramCount++}`);
      values.push(applicationId);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const repayments = await getRows(
      `SELECT 
        r.*,
        u.first_name,
        u.last_name,
        u.email,
        a.loan_type,
        a.amount as loan_amount
       FROM repayments r
       JOIN users u ON r.user_id = u.id
       JOIN applications a ON r.application_id = a.id
       ${whereClause}
       ORDER BY r.due_date DESC
       LIMIT $${paramCount++} OFFSET $${paramCount++}`,
      [...values, limit, offset]
    );

    const countResult = await getRow(
      `SELECT COUNT(*) as total FROM repayments r ${whereClause}`,
      values
    );

    res.json({
      repayments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.total),
        totalPages: Math.ceil(parseInt(countResult.total) / limit)
      }
    });
  } catch (error) {
    console.error('Get repayments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's repayments (entrepreneur)
router.get('/user', authenticateToken, requireEntrepreneur, async (req, res) => {
  try {
    const repayments = await getRows(
      `SELECT 
        r.*,
        a.loan_type,
        a.purpose
       FROM repayments r
       JOIN applications a ON r.application_id = a.id
       WHERE r.user_id = $1
       ORDER BY r.due_date`,
      [req.user.id]
    );

    res.json({ repayments });
  } catch (error) {
    console.error('Get user repayments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update repayment status (admin)
router.put('/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;

    const validStatuses = ['pending', 'paid', 'overdue', 'defaulted'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await query(
      'UPDATE repayments SET status = $1, comments = $2 WHERE id = $3 RETURNING *',
      [status, comments, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Repayment not found' });
    }

    const repayment = result.rows[0];

    // Create notification for user
    await query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
      [
        repayment.user_id,
        `Repayment ${status.toUpperCase()}`,
        `Your repayment of ${repayment.amount} has been marked as ${status}. ${comments || ''}`,
        'repayment_update'
      ]
    );

    res.json({
      message: 'Repayment status updated successfully',
      repayment
    });
  } catch (error) {
    console.error('Update repayment status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload repayment proof (entrepreneur)
router.post('/:id/proof', authenticateToken, requireEntrepreneur, async (req, res) => {
  try {
    const { id } = req.params;
    const { receiptUrl } = req.body;

    // Check if repayment belongs to user
    const repayment = await getRow(
      'SELECT * FROM repayments WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (!repayment) {
      return res.status(404).json({ error: 'Repayment not found' });
    }

    const result = await query(
      'UPDATE repayments SET receipt_url = $1 WHERE id = $2 RETURNING *',
      [receiptUrl, id]
    );

    res.json({
      message: 'Repayment proof uploaded successfully',
      repayment: result.rows[0]
    });
  } catch (error) {
    console.error('Upload repayment proof error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get repayment statistics
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const stats = await getRow(`
      SELECT 
        COUNT(*) as total_repayments,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_repayments,
        COUNT(CASE WHEN status = 'overdue' THEN 1 END) as overdue_repayments,
        COUNT(CASE WHEN status = 'defaulted' THEN 1 END) as defaulted_repayments,
        SUM(amount) as total_amount,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as total_paid,
        SUM(CASE WHEN status = 'overdue' THEN amount ELSE 0 END) as total_overdue
      FROM repayments
    `);

    // Get overdue repayments
    const overdueRepayments = await getRows(`
      SELECT 
        r.*,
        u.first_name,
        u.last_name,
        u.email,
        a.loan_type
      FROM repayments r
      JOIN users u ON r.user_id = u.id
      JOIN applications a ON r.application_id = a.id
      WHERE r.status = 'overdue' AND r.due_date < CURRENT_DATE
      ORDER BY r.due_date
      LIMIT 10
    `);

    res.json({
      stats,
      overdueRepayments
    });
  } catch (error) {
    console.error('Get repayment stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 