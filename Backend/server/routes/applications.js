const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/ApplicationController');
const { authenticateToken, requireAdmin, requireEntrepreneur } = require('../middleware/auth');

// Public routes (none for applications)

// Protected routes - Admin only
router.get('/', authenticateToken, requireAdmin, ApplicationController.getAllApplications);
router.get('/stats', authenticateToken, requireAdmin, ApplicationController.getApplicationStats);
router.get('/:id', authenticateToken, requireAdmin, ApplicationController.getApplicationById);
router.put('/:id/status', authenticateToken, requireAdmin, ApplicationController.updateApplicationStatus);
router.put('/:id/approve', authenticateToken, requireAdmin, ApplicationController.approveApplication);
router.put('/:id/disburse', authenticateToken, requireAdmin, ApplicationController.disburseLoan);

// Protected routes - Entrepreneurs
router.post('/', authenticateToken, requireEntrepreneur, ApplicationController.createApplication);
router.get('/user/applications', authenticateToken, requireEntrepreneur, ApplicationController.getUserApplications);
router.put('/:id', authenticateToken, requireEntrepreneur, ApplicationController.updateApplication);
router.delete('/:id', authenticateToken, requireEntrepreneur, ApplicationController.deleteApplication);

module.exports = router; 