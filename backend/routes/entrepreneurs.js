const express = require('express');
const router = express.Router();
const entrepreneurController = require('../controllers/entrepreneurController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Public route for approved entrepreneurs
router.get('/approved', entrepreneurController.getApprovedEntrepreneurs);
router.get('/approved/:id', entrepreneurController.getApprovedEntrepreneursById);
router.post('approved/:id/funds', entrepreneurController.addFund);




// Protected routes
router.use(auth);

router.post('/', upload.single('image'), entrepreneurController.createEntrepreneur);
router.get('/', entrepreneurController.getEntrepreneurs);
router.get('/:id', entrepreneurController.getEntrepreneurById);
router.put('/:id', entrepreneurController.updateEntrepreneur);
router.delete('/:id', entrepreneurController.deleteEntrepreneur);

// Fund management routes



// Support activity routes
router.post('/:id/support', entrepreneurController.addSupportActivity);
router.put('/:id/support/:activityId', entrepreneurController.updateSupportActivity);
router.delete('/:id/support/:activityId', entrepreneurController.deleteSupportActivity);

module.exports = router;