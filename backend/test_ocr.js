const Tesseract = require('tesseract.js');

(async () => {
  try {
    // 1x1 pixel transparent PNG
    const b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const buffer = Buffer.from(b64, 'base64');
    
    console.log("Starting Tesseract...");
    const worker = await Tesseract.createWorker('eng', 1, {
      logger: m => console.log(m.status, Math.round(m.progress * 100) + '%'),
      langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
    });
    await worker.setParameters({
      tessedit_pageseg_mode: '11',
    });
    const { data: { text } } = await worker.recognize(buffer);
    await worker.terminate();
    console.log("Success! Text:", text);
  } catch (error) {
    console.error("Tesseract Error Stack:", error.stack || error);
  }
})();
