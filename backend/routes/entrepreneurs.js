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

router.use(auth);

router.post('/', upload.single('image'), entrepreneurController.createEntrepreneur);
router.get('/', entrepreneurController.getEntrepreneurs);
router.get('/:id', entrepreneurController.getEntrepreneurById);
router.put('/:id', entrepreneurController.updateEntrepreneur);
router.delete('/:id', entrepreneurController.deleteEntrepreneur);

module.exports = router; 