
import React, { useState } from 'react';

const PUBLIC_RELAYS = [
  { name: 'Node-Alpha (Rammerhead)', url: 'https://browser.rammerhead.org/' },
  { name: 'Node-Beta (Ultraviolet)', url: 'https://uv.student-guide.workers.dev/' },
  { name: 'Node-Gamma (Holy Unblocker)', url: 'https://hu.student-guide.workers.dev/' },
];

const WebExplorer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    let target = url.trim();
    if (!target.includes('.')) {
      target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
    } else if (!target.startsWith('http')) {
      target = `https://${target}`;
    }

    // Attempting a more compatible proxy wrapper
    // Note: Most modern sites block this via CSP/X-Frame-Options
    const proxyUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(target)}`;
    setActiveUrl(proxyUrl);
    setShowDiagnostics(true);
  };

  return (
    <div className="w-full flex flex-col min-h-[80vh] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search/Address Bar */}
      <div className="bg-slate-900 border border-indigo-500/20 rounded-t-3xl p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
           <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
           <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        </div>
        
        <form onSubmit={handleLaunch} className="flex-1 flex gap-2 w-full">
           <div className="flex-1 relative group">
             <input 
               type="text" 
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               placeholder="Enter URL or search term..."
               className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
             />
             <div className="absolute right-3 top-2.5 text-[9px] text-slate-600 font-bold uppercase tracking-widest hidden md:block group-focus-within:text-indigo-500 transition-colors">Relay Active</div>
           </div>
           <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-6 rounded-xl transition-all whitespace-nowrap shadow-lg shadow-indigo-600/20 active:scale-95">
             Portal Open
           </button>
        </form>
        
        {activeUrl && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.open(activeUrl, '_blank')}
              className="p-2 text-slate-500 hover:text-indigo-400 transition-colors"
              title="Hyper-Jump (Open in New Tab)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </button>
            <button 
              onClick={() => { setActiveUrl(null); setShowDiagnostics(false); }}
              className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4">
        {/* Main Portal View */}
        <div className="flex-[3] bg-slate-950 border-x border-b border-indigo-500/10 rounded-b-3xl overflow-hidden relative min-h-[500px]">
          {!activeUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent">
              <div className="w-24 h-24 bg-indigo-500/5 rounded-full flex items-center justify-center mb-6 border border-indigo-500/10 animate-pulse">
                <svg className="text-indigo-500/40" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">DEEP SPACE PORTAL</h3>
              <p className="text-slate-500 max-w-sm text-sm leading-relaxed mb-8 font-medium">
                Enter a destination to view it through our stealth relay.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
                {['google.com', 'wikipedia.org', 'bing.com'].map(site => (
                  <button 
                    key={site}
                    onClick={() => { setUrl(site); handleLaunch({ preventDefault: () => {} } as any); }}
                    className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
                  >
                    Quick-Link: {site}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <iframe 
              src={activeUrl}
              className="w-full h-full border-0"
              title="Deep Space Explorer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
        </div>

        {/* Diagnostics & Relay Station */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-slate-900/40 border border-indigo-500/10 rounded-3xl p-6 backdrop-blur-md">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
              Relay Diagnostics
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <span className="text-rose-500 font-bold">ERROR: "Refused to Connect"</span><br/>
                  If you see this, the destination site has high-level security (X-Frame-Options) that blocks embedding. 
                </p>
                <button 
                  onClick={() => activeUrl && window.open(activeUrl, '_blank')}
                  className="mt-3 w-full bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-[10px] font-bold py-2 rounded-lg border border-indigo-500/20 transition-all"
                >
                  Hyper-Jump (New Tab)
                </button>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-3">Public Deep Space Relays</p>
                <div className="space-y-2">
                  {PUBLIC_RELAYS.map(relay => (
                    <button
                      key={relay.name}
                      onClick={() => window.open(relay.url, '_blank')}
                      className="w-full flex items-center justify-between p-3 bg-slate-950 border border-slate-800 hover:border-indigo-500/30 rounded-xl transition-all group"
                    >
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{relay.name}</span>
                      <svg className="text-slate-700 group-hover:text-indigo-500 transition-colors" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-950/10 border border-indigo-500/5 rounded-3xl p-6 flex-1 italic text-xs text-indigo-400/50 flex items-center justify-center text-center">
            "Echo: Standard sector relays are often blocked by the Intergalactic Council. Use Node-Alpha for best results on encrypted sectors."
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebExplorer;
