import React from 'react';
import { 
  Sparkles, 
  Upload, 
  Zap, 
  Download,
  Shield,
  Cpu,
  Globe,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <Shield size={32} />,
      title: '100% Private',
      description: 'Your PDFs never leave your device. All processing happens locally on your machine.',
      color: '#10b981'
    },
    {
      icon: <Cpu size={32} />,
      title: 'GPU Accelerated',
      description: 'Powered by Ollama and Mistral 7B, utilizing your RTX GPU for fast AI generation.',
      color: '#6366f1'
    },
    {
      icon: <Globe size={32} />,
      title: 'Fully Offline',
      description: 'Works without internet. No API keys, no subscriptions, no external dependencies.',
      color: '#0ea5e9'
    },
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'Generate 5-50 MCQs in seconds with local AI processing on your hardware.',
      color: '#f59e0b'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Your PDF',
      description: 'Drag and drop or click to select any PDF document from your computer.',
      icon: <Upload size={24} />
    },
    {
      number: '02',
      title: 'Select Question Count',
      description: 'Use the +/− buttons to choose between 1-50 multiple choice questions.',
      icon: <Sparkles size={24} />
    },
    {
      number: '03',
      title: 'Generate MCQs',
      description: 'Click the generate button and let the AI analyze your PDF content.',
      icon: <Zap size={24} />
    },
    {
      number: '04',
      title: 'Download Results',
      description: 'Export your MCQs as TXT or PDF format for easy sharing and printing.',
      icon: <Download size={24} />
    }
  ];

  const useCases = [
    'Teachers creating exam questions from textbooks',
    'Students testing their understanding of course materials',
    'Corporate trainers developing assessment tests',
    'Content creators making quiz content',
    'Researchers generating study materials',
    'Educators preparing homework assignments'
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>100% Offline AI</span>
        </div>
        <h1 className="about-title">
          Transform Any PDF into
          <span className="gradient-text"> Smart MCQs</span>
        </h1>
        <p className="about-subtitle">
          Powered by local AI, your data stays private while generating high-quality 
          multiple choice questions in seconds.
        </p>
        <Link to="/" className="cta-button">
          Try it Now
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Our Generator?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Generate professional MCQs in 4 simple steps
        </p>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases-section">
        <h2 className="section-title">Perfect For</h2>
        <div className="use-cases-grid">
          {useCases.map((useCase, index) => (
            <div key={index} className="use-case-item">
              <CheckCircle2 size={20} />
              <span>{useCase}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-section">
        <h2 className="section-title">Powered By</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <div className="tech-logo">⚛️</div>
            <span>React 18</span>
          </div>
          <div className="tech-item">
            <div className="tech-logo">🤖</div>
            <span>Ollama</span>
          </div>
          <div className="tech-item">
            <div className="tech-logo">✨</div>
            <span>Mistral 7B</span>
          </div>
          <div className="tech-item">
            <div className="tech-logo">⚡</div>
            <span>Node.js</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Generate MCQs?</h2>
          <p>Start creating professional multiple choice questions from your PDFs today</p>
          <Link to="/" className="cta-button-large">
            Get Started Free
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
