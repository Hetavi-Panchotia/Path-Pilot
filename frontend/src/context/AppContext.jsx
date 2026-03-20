import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('roadmap_progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('roadmap_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const updateProgress = (stepId, isCompleted) => {
    setProgress(prev => ({
      ...prev,
      [stepId]: isCompleted
    }));
  };

  const getOverallProgress = () => {
    if (!roadmap || !roadmap.roadmap || roadmap.roadmap.length === 0) return 0;
    const totalSteps = roadmap.roadmap.length;
    const completedSteps = Object.values(progress).filter(Boolean).length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      analysisResult,
      setAnalysisResult,
      roadmap,
      setRoadmap,
      progress,
      updateProgress,
      getOverallProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};
