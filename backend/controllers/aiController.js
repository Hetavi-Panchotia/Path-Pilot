const aiService = require('../services/aiService');

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
