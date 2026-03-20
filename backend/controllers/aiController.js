const { extractTextFromPdf, extractTextFromImage } = require('../utils/parsers');
const aiService = require('../services/aiService');

exports.uploadFiles = async (req, res) => {
  try {
    const { resumeFile } = req.files;
    const { jdText } = req.body;

    if (!resumeFile || !jdText) {
      return res.status(400).json({ error: 'Please provide both resume file and JD text.' });
    }

    const file = resumeFile[0];
    let resumeText = '';

    if (file.mimetype === 'application/pdf') {
      resumeText = await extractTextFromPdf(file.buffer);
    } else if (file.mimetype.startsWith('image/')) {
      resumeText = await extractTextFromImage(file.buffer);
    } else {
      return res.status(400).json({ error: 'Unsupported file format.' });
    }
    
    // Clean extracted text before sending to AI
    resumeText = resumeText.replace(/\s+/g, ' ').trim();

    res.json({ success: true, resumeText, jdText });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: error.message || 'Failed to process files.' });
  }
};

exports.analyzeGap = async (req, res) => {
  try {
    const { resumeText, jdText } = req.body;
    if (!resumeText || !jdText) {
      return res.status(400).json({ error: 'Missing resume or JD text' });
    }

    const analysis = await aiService.performGapAnalysis(resumeText, jdText);
    res.json(analysis);
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze gap.' });
  }
};

exports.generateRoadmap = async (req, res) => {
  try {
    const { analysis } = req.body; // Pass the previous analysis result
    if (!analysis) {
      return res.status(400).json({ error: 'Missing gap analysis data' });
    }

    const roadmap = await aiService.createLearningRoadmap(analysis);
    res.json(roadmap);
  } catch (error) {
    console.error('Roadmap Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate roadmap.' });
  }
};

exports.chatAssistant = async (req, res) => {
  try {
    const { message, context } = req.body;
    const reply = await aiService.getChatReply(message, context);
    res.json({ reply });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: error.message || 'Failed to get chat reply.' });
  }
};
