require('dotenv').config();
const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;

console.log('Testing API Key validity...\n');
console.log('API Key:', apiKey?.substring(0, 15) + '...\n');

// Test with direct HTTP request
const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Status Message:', res.statusMessage);
    console.log('\nResponse:');
    
    if (res.statusCode === 200) {
      const response = JSON.parse(data);
      console.log('✅ API Key is VALID!\n');
      console.log('Available models:');
      response.models?.forEach(model => {
        console.log(`  - ${model.name}`);
      });
    } else {
      console.log('❌ API Key Error:\n', data);
      console.log('\n💡 Solutions:');
      console.log('1. Get a new API key from: https://aistudio.google.com/app/apikey');
      console.log('2. Make sure "Generative Language API" is enabled');
      console.log('3. Check if there are any restrictions on your API key');
    }
  });
}).on('error', (err) => {
  console.error('❌ Request Error:', err.message);
});
