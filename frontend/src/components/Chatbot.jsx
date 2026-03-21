import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! I am your AI career coach. How can I help you with your roadmap?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { analysisResult, roadmap } = useContext(AppContext);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      // Chatbot call: ensure /api suffix with hardcoded fallback
      let apiUrl = import.meta.env.VITE_API_URL || 'https://path-pilot-7p4c.onrender.com/api';
      apiUrl = apiUrl.replace(/\/$/, ''); // Remove trailing slash
      
      // If it doesn't end with /api, append it
      if (!apiUrl.endsWith('/api')) {
        apiUrl += '/api';
      }

      const res = await axios.post(`${apiUrl}/chat`, {
        message: userMsg,
        context: { analysisResult, roadmap }
      });


      
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || 'Sorry, I encountered an error answering that.';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full shadow-2xl shadow-primary-500/30 flex items-center justify-center text-white z-50 hover:shadow-primary-500/50 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0 : 1 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-dark-800 border border-white/10 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-900/40">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none shadow-md shadow-primary-500/20' 
                      : 'bg-dark-700 text-gray-200 border border-white/5 rounded-tl-none shadow-md shadow-black/20'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-dark-700 text-gray-200 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-dark-800 border-t border-white/10">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-dark-900/50 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-primary-500/50 transition-colors"
                />
                <button 
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="p-3 bg-primary-600 rounded-xl text-white disabled:bg-dark-700 disabled:text-gray-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
