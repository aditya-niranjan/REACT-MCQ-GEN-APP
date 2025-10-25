const { extractTextFromPDF, chunkText } = require('../utils/pdfExtract');
const { generateMCQs, generateMCQsFromChunks } = require('../services/geminiService');

/**
 * Handle PDF upload and MCQ generation
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function uploadAndGenerateMCQs(req, res) {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No PDF file uploaded' 
      });
    }

    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ 
        success: false, 
        error: 'Only PDF files are allowed' 
      });
    }

    // Get question count from request body
    const questionCount = parseInt(req.body.count) || 10;
    
    console.log('Processing PDF:', req.file.originalname);
    console.log('File size:', req.file.size, 'bytes');
    console.log('Requested MCQ count:', questionCount);

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(req.file.buffer);

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No text could be extracted from the PDF' 
      });
    }

    console.log('Extracted text length:', extractedText.length, 'characters');

    // Validate minimum text length
    if (extractedText.trim().length < 100) {
      return res.status(400).json({ 
        success: false, 
        error: 'PDF content is too short. Please upload a document with more text.' 
      });
    }

    // Chunk text if too long
    const chunks = chunkText(extractedText, 4000);
    console.log('Text divided into', chunks.length, 'chunk(s)');

    // Generate MCQs
    let mcqs;
    if (chunks.length === 1) {
      mcqs = await generateMCQs(chunks[0], questionCount);
    } else {
      mcqs = await generateMCQsFromChunks(chunks, questionCount);
    }

    console.log('MCQs generated successfully');

    // Return success response
    res.json({
      success: true,
      mcqs: mcqs,
      filename: req.file.originalname,
      count: questionCount
    });

  } catch (error) {
    console.error('Error in uploadAndGenerateMCQs:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to generate MCQs' 
    });
  }
}

module.exports = {
  uploadAndGenerateMCQs
};
