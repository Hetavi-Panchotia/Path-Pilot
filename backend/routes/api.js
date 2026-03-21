const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
router.post('/analyze', aiController.analyzeGap);
router.post('/chat', aiController.chatAssistant);

module.exports = router;
