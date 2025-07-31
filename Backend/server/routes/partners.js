const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { query, getRows, getRow } = require('../../config/db');

// Get all partners
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const partners = await getRows('SELECT * FROM partners ORDER BY created_at DESC');
    res.json({ partners });
  } catch (error) {
    console.error('Get partners error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create partner
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, email, phone, country, region } = req.body;

    const result = await query(
      'INSERT INTO partners (name, email, phone, country, region) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, country, region]
    );

    res.status(201).json({
      message: 'Partner created successfully',
      partner: result.rows[0]
    });
  } catch (error) {
    console.error('Create partner error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update partner
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, country, region, isActive } = req.body;

    const result = await query(
      'UPDATE partners SET name = $1, email = $2, phone = $3, country = $4, region = $5, is_active = $6 WHERE id = $7 RETURNING *',
      [name, email, phone, country, region, isActive, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    res.json({
      message: 'Partner updated successfully',
      partner: result.rows[0]
    });
  } catch (error) {
    console.error('Update partner error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete partner
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM partners WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Delete partner error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 