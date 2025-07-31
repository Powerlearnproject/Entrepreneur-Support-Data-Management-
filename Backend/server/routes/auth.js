const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authenticateToken, requireAdmin, requireEntrepreneur, otpRateLimit } = require('../middleware/auth');

// Public routes
router.post('/admin/login', AuthController.adminLogin);
router.post('/entrepreneur/login', otpRateLimit, AuthController.entrepreneurLogin);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/forgot-password', otpRateLimit, AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

// Protected routes
router.get('/profile', authenticateToken, AuthController.getProfile);
router.put('/profile', authenticateToken, AuthController.updateProfile);
router.post('/change-password', authenticateToken, AuthController.changePassword);

module.exports = router; 