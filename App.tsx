
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
    const saved = localStorage.getItem('sneak-it-settings-v3');
    return saved ? JSON.parse(saved) : {
      tabTitle: 'Sneak It | Galactic Games',
      tabIcon: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png',
      theme: 'monochrome', // Start in Black and White
      cloakType: 'josiah'
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
    localStorage.setItem('sneak-it-settings-v3', JSON.stringify(settings));

    // Handle theme classes
    if (settings.theme === 'monochrome') {
      document.body.classList.add('grayscale');
    } else {
      document.body.classList.remove('grayscale');
    }
    
    if (settings.theme === 'midnight') {
      document.body.style.background = '#000000';
    } else {
      document.body.style.background = ''; 
    }
  }, [settings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Panic button: Alt+P
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

  // Stealth / Cloak Mode
  if (isStealthMode) {
    if (settings.cloakType === 'josiah') {
      return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-0 m-0 grayscale-0 overflow-x-hidden">
          {/* Official Looking School Header */}
          <header className="bg-[#002d5a] text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                 <div className="bg-white p-2 rounded shadow-sm">
                   <img src="https://cdn-icons-png.flaticon.com/512/167/167707.png" className="w-10 h-10" alt="District Logo" />
                 </div>
                 <div>
                   <h1 className="text-xl font-bold uppercase tracking-tight">Josiah Allen Public School District</h1>
                   <p className="text-[10px] opacity-80 uppercase tracking-widest font-semibold">Excellence in Education Since 1954</p>
                 </div>
              </div>
              <nav className="flex gap-6 text-[11px] font-bold uppercase tracking-wider">
                <span className="hover:underline cursor-pointer">Families</span>
                <span className="hover:underline cursor-pointer">Staff</span>
                <span className="hover:underline cursor-pointer">Students</span>
                <span className="hover:underline cursor-pointer">Board</span>
              </nav>
            </div>
          </header>

          <main className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Tools */}
            <aside className="lg:col-span-1 space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 text-sm mb-3 border-b pb-2">Student Quicklinks</h3>
                <div className="space-y-2">
                  {['Infinite Campus', 'PowerSchool Mobile', 'Canvas Dashboard', 'Naviance Student', 'Library Catalog'].map(link => (
                    <div key={link} className="flex items-center gap-2 text-xs text-blue-700 hover:underline cursor-pointer">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                      {link}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-amber-900 text-sm mb-2 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Alerts
                </h3>
                <p className="text-[10px] text-amber-800">Delayed start policy updated for the 2024-25 winter season. Click for details.</p>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
               <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
                  <h2 className="text-3xl font-serif font-bold text-[#002d5a] mb-6">Welcome to the Student Resource Hub</h2>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Our mission at Josiah Allen is to provide a safe, inclusive, and challenging learning environment that encourages high expectations for success through development-appropriate instruction that allows for individual differences and learning styles.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-100 bg-slate-50 rounded-lg">
                       <h4 className="font-bold text-sm mb-2 text-[#002d5a]">Upcoming Events</h4>
                       <ul className="text-xs space-y-2">
                         <li className="flex justify-between border-b pb-1"><span>PTA Meeting</span> <span className="text-slate-400">Oct 24</span></li>
                         <li className="flex justify-between border-b pb-1"><span>Fall Break (No School)</span> <span className="text-slate-400">Oct 28</span></li>
                         <li className="flex justify-between"><span>Drama Club Performance</span> <span className="text-slate-400">Nov 02</span></li>
                       </ul>
                    </div>
                    <div className="p-4 border border-slate-100 bg-slate-50 rounded-lg">
                       <h4 className="font-bold text-sm mb-2 text-[#002d5a]">Cafeteria Today</h4>
                       <p className="text-xs italic text-slate-500">Main: Roasted Chicken w/ Steamed Broccoli</p>
                       <p className="text-xs italic text-slate-500 mt-1">Side: Apple slices or Garden Salad</p>
                    </div>
                  </div>
               </div>

               <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
                 <h3 className="font-bold text-blue-900 mb-2">Notice of Compliance</h3>
                 <p className="text-xs text-blue-800/80 italic">
                   All student activity on district networks is subject to the Acceptable Use Policy (AUP). By accessing this portal, you agree to comply with all regional guidelines regarding digital citizenship.
                 </p>
               </div>
            </div>
          </main>

          <footer className="bg-slate-100 border-t border-slate-200 mt-12 py-8 px-6 text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            &copy; 2024 Josiah Allen Public School District | All Rights Reserved | Privacy Policy
          </footer>

          <button 
            onClick={() => setIsStealthMode(false)}
            className="fixed bottom-4 right-4 text-[9px] text-slate-300 hover:text-slate-500 transition-colors"
          >
            SYS_EXIT
          </button>
        </div>
      );
    }

    // Default Academic Cloak
    return (
      <div className="min-h-screen bg-slate-50 p-8 font-serif grayscale-0 text-slate-900">
        <div className="max-w-3xl mx-auto">
          <nav className="border-b border-slate-200 pb-4 mb-8 flex justify-between items-center">
            <h2 className="text-lg font-bold italic">Journal of Computational Ethics</h2>
            <div className="text-xs uppercase font-bold tracking-widest opacity-50">Volume 42 | Issue 7</div>
          </nav>
          <h1 className="text-4xl font-black mb-6 leading-tight">Quantum Cryptography and the Future of Network Security in Higher Education</h1>
          <p className="text-slate-700 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
            In an era defined by rapid computational advancement, the traditional paradigms of asymmetric encryption face unprecedented challenges. The rise of Shor's algorithm and the theoretical promise of large-scale quantum computers necessitate a shift toward post-quantum protocols...
          </p>
          <div className="p-6 bg-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-500 italic mb-6 border border-slate-300">
             <div className="w-full h-40 bg-slate-300/50 mb-3 rounded flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
             </div>
             <span className="text-xs">Figure 1.2: Entanglement Distribution over Fiber Optic Arrays</span>
          </div>
          <p className="text-slate-700 leading-relaxed mb-6">
            Research into lattice-based cryptography suggests that we can maintain security through mathematical problems that remain hard for both classical and quantum systems. The implications for institutional infrastructure are vast, ranging from secure data storage to the very way students interact with local networks.
          </p>
          <button 
            onClick={() => setIsStealthMode(false)}
            className="fixed bottom-4 right-4 text-[10px] text-slate-300 hover:text-slate-400 transition-colors"
          >
            TERMINAL_EXIT
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
    <div className={`min-h-screen flex flex-col selection:bg-indigo-500/30 transition-all duration-300 ${themeClasses}`}>
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
                 : 'bg-slate-900/80 border-indigo-500/10 text-indigo-400 hover:bg-slate-800 shadow-lg'
               }`}
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
               <span className="hidden sm:inline">Portal</span>
             </button>

             <button 
               onClick={() => setIsSettingsOpen(true)}
               className="bg-slate-900/80 hover:bg-slate-800 p-2.5 rounded-xl text-slate-400 border border-slate-800 transition-all shadow-md"
               title="System Settings"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
             </button>

             <button 
               onClick={() => setIsStealthMode(true)}
               className="bg-slate-900/80 hover:bg-slate-800 p-2.5 rounded-xl text-indigo-400 border border-indigo-500/10 transition-all group shadow-md"
               title="Stealth Mode (Alt+P)"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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
