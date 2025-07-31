const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { getRows, getRow } = require('../../config/db');

// Get analytics overview
router.get('/overview', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Overall statistics
    const overallStats = await getRow(`
      SELECT 
        COUNT(*) as total_applications,
        COUNT(CASE WHEN status = 'disbursed' THEN 1 END) as disbursed_applications,
        SUM(CASE WHEN status = 'disbursed' THEN amount ELSE 0 END) as total_disbursed,
        AVG(amount) as average_loan_amount,
        COUNT(DISTINCT user_id) as unique_entrepreneurs
      FROM applications
    `);

    // Applications by status
    const statusDistribution = await getRows(`
      SELECT 
        status,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM applications
      GROUP BY status
      ORDER BY count DESC
    `);

    // Applications by country
    const countryDistribution = await getRows(`
      SELECT 
        u.country,
        COUNT(*) as count,
        SUM(a.amount) as total_amount
      FROM applications a
      JOIN users u ON a.user_id = u.id
      GROUP BY u.country
      ORDER BY count DESC
      LIMIT 10
    `);

    // Applications by value chain
    const valueChainDistribution = await getRows(`
      SELECT 
        value_chain,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM applications
      WHERE value_chain IS NOT NULL
      GROUP BY value_chain
      ORDER BY count DESC
    `);

    // Monthly trends
    const monthlyTrends = await getRows(`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as applications,
        SUM(amount) as total_amount
      FROM applications
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month
    `);

    res.json({
      overallStats,
      statusDistribution,
      countryDistribution,
      valueChainDistribution,
      monthlyTrends
    });
  } catch (error) {
    console.error('Get analytics overview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get repayment analytics
router.get('/repayments', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Repayment statistics
    const repaymentStats = await getRow(`
      SELECT 
        COUNT(*) as total_repayments,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_repayments,
        COUNT(CASE WHEN status = 'overdue' THEN 1 END) as overdue_repayments,
        COUNT(CASE WHEN status = 'defaulted' THEN 1 END) as defaulted_repayments,
        SUM(amount) as total_amount,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as total_paid,
        AVG(amount) as average_repayment
      FROM repayments
    `);

    // Repayment rate by month
    const monthlyRepayments = await getRows(`
      SELECT 
        DATE_TRUNC('month', due_date) as month,
        COUNT(*) as total_due,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid,
        SUM(amount) as total_amount,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as paid_amount
      FROM repayments
      WHERE due_date >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', due_date)
      ORDER BY month
    `);

    // Default rate by value chain
    const defaultRateByValueChain = await getRows(`
      SELECT 
        a.value_chain,
        COUNT(r.*) as total_repayments,
        COUNT(CASE WHEN r.status = 'defaulted' THEN 1 END) as defaulted,
        ROUND(
          (COUNT(CASE WHEN r.status = 'defaulted' THEN 1 END)::DECIMAL / COUNT(r.*)) * 100, 2
        ) as default_rate
      FROM repayments r
      JOIN applications a ON r.application_id = a.id
      WHERE a.value_chain IS NOT NULL
      GROUP BY a.value_chain
      ORDER BY default_rate DESC
    `);

    res.json({
      repaymentStats,
      monthlyRepayments,
      defaultRateByValueChain
    });
  } catch (error) {
    console.error('Get repayment analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get geographic analytics
router.get('/geographic', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Applications by region
    const regionalData = await getRows(`
      SELECT 
        region,
        COUNT(*) as applications,
        SUM(amount) as total_amount,
        AVG(amount) as average_amount
      FROM applications
      WHERE region IS NOT NULL
      GROUP BY region
      ORDER BY applications DESC
    `);

    // Geographic coordinates for mapping
    const mapData = await getRows(`
      SELECT 
        latitude,
        longitude,
        region,
        loan_type,
        status,
        amount
      FROM applications
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL
    `);

    res.json({
      regionalData,
      mapData
    });
  } catch (error) {
    console.error('Get geographic analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get ML analytics
router.get('/ml', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // ML score distribution
    const mlScoreDistribution = await getRows(`
      SELECT 
        CASE 
          WHEN ml_score >= 80 THEN 'High (80-100)'
          WHEN ml_score >= 60 THEN 'Medium (60-79)'
          ELSE 'Low (0-59)'
        END as score_range,
        COUNT(*) as count,
        AVG(ml_score) as average_score
      FROM applications
      WHERE ml_score IS NOT NULL
      GROUP BY 
        CASE 
          WHEN ml_score >= 80 THEN 'High (80-100)'
          WHEN ml_score >= 60 THEN 'Medium (60-79)'
          ELSE 'Low (0-59)'
        END
      ORDER BY average_score DESC
    `);

    // Risk level analysis
    const riskLevelAnalysis = await getRows(`
      SELECT 
        risk_level,
        COUNT(*) as count,
        AVG(amount) as average_amount,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
      FROM applications
      WHERE risk_level IS NOT NULL
      GROUP BY risk_level
      ORDER BY count DESC
    `);

    // Approval rate by ML score
    const approvalRateByScore = await getRows(`
      SELECT 
        CASE 
          WHEN ml_score >= 80 THEN 'High (80-100)'
          WHEN ml_score >= 60 THEN 'Medium (60-79)'
          ELSE 'Low (0-59)'
        END as score_range,
        COUNT(*) as total_applications,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        ROUND(
          (COUNT(CASE WHEN status = 'approved' THEN 1 END)::DECIMAL / COUNT(*)) * 100, 2
        ) as approval_rate
      FROM applications
      WHERE ml_score IS NOT NULL
      GROUP BY 
        CASE 
          WHEN ml_score >= 80 THEN 'High (80-100)'
          WHEN ml_score >= 60 THEN 'Medium (60-79)'
          ELSE 'Low (0-59)'
        END
      ORDER BY approval_rate DESC
    `);

    res.json({
      mlScoreDistribution,
      riskLevelAnalysis,
      approvalRateByScore
    });
  } catch (error) {
    console.error('Get ML analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 