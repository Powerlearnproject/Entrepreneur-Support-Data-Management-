const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Public: submit application
router.post('/', upload.single('image'), applicationController.submitApplication);

// Admin: list applications
router.get('/', auth, applicationController.listApplications);

// Admin: approve application
router.patch('/:id/approve', auth, isAdmin, applicationController.approveApplication);

// Admin: reject application
router.patch('/:id/reject', auth, isAdmin, applicationController.rejectApplication);

module.exports = router; 