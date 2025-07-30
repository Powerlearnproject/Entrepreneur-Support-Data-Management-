const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');
const { updatePassword } = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/update-password', auth, updatePassword);

module.exports = router; 