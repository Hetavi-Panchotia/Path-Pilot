import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Target, Briefcase } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Landing = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-500/20 rounded-full blur-[120px]" />
      
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-10 glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <Rocket className="text-primary-500 w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">Adaptive AI</span>
        </div>
        <button onClick={toggleTheme} className="px-4 py-2 rounded-full glass-card text-sm">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main className="z-10 text-center max-w-4xl px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-medium text-primary-400 mb-8 border border-primary-500/30">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            V1.0 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Level up your career with <br />
            <span className="text-gradient">AI-driven</span> learning paths.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your Resume and target Job Description. Our engine analyzes the gap and generates a personalized roadmap to get you hired.
          </p>

          <Link to="/upload">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all border border-white/10"
            >
              Start Analysis Now
            </motion.button>
          </Link>
        </motion.div>

        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { icon: <Target className="text-accent-500" />, title: 'Skill Gap Analysis', desc: 'Precise extraction of missing and weak skills.' },
            { icon: <Briefcase className="text-primary-400" />, title: 'Personalized Roadmap', desc: 'Structured learning plan with specific resources.' },
            { icon: <Rocket className="text-emerald-400" />, title: 'Interactive Progress', desc: 'Track your growth dynamically towards the job.' }
          ].map((feat, i) => (
            <div key={i} className="glass-card p-6 text-left flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                {feat.icon}
              </div>
              <h3 className="font-semibold text-xl">{feat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Landing;
