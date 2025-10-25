const pdfParse = require('pdf-parse');

/**
 * Extract text content from PDF buffer
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @returns {Promise<string>} - Extracted text
 */
async function extractTextFromPDF(pdfBuffer) {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

/**
 * Chunk long text into smaller pieces for API processing
 * @param {string} text - Full text content
 * @param {number} maxChunkSize - Maximum characters per chunk
 * @returns {string[]} - Array of text chunks
 */
function chunkText(text, maxChunkSize = 4000) {
  const chunks = [];
  const sentences = text.split(/[.!?]+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        // Single sentence exceeds limit, force add
        chunks.push(sentence.trim());
      }
    } else {
      currentChunk += sentence + '. ';
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

module.exports = {
  extractTextFromPDF,
  chunkText
};
