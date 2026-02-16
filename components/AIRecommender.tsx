
import React, { useState } from 'react';
import { getAIRecommendation } from '../services/geminiService';
import { GAMES } from '../constants';

const AIRecommender: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);
    const result = await getAIRecommendation(input, GAMES);
    setResponse(result);
    setLoading(false);
    setInput('');
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-6 shadow-2xl mb-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
      </div>
      
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Echo Intel</h2>
          <p className="text-indigo-300/60 text-sm">Targeting recommendations in Sector 7...</p>
        </div>
      </div>

      <form onSubmit={handleAsk} className="flex gap-2 relative z-10">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scan for game types..."
          className="flex-1 bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
        />
        <button 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          {loading ? (
             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : 'Ping'}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-indigo-950/30 border border-indigo-500/10 rounded-xl animate-in fade-in slide-in-from-top-2 relative z-10">
          <p className="text-indigo-200 leading-relaxed italic text-sm">
            <span className="text-indigo-500 font-bold mr-2">&gt;</span>{response}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIRecommender;
