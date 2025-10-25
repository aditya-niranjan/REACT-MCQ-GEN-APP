import React from 'react';
import { downloadAsTXT, downloadAsPDF } from '../services/api';
import './MCQList.css';

const MCQList = ({ mcqs, filename }) => {
  const handleDownloadTXT = () => {
    const txtFilename = filename.replace('.pdf', '_mcqs.txt');
    downloadAsTXT(mcqs, txtFilename);
  };

  const handleDownloadPDF = async () => {
    try {
      const pdfFilename = filename.replace('.pdf', '_mcqs.pdf');
      await downloadAsPDF(mcqs, pdfFilename);
    } catch (error) {
      alert('Failed to generate PDF: ' + error.message);
    }
  };

  // Format MCQs for display
  const formatMCQs = (text) => {
    const lines = text.split('\n');
    const formattedLines = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // Question line
      if (trimmedLine.match(/^Q\d+\./)) {
        formattedLines.push(
          <div key={index} className="mcq-question">
            {trimmedLine}
          </div>
        );
      }
      // Option lines
      else if (trimmedLine.match(/^[A-D]\)/)) {
        formattedLines.push(
          <div key={index} className="mcq-option">
            {trimmedLine}
          </div>
        );
      }
      // Answer line
      else if (trimmedLine.match(/^Answer:/)) {
        formattedLines.push(
          <div key={index} className="mcq-answer">
            {trimmedLine}
          </div>
        );
      }
      // Other lines
      else {
        formattedLines.push(
          <div key={index} className="mcq-text">
            {trimmedLine}
          </div>
        );
      }
    });

    return formattedLines;
  };

  return (
    <div className="mcq-list">
      <div className="mcq-header">
        <h2>Generated MCQs</h2>
        <div className="download-buttons">
          <button onClick={handleDownloadTXT} className="download-btn txt-btn">
            📝 Download as TXT
          </button>
          <button onClick={handleDownloadPDF} className="download-btn pdf-btn">
            📄 Download as PDF
          </button>
        </div>
      </div>

      <div className="mcq-content">
        {formatMCQs(mcqs)}
      </div>
    </div>
  );
};

export default MCQList;
