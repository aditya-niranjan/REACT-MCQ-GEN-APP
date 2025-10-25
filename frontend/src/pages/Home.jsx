import React, { useState } from 'react';
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
      <header className="app-header">
        <h1>📚 PDF to MCQ Generator</h1>
        <p>Upload your study material and get AI-generated Multiple Choice Questions</p>
      </header>

      <main className="app-main">
        <UploadBox onFileUpload={handleFileUpload} isLoading={isLoading} />

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Processing your PDF and generating MCQs...</p>
            <p className="loading-subtext">This may take a few moments</p>
          </div>
        )}

        {mcqs && !isLoading && (
          <MCQList mcqs={mcqs} filename={filename} />
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by Google Gemini AI • Built with React & Node.js</p>
      </footer>
    </div>
  );
};

export default Home;
