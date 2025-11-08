const axios = require('axios');
require('dotenv').config();

// NO defaults - must be explicitly set in .env
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL;
const OLLAMA_MODEL = process.env.OLLAMA_MODEL;

/**
 * Check if Ollama service is available
 * @returns {Promise<boolean>}
 */
async function checkOllamaStatus() {
  // Check if Ollama config is set in .env
  if (!OLLAMA_BASE_URL || !OLLAMA_MODEL) {
    console.log('❌ Ollama not configured in .env (OLLAMA_BASE_URL or OLLAMA_MODEL missing)');
    return false;
  }

  try {
    const response = await axios.get(OLLAMA_BASE_URL, { timeout: 2000 });
    console.log(`✅ Ollama service is available at ${OLLAMA_BASE_URL}`);
    return true;
  } catch (error) {
    console.log(`❌ Ollama service is not available at ${OLLAMA_BASE_URL}`);
    return false;
  }
}

/**
 * Generate MCQs from text using Ollama local model
 * @param {string} text - Text content to generate MCQs from
 * @param {number} count - Number of MCQs to generate (default: 10)
 * @returns {Promise<string>} - Generated MCQs
 */
async function generateMCQs(text, count = 10) {
  try {
    console.log('📥 Received request to generate MCQs with Ollama');
    console.log('📊 Requested count:', count);
    console.log('📝 Text length:', text?.length, 'characters');
    
    // Validate Ollama config
    if (!OLLAMA_BASE_URL || !OLLAMA_MODEL) {
      throw new Error('Ollama not configured. Please set OLLAMA_BASE_URL and OLLAMA_MODEL in .env file');
    }
    
    // Validate and sanitize count
    const numQuestions = Math.min(Math.max(parseInt(count) || 10, 1), 50);
    console.log('✅ Final question count to generate:', numQuestions);
    
    // Craft the prompt with strict formatting instructions
    const prompt = `You are an expert MCQ generator. Generate EXACTLY ${numQuestions} Multiple Choice Questions from the provided text.

CRITICAL RULES:
1. Generate EXACTLY ${numQuestions} questions - NO MORE, NO LESS
2. Number them Q1, Q2, Q3... up to Q${numQuestions}
3. Each question MUST have exactly 4 options: A), B), C), D)
4. Each question MUST have "Answer: <Letter>" at the end
5. Use ONLY information from the provided text
6. NO explanations, NO extra text, NO introduction, NO conclusion

EXACT FORMAT FOR EACH QUESTION:
Q[number]. [Question text]
A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]
Answer: [Correct letter]

[blank line between questions]

IMPORTANT: You MUST generate all ${numQuestions} questions. Count carefully: 1, 2, 3... ${numQuestions}.

Text to generate questions from:
${text}

Generate EXACTLY ${numQuestions} MCQs now:`;

    console.log(`🔄 Sending request to Ollama (${OLLAMA_MODEL}) for ${numQuestions} questions...`);
    
    // Send request to Ollama API
    const response = await axios.post(
      `${OLLAMA_BASE_URL}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_k: 40,
          top_p: 0.9,
          num_predict: 4096,
        }
      },
      {
        timeout: 120000, // 2 minutes timeout for local generation
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const mcqText = response.data.response;

    // Count how many questions were actually generated
    const questionMatches = mcqText.match(/Q\d+\./g);
    const actualCount = questionMatches ? questionMatches.length : 0;
    
    console.log(`✅ Successfully generated MCQs with Ollama`);
    console.log(`📊 Requested: ${numQuestions}, Actual: ${actualCount}`);
    
    if (actualCount < numQuestions) {
      console.warn(`⚠️ WARNING: AI generated fewer questions than requested (${actualCount}/${numQuestions})`);
    }
    
    return mcqText;
  } catch (error) {
    console.error('Error generating MCQs with Ollama:', error.message);
    
    // Provide more detailed error messages
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Ollama service is not running. Please start Ollama: "ollama serve"');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Ollama request timed out. The model might be too slow or not loaded');
    } else if (error.response?.status === 404) {
      throw new Error(`Model "${OLLAMA_MODEL}" not found. Please run: ollama pull ${OLLAMA_MODEL}`);
    } else {
      throw new Error(`Failed to generate MCQs with Ollama: ${error.message}`);
    }
  }
}

/**
 * Generate MCQs from multiple text chunks using Ollama
 * @param {string[]} chunks - Array of text chunks
 * @param {number} count - Number of MCQs to generate
 * @returns {Promise<string>} - Combined MCQs
 */
async function generateMCQsFromChunks(chunks, count = 10) {
  try {
    // For now, use the first chunk or combine if small enough
    const combinedText = chunks.slice(0, 2).join('\n\n');
    return await generateMCQs(combinedText, count);
  } catch (error) {
    console.error('Error generating MCQs from chunks with Ollama:', error);
    throw error;
  }
}

module.exports = {
  generateMCQs,
  generateMCQsFromChunks,
  checkOllamaStatus
};
