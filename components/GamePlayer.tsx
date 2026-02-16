
import React from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col grayscale-0">
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="font-bold text-lg text-white leading-none">{game.title}</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{game.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.open(game.embedUrl, '_blank')}
            className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors border border-slate-700"
            title="Fixes 'Refused to Connect' errors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
            Hyper-Jump
          </button>
          <button 
            onClick={() => {
              const elem = document.getElementById('game-iframe');
              if (elem?.requestFullscreen) {
                elem.requestFullscreen();
              }
            }}
            className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors border border-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
            Fullscreen
          </button>
          <button 
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest py-2.5 px-6 rounded-lg shadow-lg transition-colors"
          >
            EXIT
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-[#121212] relative flex items-center justify-center overflow-auto p-4">
        <div className="w-full max-w-[1080px] aspect-[1080/720] shadow-2xl relative">
          <iframe 
            id="game-iframe"
            src={game.embedUrl}
            className="w-full h-full border-0 rounded-lg shadow-2xl"
            title={game.title}
            allow="autoplay; fullscreen; keyboard"
            sandbox="allow-scripts allow-same-origin allow-popups"
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
