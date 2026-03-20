const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

(async () => {
  try {
    const b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const buf = Buffer.from(b64, 'base64');
    fs.writeFileSync('test.png', buf);
    
    const form = new FormData();
    form.append('resumeFile', fs.createReadStream('test.png'));
    form.append('jdText', 'Test info');

    console.log("Testing POST /api/upload...");
    const res = await axios.post('http://localhost:5005/api/upload', form, {
      headers: form.getHeaders()
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
})();
