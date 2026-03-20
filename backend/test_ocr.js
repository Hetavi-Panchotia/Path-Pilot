const Tesseract = require('tesseract.js');

(async () => {
  try {
    // 1x1 pixel transparent PNG
    const b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const buffer = Buffer.from(b64, 'base64');
    
    console.log("Starting Tesseract...");
    const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
    console.log("Success! Text:", text);
  } catch (error) {
    console.error("Tesseract Error Stack:", error.stack || error);
  }
})();
