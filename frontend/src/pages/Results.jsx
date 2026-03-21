import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { CheckCircle2, Circle, AlertTriangle, ArrowLeft, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const Results = () => {
  const { analysisResult, roadmap, progress, updateProgress, getOverallProgress } = useContext(AppContext);
  const navigate = useNavigate();
  const [expandedSteps, setExpandedSteps] = useState({});

  useEffect(() => {
    if (!analysisResult || !roadmap) {
      navigate('/upload');
    }
  }, [analysisResult, roadmap, navigate]);

  if (!analysisResult || !roadmap) return null;

  const readinessScore = analysisResult.readinessScore || 0;
  
  // Determine color based on score
  let scoreColor = 'bg-red-500';
  let scoreText = 'text-red-500';
  if (readinessScore >= 70) {
    scoreColor = 'bg-green-500';
    scoreText = 'text-green-500';
  } else if (readinessScore >= 40) {
    scoreColor = 'bg-yellow-500';
    scoreText = 'text-yellow-500';
  }

  const toggleExpand = (id) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isComplete = getOverallProgress() === 100 && roadmap.roadmap?.length > 0;

  return (
    <div className="min-h-screen pb-20 relative">
      {isComplete && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="max-w-6xl mx-auto px-4 pt-24">
        <button onClick={() => navigate('/upload')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Start Over
        </button>

        {/* PROGRESS SECTION */}
        <motion.div 
          className="glass-card p-8 mb-8 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-200">Job Readiness Score</h2>
          <div className="text-4xl font-bold mb-6 text-white">
            You are <span className={scoreText}>{readinessScore}%</span> ready for this role
          </div>
          
          <div className="w-full max-w-2xl h-6 bg-dark-700 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              className={`h-full ${scoreColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${readinessScore}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Score & Analysis */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Matched */}
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-400 border-b border-white/10 pb-2">
                <CheckCircle2 className="w-4 h-4" /> Matched Skills
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {(analysisResult.matchedSkills?.length > 0) ? analysisResult.matchedSkills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-md bg-green-500/10 text-green-300 text-xs font-medium border border-green-500/20">{s}</span>
                )) : <span className="text-gray-500 text-sm">None identified</span>}
              </div>

              {/* Weak */}
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-yellow-400 border-b border-white/10 pb-2">
                <AlertCircle className="w-4 h-4" /> Weak Skills
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {(analysisResult.weakSkills?.length > 0) ? analysisResult.weakSkills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-300 text-xs font-medium border border-yellow-500/20">{s}</span>
                )) : <span className="text-gray-500 text-sm">None identified</span>}
              </div>

              {/* Missing */}
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-400 border-b border-white/10 pb-2">
                <AlertTriangle className="w-4 h-4" /> Missing Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {(analysisResult.missingSkills?.length > 0) ? analysisResult.missingSkills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-md bg-red-500/10 text-red-300 text-xs font-medium border border-red-500/20">{s}</span>
                )) : <span className="text-gray-500 text-sm">None identified</span>}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Timeline Roadmap */}
          <div className="lg:col-span-2">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Your Learning Roadmap
            </motion.h2>

            <div className="relative pl-4 space-y-6 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {roadmap.roadmap?.map((step, idx) => {
                const stepId = step.id || idx;
                const isStepDone = !!progress[stepId];
                const isExpanded = !!expandedSteps[stepId];

                return (
                  <motion.div 
                    key={stepId}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                  >
                    {/* Timeline Node */}
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-dark-900 bg-dark-800 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${isStepDone ? 'border-primary-500 bg-primary-500' : 'border-white/20'}`}>
                      {isStepDone && <CheckCircle2 className="w-4 h-4 text-white p-0.5" />}
                    </div>

                    {/* Card container */}
                    <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-5 relative overflow-hidden transition-all duration-300 ${isStepDone ? 'border-primary-500/30' : ''}`}>
                      {isStepDone && <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full" />}
                      
                      <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs font-medium px-2 py-1 rounded bg-dark-700 text-gray-300 whitespace-nowrap mb-2 inline-block">
                              {step.duration || 'Flexible'}
                            </span>
                            <h4 className={`text-lg font-bold ${isStepDone ? 'text-gray-400 line-through' : 'text-white'}`}>{step.skill || step.title}</h4>
                          </div>
                          
                          <button onClick={() => updateProgress(stepId, !isStepDone)} className="flex-shrink-0 focus:outline-none p-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                            {isStepDone ? <CheckCircle2 className="w-5 h-5 text-primary-400" /> : <Circle className="w-5 h-5 text-gray-500" />}
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => toggleExpand(stepId)} 
                          className="flex items-center justify-center gap-1 mt-2 text-xs text-primary-400 hover:text-primary-300 py-2 border-t border-white/5 w-full transition-colors"
                        >
                          {isExpanded ? <>Hide Details <ChevronUp className="w-3 h-3" /></> : <>Show Details <ChevronDown className="w-3 h-3" /></>}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-dark-900/50 rounded-lg p-4 mt-3 border border-white/5 space-y-3 relative z-10">
                                {step.resources && step.resources.length > 0 ? (
                                  <div className="space-y-2">
                                    <h5 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Learning Resources</h5>
                                    {step.resources.map((res, i) => {
                                      const resName = typeof res === 'string' ? res : res.name;
                                      const resUrl = typeof res === 'string' ? null : res.url;
                                      return (
                                        <div key={i}>
                                            {resUrl ? (
                                              <a href={resUrl} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 hover:underline text-sm font-medium">
                                                🔗 {resName}
                                              </a>
                                            ) : (
                                              <span className="text-gray-300 text-sm font-medium">📚 {resName}</span>
                                            )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : null}

                                {step.project || step.miniProject ? (
                                  <div className="mt-3 pt-3 border-t border-white/10 text-sm">
                                    <span className="text-accent-500 font-semibold text-xs uppercase tracking-wider">Mini Project</span>
                                    <p className="text-gray-300 mt-1">{step.project || step.miniProject}</p>
                                  </div>
                                ) : null}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Results;
