import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navigation from './components/Navigation';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import About from './pages/About';

function AppContent() {
  useSmoothScroll();
  
  return (
    <>
      <Navigation />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
