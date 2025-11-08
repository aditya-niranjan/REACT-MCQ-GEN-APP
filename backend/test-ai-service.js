const axios = require('axios');

async function testAIService() {
  console.log('🧪 Testing AI Service Detection...\n');

  try {
    const response = await axios.get('http://localhost:5000/api/status');
    const data = response.data;

    console.log('📊 AI Service Status:');
    console.log('='.repeat(50));
    
    console.log('\n🔑 Gemini API:');
    console.log(`   Available: ${data.gemini.available}`);
    console.log(`   Status: ${data.gemini.status}`);
    
    console.log('\n🤖 Ollama Local:');
    console.log(`   Available: ${data.ollama.available}`);
    console.log(`   Status: ${data.ollama.status}`);
    
    console.log('\n🎯 Current Active Service:');
    console.log(`   ${data.current.toUpperCase()}`);
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Backend is ready to generate MCQs!\n');

  } catch (error) {
    console.error('❌ Error testing AI service:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Backend server is not running!');
      console.log('   Start it with: cd backend && npm start\n');
    }
  }
}

testAIService();
