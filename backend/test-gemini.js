const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGeminiAPI() {
  console.log('Testing Gemini API connection...\n');
  
  // Check if API key exists
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    return;
  }
  
  console.log('✅ API Key found:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    console.log('\n🔄 Sending test request to Gemini API...');
    
    const prompt = 'Generate 2 simple MCQs about JavaScript. Use format: Q1. question, A) option, B) option, C) option, D) option, Answer: letter';
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('\n✅ API Connection Successful!\n');
    console.log('Response:');
    console.log('─'.repeat(50));
    console.log(text);
    console.log('─'.repeat(50));
    
  } catch (error) {
    console.error('\n❌ API Error:', error.message);
    
    if (error.message?.includes('API_KEY_INVALID')) {
      console.error('\n💡 Solution: Your API key is invalid. Get a new one from:');
      console.error('   https://aistudio.google.com/app/apikey');
    } else if (error.message?.includes('quota')) {
      console.error('\n💡 Solution: API quota exceeded. Wait or upgrade your plan.');
    } else {
      console.error('\n💡 Full error details:', error);
    }
  }
}

testGeminiAPI();
