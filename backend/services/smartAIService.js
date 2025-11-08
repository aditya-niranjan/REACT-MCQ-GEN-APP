require('dotenv').config();

// Import both services
const geminiService = require('./geminiService');
const ollamaService = require('./ollamaService');

/**
 * Smart AI service that automatically chooses between Gemini and Ollama
 * Priority: Gemini API (if key exists) -> Ollama (if running) -> Error
 */

let aiServiceType = null; // Will be 'gemini', 'ollama', or null

/**
 * Detect which AI service to use
 * Priority: Ollama (PRIMARY) -> Gemini (FALLBACK)
 * @returns {Promise<string>} - 'gemini' or 'ollama'
 */
async function detectAIService() {
  console.log('\n� Detecting available AI services...');
  
  // PRIORITY 1: Check Ollama FIRST (Primary choice)
  const ollamaAvailable = await ollamaService.checkOllamaStatus();
  
  if (ollamaAvailable) {
    console.log('✅ PRIMARY: Using Ollama (Local Model - Private & Free)');
    return 'ollama';
  }

  console.log('⚠️  Ollama not available, checking Gemini as fallback...');

  // PRIORITY 2: Fallback to Gemini if Ollama not available
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') {
    console.log('✅ FALLBACK: Using Gemini API (Cloud)');
    return 'gemini';
  }

  // Neither available
  console.log('❌ No AI service available!');
  throw new Error(
    '❌ No AI service available! Please configure in .env:\n' +
    '  PRIMARY: Set OLLAMA_BASE_URL and OLLAMA_MODEL (then start: ollama serve)\n' +
    '  FALLBACK: Set GEMINI_API_KEY'
  );
}

/**
 * Generate MCQs using the best available AI service
 * @param {string} text - Text content to generate MCQs from
 * @param {number} count - Number of MCQs to generate
 * @returns {Promise<{mcqs: string, service: string}>} - Generated MCQs and service used
 */
async function generateMCQs(text, count = 10) {
  try {
    // Detect service only once per session
    if (!aiServiceType) {
      aiServiceType = await detectAIService();
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`🎯 Using AI Service: ${aiServiceType.toUpperCase()}`);
    console.log(`${'='.repeat(50)}\n`);

    let mcqs;
    // Route to appropriate service
    if (aiServiceType === 'gemini') {
      mcqs = await geminiService.generateMCQs(text, count);
    } else if (aiServiceType === 'ollama') {
      mcqs = await ollamaService.generateMCQs(text, count);
    }

    // Return MCQs with service info
    return {
      mcqs: mcqs,
      service: aiServiceType
    };
  } catch (error) {
    console.error('❌ Error in primary AI service:', error.message);
    
    // If Ollama fails, try Gemini as fallback
    if (aiServiceType === 'ollama') {
      console.log('\n⚠️  Ollama failed! Attempting Gemini fallback...');
      try {
        if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') {
          console.log('🔄 Switching to Gemini API (Cloud fallback)');
          aiServiceType = 'gemini'; // Switch to fallback
          const mcqs = await geminiService.generateMCQs(text, count);
          return {
            mcqs: mcqs,
            service: 'gemini',
            fallback: true
          };
        } else {
          console.log('❌ Gemini fallback not available (no API key)');
        }
      } catch (fallbackError) {
        console.error('❌ Gemini fallback also failed:', fallbackError.message);
      }
    }
    
    throw error;
  }
}

/**
 * Generate MCQs from multiple text chunks
 * @param {string[]} chunks - Array of text chunks
 * @param {number} count - Number of MCQs to generate
 * @returns {Promise<{mcqs: string, service: string}>} - Combined MCQs and service used
 */
async function generateMCQsFromChunks(chunks, count = 10) {
  try {
    // Detect service if not already set
    if (!aiServiceType) {
      aiServiceType = await detectAIService();
    }

    let mcqs;
    // Route to appropriate service
    if (aiServiceType === 'gemini') {
      mcqs = await geminiService.generateMCQsFromChunks(chunks, count);
    } else if (aiServiceType === 'ollama') {
      mcqs = await ollamaService.generateMCQsFromChunks(chunks, count);
    }

    // Return MCQs with service info
    return {
      mcqs: mcqs,
      service: aiServiceType
    };
  } catch (error) {
    console.error('Error generating MCQs from chunks:', error);
    throw error;
  }
}

/**
 * Get current AI service status
 * @returns {Object} - Status information
 */
async function getServiceStatus() {
  const hasGeminiKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
  const ollamaAvailable = await ollamaService.checkOllamaStatus();

  return {
    gemini: {
      available: hasGeminiKey,
      status: hasGeminiKey ? '✅ API Key configured' : '❌ No API key'
    },
    ollama: {
      available: ollamaAvailable,
      status: ollamaAvailable ? '✅ Service running' : '❌ Service not running'
    },
    current: aiServiceType || 'Not initialized'
  };
}

module.exports = {
  generateMCQs,
  generateMCQsFromChunks,
  getServiceStatus
};
