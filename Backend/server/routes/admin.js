const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { query, getRows, getRow } = require('../../config/db');

// Get all entrepreneurs
router.get('/entrepreneurs', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, country, businessType } = req.query;
    const offset = (page - 1) * limit;
    
    let whereConditions = ['role = $1'];
    let values = ['entrepreneur'];
    let paramCount = 2;

    if (search) {
      whereConditions.push(`(first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount} OR email ILIKE $${paramCount})`);
      values.push(`%${search}%`);
      paramCount++;
    }

    if (country) {
      whereConditions.push(`country = $${paramCount++}`);
      values.push(country);
    }

    if (businessType) {
      whereConditions.push(`business_type = $${paramCount++}`);
      values.push(businessType);
    }

    const whereClause = `WHERE ${whereConditions.join(' AND ')}`;

    const entrepreneurs = await getRows(
      `SELECT id, first_name, last_name, email, business_type, phone, country, region, created_at 
       FROM users ${whereClause} 
       ORDER BY created_at DESC 
       LIMIT $${paramCount++} OFFSET $${paramCount++}`,
      [...values, limit, offset]
    );

    const countResult = await getRow(
      `SELECT COUNT(*) as total FROM users ${whereClause}`,
      values
    );

    res.json({
      entrepreneurs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.total),
        totalPages: Math.ceil(parseInt(countResult.total) / limit)
      }
    });
  } catch (error) {
    console.error('Get entrepreneurs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get analytics overview
router.get('/analytics/overview', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const stats = await getRow(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN role = 'entrepreneur' THEN 1 END) as total_entrepreneurs,
        COUNT(CASE WHEN role = 'admin' THEN 1 END) as total_admins
      FROM users
      WHERE is_active = true
    `);

    const applicationStats = await getRow(`
      SELECT 
        COUNT(*) as total_applications,
        SUM(CASE WHEN status = 'disbursed' THEN amount ELSE 0 END) as total_disbursed,
        AVG(amount) as average_loan_amount
      FROM applications
    `);

    const recentActivity = await getRows(`
      SELECT 
        a.id, a.loan_type, a.amount, a.status, a.created_at,
        u.first_name, u.last_name, u.email
      FROM applications a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `);

    res.json({
      userStats: stats,
      applicationStats,
      recentActivity
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get partner management
router.get('/partners', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const partners = await getRows('SELECT * FROM partners ORDER BY created_at DESC');
    res.json({ partners });
  } catch (error) {
    console.error('Get partners error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get consent logs
router.get('/consent-logs', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const logs = await getRows(`
      SELECT 
        cl.*,
        u.first_name,
        u.last_name,
        u.email
      FROM consent_logs cl
      JOIN users u ON cl.user_id = u.id
      ORDER BY cl.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    const countResult = await getRow('SELECT COUNT(*) as total FROM consent_logs');
    const total = parseInt(countResult.total);

    res.json({
      logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get consent logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 