import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Upload PDF and generate MCQs
 * @param {File} pdfFile - PDF file to upload
 * @param {number} count - Number of MCQs to generate
 * @returns {Promise} - API response with MCQs
 */
export const generateMCQsFromPDF = async (pdfFile, count = 10) => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    formData.append('count', count.toString());

    const response = await axios.post(`${API_URL}/mcq/generate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error.response?.data?.error || 'Failed to generate MCQs';
  }
};

/**
 * Download MCQs as TXT file
 * @param {string} mcqText - MCQ content
 * @param {string} filename - File name
 */
export const downloadAsTXT = (mcqText, filename = 'mcqs.txt') => {
  const blob = new Blob([mcqText], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Download MCQs as PDF file
 * @param {string} mcqText - MCQ content
 * @param {string} filename - File name
 */
export const downloadAsPDF = async (mcqText, filename = 'mcqs.pdf') => {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    // Set font size and style
    doc.setFontSize(12);
    
    // Split text into lines
    const lines = mcqText.split('\n');
    let yPosition = 20;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    lines.forEach((line) => {
      // Check if we need a new page
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
      }

      // Split long lines
      const splitLines = doc.splitTextToSize(line, 170);
      splitLines.forEach((splitLine) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(splitLine, 20, yPosition);
        yPosition += lineHeight;
      });
    });

    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
