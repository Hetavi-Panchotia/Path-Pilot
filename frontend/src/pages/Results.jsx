import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Circle, AlertTriangle, ArrowLeft } from 'lucide-react';

const Results = () => {
  const { analysisResult, roadmap, progress, updateProgress, getOverallProgress } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!analysisResult || !roadmap) {
      navigate('/upload');
    }
  }, [analysisResult, roadmap, navigate]);

  if (!analysisResult || !roadmap) return null;

  const currentPercent = getOverallProgress();
  const isComplete = currentPercent === 100;

  // Chart data formatting
  const chartData = [
    { subject: 'Matches', A: analysisResult.matchedSkills?.length || 0, fullMark: 15 },
    { subject: 'Missing', A: analysisResult.missingSkills?.length || 0, fullMark: 15 },
    { subject: 'Weak', A: analysisResult.weakSkills?.length || 0, fullMark: 15 },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      {isComplete && <Confetti recycle={false} numberOfPieces={500} />}

      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-dark-800 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-400 to-accent-500"
          initial={{ width: 0 }}
          animate={{ width: `${currentPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-16">
        <button onClick={() => navigate('/upload')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Start Over
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Score & Analysis */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div className="glass-card p-8 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="text-xl font-semibold mb-6">Job Readiness Score</h2>
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                  <motion.circle 
                    cx="80" cy="80" r="70" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    fill="none" 
                    className="text-primary-500"
                    strokeDasharray="440"
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * analysisResult.readinessScore) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-4xl font-bold">{analysisResult.readinessScore}%</div>
              </div>
            </motion.div>

            <motion.div className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-400 border-b border-white/10 pb-2">
                <CheckCircle2 className="w-4 h-4" /> Matched Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.matchedSkills?.map(s => (
                  <span key={s} className="px-3 py-1 rounded-md bg-green-500/10 text-green-300 text-xs font-medium border border-green-500/20">{s}</span>
                ))}
              </div>

              <h3 className="font-semibold mb-4 mt-6 flex items-center gap-2 text-red-400 border-b border-white/10 pb-2">
                <AlertTriangle className="w-4 h-4" /> Missing Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.missingSkills?.map(s => (
                  <span key={s} className="px-3 py-1 rounded-md bg-red-500/10 text-red-300 text-xs font-medium border border-red-500/20">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Roadmap */}
          <div className="lg:col-span-2">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Your Learning Roadmap
            </motion.h2>

            <div className="space-y-4">
              {roadmap.roadmap?.map((step, idx) => {
                const isStepDone = !!progress[step.id];
                return (
                  <motion.div 
                    key={step.id}
                    className={`glass-card p-6 relative overflow-hidden ${isStepDone ? 'border-primary-500/50 opacity-70' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                  >
                    {isStepDone && <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full" />}
                    
                    <div className="flex items-start gap-4">
                      <button onClick={() => updateProgress(step.id, !isStepDone)} className="mt-1 flex-shrink-0 focus:outline-none">
                        {isStepDone ? <CheckCircle2 className="w-6 h-6 text-primary-400" /> : <Circle className="w-6 h-6 text-gray-500 hover:text-primary-300 transition-colors" />}
                      </button>
                      
                      <div className="w-full">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`text-xl font-bold ${isStepDone ? 'line-through text-gray-400' : 'text-white'}`}>{step.title}</h4>
                          <span className="text-xs font-medium px-2 py-1 rounded bg-dark-700 text-gray-300 whitespace-nowrap">{step.duration}</span>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-4">{step.skill} • Difficulty: {step.difficulty}</p>
                        
                        <div className="bg-dark-900/50 rounded-lg p-4 border border-white/5 space-y-3">
                          {step.resources?.map((res, i) => (
                            <div key={i} className="flex flex-col gap-1">
                              <a href={res.url} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 hover:underline text-sm font-medium">
                                🔗 {res.name}
                              </a>
                            </div>
                          ))}
                          {step.miniProject && (
                            <div className="mt-3 pt-3 border-t border-white/10 text-sm">
                              <span className="text-accent-500 font-semibold text-xs uppercase tracking-wider">Mini Project</span>
                              <p className="text-gray-300 mt-1">{step.miniProject}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Results;
