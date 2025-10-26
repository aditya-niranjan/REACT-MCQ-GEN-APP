import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './UploadBox.css';

const UploadBox = ({ onFileUpload, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file) => {
    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile && !isLoading) {
      onFileUpload(selectedFile, questionCount);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div 
      className="upload-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          style={{ display: 'none' }}
          disabled={isLoading}
        />
        
        <motion.div 
          className="upload-icon"
          animate={dragActive ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0] 
          } : {}}
          transition={{ duration: 0.5 }}
        >
          📄
        </motion.div>
        
        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div 
              className="file-info"
              key="file-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </motion.div>
          ) : (
            <motion.div 
              className="upload-text"
              key="upload-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="main-text">
                Drag & drop your PDF here or click to browse
              </p>
              <p className="sub-text">PDF files only, max 10MB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            className="question-count-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="questionCount" className="question-count-label">
              Number of MCQs to Generate:
            </label>
            <div className="question-count-controls">
              <motion.button
                type="button"
                className="count-btn"
                onClick={() => setQuestionCount(Math.max(1, questionCount - 1))}
                disabled={isLoading || questionCount <= 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <input
                id="questionCount"
                type="number"
                min="1"
                max="50"
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 10)))}
                className="question-count-input"
                disabled={isLoading}
              />
              <motion.button
                type="button"
                className="count-btn"
                onClick={() => setQuestionCount(Math.min(50, questionCount + 1))}
                disabled={isLoading || questionCount >= 50}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
            <p className="count-hint">Min: 1, Max: 50 questions</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedFile && (
          <motion.button
            className="generate-btn"
            onClick={handleSubmit}
            disabled={isLoading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isLoading ? (
              <>
                <motion.span 
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Generating MCQs...
              </>
            ) : (
              <>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                Generate MCQs
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UploadBox;
