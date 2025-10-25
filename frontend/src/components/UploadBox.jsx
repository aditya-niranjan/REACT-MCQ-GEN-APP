import React, { useState, useRef } from 'react';
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
    <div className="upload-box">
      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          style={{ display: 'none' }}
          disabled={isLoading}
        />
        
        <div className="upload-icon">📄</div>
        
        {selectedFile ? (
          <div className="file-info">
            <p className="file-name">{selectedFile.name}</p>
            <p className="file-size">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <div className="upload-text">
            <p className="main-text">
              Drag & drop your PDF here or click to browse
            </p>
            <p className="sub-text">PDF files only, max 10MB</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="question-count-section">
          <label htmlFor="questionCount" className="question-count-label">
            Number of MCQs to Generate:
          </label>
          <div className="question-count-controls">
            <button
              type="button"
              className="count-btn"
              onClick={() => setQuestionCount(Math.max(1, questionCount - 1))}
              disabled={isLoading || questionCount <= 1}
            >
              -
            </button>
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
            <button
              type="button"
              className="count-btn"
              onClick={() => setQuestionCount(Math.min(50, questionCount + 1))}
              disabled={isLoading || questionCount >= 50}
            >
              +
            </button>
          </div>
          <p className="count-hint">Min: 1, Max: 50 questions</p>
        </div>
      )}

      {selectedFile && (
        <button
          className="generate-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Generating MCQs...
            </>
          ) : (
            'Generate MCQs'
          )}
        </button>
      )}
    </div>
  );
};

export default UploadBox;
