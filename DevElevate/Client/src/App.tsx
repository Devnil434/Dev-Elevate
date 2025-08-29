import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const SimpleLandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            DevElevate
          </h1>
          <p className="text-xl text-gray-300">
            AI-Powered Education & Career Platform
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Learn</h3>
            <p className="text-gray-300">Master DSA, MERN, AI/ML with personalized learning paths</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Practice</h3>
            <p className="text-gray-300">Code challenges, mock interviews, and real projects</p>
          </div>
          <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 p-6 rounded-lg border border-cyan-500/30">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Succeed</h3>
            <p className="text-gray-300">Get placed in top companies with our guidance</p>
          </div>
        </div>
        
        <div className="text-center">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimpleLandingPage />} />
        <Route path="*" element={<SimpleLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
