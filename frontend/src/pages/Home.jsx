import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UploadBox from '../components/UploadBox';
import MCQList from '../components/MCQList';
import { generateMCQsFromPDF } from '../services/api';
import './Home.css';

const Home = () => {
  const [mcqs, setMcqs] = useState('');
  const [filename, setFilename] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (file, count) => {
    setIsLoading(true);
    setError('');
    setMcqs('');

    try {
      const response = await generateMCQsFromPDF(file, count);
      
      if (response.success) {
        setMcqs(response.mcqs);
        setFilename(response.filename);
      } else {
        setError(response.error || 'Failed to generate MCQs');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(typeof err === 'string' ? err : 'Failed to generate MCQs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="header-icon"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          📚
        </motion.div>
        <h1>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            PDF to MCQ
          </motion.span>{' '}
          <motion.span 
            className="gradient-text"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Generator
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Transform your study materials into intelligent multiple-choice questions using AI
        </motion.p>
      </motion.header>

      <main className="app-main">
        <UploadBox onFileUpload={handleFileUpload} isLoading={isLoading} />

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <motion.span 
              className="error-icon"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              ⚠️
            </motion.span>
            {error}
          </motion.div>
        )}

        {isLoading && (
          <motion.div 
            className="loading-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="loading-content">
              <motion.div 
                className="loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="loading-text">Processing your PDF and generating MCQs...</p>
                <motion.p 
                  className="loading-subtext"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  This may take a few moments
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {mcqs && !isLoading && (
          <MCQList mcqs={mcqs} filename={filename} />
        )}
      </main>

      <motion.footer 
        className="app-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Powered by Google Gemini AI • Built with React & Node.js By Adit!</p>
      </motion.footer>
    </div>
  );
};

export default Home;
