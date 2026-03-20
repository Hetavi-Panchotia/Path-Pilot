const pdf = require('pdf-parse');
const Tesseract = require('tesseract.js');

exports.extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF Parse Error:', error);
    throw new Error('Could not parse PDF file.');
  }
};

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

exports.extractTextFromImage = async (buffer) => {
  let tempFilePath;
  try {
    tempFilePath = path.join(os.tmpdir(), `resume_${crypto.randomBytes(4).toString('hex')}.jpg`);
    fs.writeFileSync(tempFilePath, buffer);
    console.log(`Analyzing image at ${tempFilePath}`);
    
    const { data: { text } } = await Tesseract.recognize(tempFilePath, 'eng', {
      logger: m => console.log(m.status, Math.round(m.progress * 100) + '%')
    });
    
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    
    if (!text || text.trim().length === 0) {
      throw new Error("No readable text could be extracted from this image. Please ensure it is legible.");
    }

    console.log("OCR Extracted text length:", text.length);
    return text;
  } catch (error) {
    if (tempFilePath && fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    console.error('Image Parse Error:', error);
    throw new Error(error.message || 'Could not extract text from image.');
  }
};
