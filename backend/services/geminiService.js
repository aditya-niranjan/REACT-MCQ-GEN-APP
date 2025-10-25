const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate MCQs from text using Google Gemini API
 * @param {string} text - Text content to generate MCQs from
 * @param {number} count - Number of MCQs to generate (default: 10)
 * @returns {Promise<string>} - Generated MCQs
 */
async function generateMCQs(text, count = 10) {
  try {
    console.log('📥 Received request to generate MCQs');
    console.log('📊 Requested count:', count);
    console.log('📝 Text length:', text?.length, 'characters');
    
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in .env file');
    }

    // Get the generative model - use gemini-2.5-flash (fast and free)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });

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

    console.log(`🔄 Sending request to Gemini API for ${numQuestions} questions...`);
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const mcqText = response.text();

    // Count how many questions were actually generated
    const questionMatches = mcqText.match(/Q\d+\./g);
    const actualCount = questionMatches ? questionMatches.length : 0;
    
    console.log(`✅ Successfully generated MCQs from Gemini API`);
    console.log(`📊 Requested: ${numQuestions}, Actual: ${actualCount}`);
    
    if (actualCount < numQuestions) {
      console.warn(`⚠️ WARNING: AI generated fewer questions than requested (${actualCount}/${numQuestions})`);
    }
    
    return mcqText;
  } catch (error) {
    console.error('Error generating MCQs with Gemini:', error);
    
    // Provide more detailed error messages
    if (error.message?.includes('API key')) {
      throw new Error('Invalid or missing Gemini API key. Please check your .env file');
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later');
    } else if (error.message?.includes('blocked')) {
      throw new Error('Content was blocked by safety filters. Try different content');
    } else {
      throw new Error(`Failed to generate MCQs from AI: ${error.message || 'Unknown error'}`);
    }
  }
}

/**
 * Generate MCQs from multiple text chunks
 * @param {string[]} chunks - Array of text chunks
 * @param {number} count - Number of MCQs to generate
 * @returns {Promise<string>} - Combined MCQs
 */
async function generateMCQsFromChunks(chunks, count = 10) {
  try {
    // For now, use the first chunk or combine if small enough
    // To optimize API calls, we'll use the most relevant chunk
    const combinedText = chunks.slice(0, 2).join('\n\n');
    return await generateMCQs(combinedText, count);
  } catch (error) {
    console.error('Error generating MCQs from chunks:', error);
    throw error;
  }
}

module.exports = {
  generateMCQs,
  generateMCQsFromChunks
};
