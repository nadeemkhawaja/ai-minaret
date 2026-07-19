import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function testUpload() {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream('test.txt'));
    
    // We need to know the port. Let's read .server-port
    const portData = JSON.parse(fs.readFileSync('.server-port', 'utf8'));
    
    const res = await fetch(`http://localhost:${portData.port}/api/upload`, {
      method: 'POST',
      body: form
    });
    
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error(err);
  }
}
testUpload();
