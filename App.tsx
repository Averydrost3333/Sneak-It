
import React, { useState, useMemo, useEffect } from 'react';
import { GAMES, CATEGORIES } from './constants';
import { Game, Category, AppView, AppSettings } from './types';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import AIRecommender from './components/AIRecommender';
import WebExplorer from './components/WebExplorer';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('games');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('sneak-it-settings-v2');
    return saved ? JSON.parse(saved) : {
      tabTitle: 'Sneak It | Galactic Games',
      tabIcon: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png',
      theme: 'default',
      cloakType: 'scientific'
    };
  });

  useEffect(() => {
    document.title = settings.tabTitle;
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = settings.tabIcon;
    localStorage.setItem('sneak-it-settings-v2', JSON.stringify(settings));

    // Handle body classes for themes
    if (settings.theme === 'monochrome') {
      document.body.classList.add('grayscale');
    } else {
      document.body.classList.remove('grayscale');
    }
    
    if (settings.theme === 'midnight') {
      document.body.style.background = '#000000';
    } else {
      document.body.style.background = ''; // Use CSS default
    }
  }, [settings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.altKey) {
        setIsStealthMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (isStealthMode) {
    if (settings.cloakType === 'josiah') {
      return (
        <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans p-0 m-0 grayscale-0">
          <nav className="bg-[#003366] text-white p-4 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-3">
               <img src="https://cdn-icons-png.flaticon.com/512/167/167707.png" className="w-8 h-8 invert" alt="Logo" />
               <h1 className="text-xl font-bold">Josiah Allen Junior High</h1>
            </div>
            <div className="flex gap-4 text-sm font-medium">
              <span>Home</span>
              <span>Academics</span>
              <span>Library</span>
              <span>Portal</span>
            </div>
          </nav>
          <div className="max-w-5xl mx-auto p-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
               <h2 className="text-2xl font-bold text-[#003366] mb-4">Student Resource Center</h2>
               <div className="grid grid-cols-3 gap-6 mb-12">
                 {['Student Handbook', 'Lunch Menu', 'Academic Calendar'].map(item => (
                   <div key={item} className="p-6 bg-slate-50 border border-slate-200 rounded-lg text-center hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-[#003366]/10 text-[#003366] rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
                      </div>
                      <span className="font-bold text-sm">{item}</span>
                   </div>
                 ))}
               </div>
               <h3 className="text-lg font-bold mb-3 border-b pb-2">District Announcements</h3>
               <p className="text-sm text-slate-600 mb-4 italic">Updated: Monday, October 21st, 2024</p>
               <ul className="space-y-3 text-sm">
                 <li>• Winter Break schedule has been finalized. Please check your emails.</li>
                 <li>• Science Fair registrations are now open for 7th and 8th graders.</li>
                 <li>• The computer lab in Wing B is currently under maintenance.</li>
               </ul>
            </div>
          </div>
          <button 
            onClick={() => setIsStealthMode(false)}
            className="fixed bottom-4 right-4 text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
          >
            System Override
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 p-8 font-serif grayscale-0">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Quantum Cryptography and the Future of Network Security</h1>
          <p className="text-slate-700 leading-relaxed mb-6">
            In an era defined by rapid computational advancement, the traditional paradigms of asymmetric encryption face unprecedented challenges...
          </p>
          <div className="aspect-[16/9] w-full bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 italic mb-6 border border-slate-300">
             Figure 1.2: Entanglement Distribution over Fiber Optic Arrays
          </div>
          <button 
            onClick={() => setIsStealthMode(false)}
            className="fixed bottom-4 right-4 text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
          >
            Terminal Exit
          </button>
        </div>
      </div>
    );
  }

  const themeClasses = useMemo(() => {
    switch(settings.theme) {
      case 'monochrome': return 'grayscale';
      case 'midnight': return 'bg-black text-white';
      default: return '';
    }
  }, [settings.theme]);

  return (
    <div className={`min-h-screen flex flex-col selection:bg-indigo-500/30 transition-all ${themeClasses}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b border-indigo-500/10 px-6 py-4 ${settings.theme === 'midnight' ? 'bg-black/60' : 'bg-slate-950/60'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setView('games')}
              className={`w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group cursor-pointer ${settings.theme === 'monochrome' ? 'from-slate-400 to-slate-700' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12l10 5 10-5"/></svg>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">SNEAK <span className="text-indigo-400">IT</span></h1>
          </div>

          <div className="flex-1 max-w-md w-full relative">
            <input 
              type="text" 
              placeholder={view === 'games' ? "Search the nebula..." : "Portal locked..."}
              disabled={view === 'explorer'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-slate-900/50 border border-slate-700/50 rounded-full px-5 py-2.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-100 placeholder:text-slate-600 ${view === 'explorer' ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <svg className="absolute left-4 top-3 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
             <button 
               onClick={() => setView(view === 'games' ? 'explorer' : 'games')}
               className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
                 view === 'explorer' 
                 ? 'bg-indigo-600 border-indigo-500 text-white' 
                 : 'bg-slate-900/80 border-indigo-500/10 text-indigo-400 hover:bg-slate-800'
               }`}
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
               <span className="hidden sm:inline">Portal</span>
             </button>

             <button 
               onClick={() => setIsSettingsOpen(true)}
               className="bg-slate-900/80 hover:bg-slate-800 p-2.5 rounded-xl text-slate-400 border border-slate-800 transition-all"
               title="System Settings"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
             </button>

             <button 
               onClick={() => setIsStealthMode(true)}
               className="bg-slate-900/80 hover:bg-slate-800 p-2.5 rounded-xl text-indigo-400 border border-indigo-500/10 transition-all group"
               title="Stealth Mode (Alt+P)"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
             </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {view === 'games' ? (
          <>
            <AIRecommender />
            <div className="flex gap-2 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as Category)}
                  className={`whitespace-nowrap px-8 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                    selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 border border-indigo-400/50' 
                    : 'bg-slate-900/40 text-slate-500 border border-slate-800 hover:border-indigo-500/30 hover:text-indigo-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <section className="mb-20 min-h-[40vh]">
              {filteredGames.length > 0 ? (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onPlay={(g) => setActiveGame(g)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-slate-900/20 backdrop-blur-sm rounded-[3rem] border border-dashed border-indigo-500/10 w-full max-w-2xl px-8 mx-auto">
                  <h3 className="text-3xl font-black text-white mb-3">Hangar Empty</h3>
                  <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                    Recalibrating sensors... try a different search or category.
                  </p>
                </div>
              )}
            </section>
          </>
        ) : (
          <WebExplorer />
        )}
      </main>

      {/* Overlays */}
      {activeGame && (
        <GamePlayer 
          game={activeGame} 
          onClose={() => setActiveGame(null)} 
        />
      )}

      {isSettingsOpen && (
        <SettingsModal 
          settings={settings}
          onUpdate={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
