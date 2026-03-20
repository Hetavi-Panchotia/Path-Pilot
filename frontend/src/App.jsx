import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Upload from './pages/Upload';
import Results from './pages/Results';
import Chatbot from './components/Chatbot';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-dark-900 text-gray-200 transition-colors duration-300 relative">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/results" element={<Results />} />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
