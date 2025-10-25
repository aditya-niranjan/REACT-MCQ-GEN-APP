const express = require('express');
const multer = require('multer');
const { uploadAndGenerateMCQs } = require('../controllers/mcqController');

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

/**
 * POST /api/mcq/generate
 * Upload PDF and generate MCQs
 */
router.post('/generate', upload.single('pdf'), uploadAndGenerateMCQs);

module.exports = router;
