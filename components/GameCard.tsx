
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div 
      className="group bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer transform hover:-translate-y-1"
      onClick={() => onPlay(game)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {game.isPopular && (
          <span className="absolute top-2 left-2 bg-rose-600 text-xs font-bold px-2 py-1 rounded-md text-white">
            HOT
          </span>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            PLAY NOW
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors">
            {game.title}
          </h3>
          <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-400 uppercase tracking-wider font-semibold">
            {game.category}
          </span>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
