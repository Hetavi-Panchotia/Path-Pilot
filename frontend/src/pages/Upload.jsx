import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Upload = () => {
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAnalysisResult, setRoadmap } = useContext(AppContext);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jdText.trim()) return alert("Please provide both Resume content and Job Description");
    
    setLoading(true);
    try {
      // Single API call: ensure /api suffix with hardcoded fallback
      let apiUrl = import.meta.env.VITE_API_URL || 'https://path-pilot-7p4c.onrender.com/api';
      apiUrl = apiUrl.replace(/\/$/, ''); // Remove trailing slash
      
      // If it doesn't end with /api, append it
      if (!apiUrl.endsWith('/api')) {
        apiUrl += '/api';
      }

      const res = await axios.post(`${apiUrl}/analyze`, {
        resumeText,
        jdText
      });




      
      const analysisData = res.data;
      setAnalysisResult(analysisData);
      setRoadmap({ roadmap: analysisData.roadmap });
      
      navigate('/results');
      
    } catch (error) {
      console.error(error);
      if (error.message === 'Network Error') {
        alert('Network Error: Cannot connect to the backend server. Please check your internet connection.');
      } else if (error.response) {
        alert(error.response.data?.error || `Server Error: ${error.response.status}. Please check your backend deployment.`);
      } else {
        alert('An error occurred during analysis. Please check your internet connection and backend status.');
      }


    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex flex-col items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-900/20 to-transparent -z-10" />

      <motion.div className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Analyze your profile</h1>
          <p className="text-gray-400">Paste your Resume content and the Job Description you're aiming for.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Input Slider */}
          <div className="glass-card p-6 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-4 text-gray-300">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-400" />
                <h3 className="font-medium text-white">Resume Content</h3>
              </div>
              <span className="text-xs text-gray-500">{resumeText.length} chars</span>
            </div>
            <textarea 
              className="flex-1 w-full bg-dark-900/50 border border-white/5 rounded-xl p-4 text-sm focus:outline-none focus:border-primary-500/50 resize-none transition-colors"
              placeholder="Paste your resume content here (skills, experience, projects...)"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          {/* JD Input */}
          <div className="glass-card p-6 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-4 text-gray-300">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-500" />
                <h3 className="font-medium text-white">Job Description</h3>
              </div>
              <span className="text-xs text-gray-500">{jdText.length} chars</span>
            </div>
            <textarea 
              className="flex-1 w-full bg-dark-900/50 border border-white/5 rounded-xl p-4 text-sm focus:outline-none focus:border-accent-500/50 resize-none transition-colors"
              placeholder="Paste the job description or role requirements here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyze}
            disabled={!resumeText.trim() || !jdText.trim() || loading}
            className="flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 disabled:from-dark-700 disabled:to-dark-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold text-lg shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all border border-transparent disabled:border-white/5"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing Skills...
              </>
            ) : (
              <>
                Analyze Gap & Get Roadmap
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
