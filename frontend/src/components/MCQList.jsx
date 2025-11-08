import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle2, Cpu, Cloud } from 'lucide-react';
import { downloadAsTXT, downloadAsPDF } from '../services/api';
import './MCQList.css';

const MCQList = ({ mcqs, filename, service, fallback }) => {
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
    let questionIndex = 0;
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // Question line
      if (trimmedLine.match(/^Q\d+\./)) {
        questionIndex++;
        formattedLines.push(
          <motion.div 
            key={index} 
            className="mcq-question"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: questionIndex * 0.1 }}
          >
            {trimmedLine}
          </motion.div>
        );
      }
      // Option lines
      else if (trimmedLine.match(/^[A-D]\)/)) {
        formattedLines.push(
          <motion.div 
            key={index} 
            className="mcq-option"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: questionIndex * 0.1 + 0.05 }}
            whileHover={{ x: 5, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
          >
            {trimmedLine}
          </motion.div>
        );
      }
      // Answer line
      else if (trimmedLine.match(/^Answer:/)) {
        formattedLines.push(
          <motion.div 
            key={index} 
            className="mcq-answer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: questionIndex * 0.1 + 0.1 }}
          >
            <span className="answer-label">✓</span> {trimmedLine}
          </motion.div>
        );
      }
      // Other lines
      else {
        formattedLines.push(
          <motion.div 
            key={index} 
            className="mcq-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: questionIndex * 0.1 }}
          >
            {trimmedLine}
          </motion.div>
        );
      }
    });

    return formattedLines;
  };

  // Get service info for display
  const getServiceInfo = () => {
    if (service === 'ollama') {
      return {
        name: 'Ollama',
        icon: <Cpu size={18} />,
        label: 'Local AI',
        color: '#10b981',
        className: 'service-ollama'
      };
    } else if (service === 'gemini') {
      return {
        name: 'Gemini',
        icon: <Cloud size={18} />,
        label: fallback ? 'Cloud AI (Fallback)' : 'Cloud AI',
        color: '#6366f1',
        className: 'service-gemini'
      };
    }
    return null;
  };

  const serviceInfo = getServiceInfo();

  return (
    <motion.div 
      className="mcq-list"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mcq-header">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle2 size={32} className="success-icon" color="#10b981" /> Generated MCQs
        </motion.h2>
        <motion.div 
          className="download-buttons"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button 
            onClick={handleDownloadTXT} 
            className="download-btn txt-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={20} /> Download as TXT
          </motion.button>
          <motion.button 
            onClick={handleDownloadPDF} 
            className="download-btn pdf-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} /> Download as PDF
          </motion.button>
        </motion.div>
      </div>

      {/* AI Service Badge */}
      {serviceInfo && (
        <motion.div 
          className={`ai-service-badge ${serviceInfo.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {serviceInfo.icon}
          <span className="service-text">
            Generated using <strong>{serviceInfo.name}</strong> • {serviceInfo.label}
          </span>
          {fallback && <span className="fallback-tag">⚠️ Fallback Mode</span>}
        </motion.div>
      )}

      <div className="mcq-content">
        {formatMCQs(mcqs)}
      </div>
    </motion.div>
  );
};

export default MCQList;
