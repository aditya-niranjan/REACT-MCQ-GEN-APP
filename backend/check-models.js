const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
  console.log('Checking Gemini API Key and Available Models...\n');
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    return;
  }
  
  console.log('API Key:', process.env.GEMINI_API_KEY.substring(0, 15) + '...\n');
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try different model names
    const modelsToTry = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'models/gemini-pro',
      'models/gemini-1.5-pro',
      'models/gemini-1.5-flash'
    ];
    
    console.log('Testing different model names...\n');
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`Testing: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say "working" if you can read this');
        const response = result.response;
        const text = response.text();
        
        console.log(`✅ SUCCESS with model: ${modelName}`);
        console.log(`Response: ${text}\n`);
        return modelName; // Return the working model
      } catch (error) {
        console.log(`❌ Failed: ${error.message.split('\n')[0]}\n`);
      }
    }
    
    console.error('\n❌ None of the models worked. Possible issues:');
    console.error('1. Invalid API Key - Get a new one from: https://aistudio.google.com/app/apikey');
    console.error('2. API Key restrictions - Check your API key settings');
    console.error('3. Billing not enabled - Enable billing in Google Cloud Console');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listModels();
