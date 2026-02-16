
import React from 'react';
import { AppSettings, AppTheme } from '../types';

interface SettingsModalProps {
  settings: AppSettings;
  onUpdate: (settings: AppSettings) => void;
  onClose: () => void;
}

const CLOAK_PRESETS = [
  { name: 'Sneak It (Default)', title: 'Sneak It | Galactic Games', icon: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png', type: 'scientific' as const },
  { name: 'Josiah Allen Junior High', title: 'Josiah Allen Junior High - Student Resource Center', icon: 'https://cdn-icons-png.flaticon.com/512/167/167707.png', type: 'josiah' as const },
  { name: 'Google Drive', title: 'My Drive - Google Drive', icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png', type: 'scientific' as const },
  { name: 'Google Classroom', title: 'Classes', icon: 'https://www.gstatic.com/classroom/favicon.png', type: 'scientific' as const },
  { name: 'Canvas', title: 'Dashboard', icon: 'https://du11hjcvhe62v.cloudfront.net/favicon-32x32.png', type: 'scientific' as const },
];

const THEMES: { id: AppTheme; name: string; class: string }[] = [
  { id: 'default', name: 'Galactic Nebula', class: 'from-indigo-500 to-purple-600' },
  { id: 'monochrome', name: 'Black & White', class: 'from-slate-400 to-slate-900 grayscale' },
  { id: 'midnight', name: 'Deep Midnight', class: 'from-black to-slate-900' },
];

const SettingsModal: React.FC<SettingsModalProps> = ({ settings, onUpdate, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          System Configuration
        </h2>

        <div className="space-y-8">
          {/* Theme Selection */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-indigo-400 mb-3">Interface Theme</label>
            <div className="grid grid-cols-1 gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onUpdate({ ...settings, theme: theme.id })}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    settings.theme === theme.id 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-medium">{theme.name}</span>
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.class} border border-white/20`} />
                </button>
              ))}
            </div>
          </div>

          {/* Cloak Presets */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-indigo-400 mb-3">Cloak Signature</label>
            <div className="grid grid-cols-1 gap-2">
              {CLOAK_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => onUpdate({ ...settings, tabTitle: preset.title, tabIcon: preset.icon, cloakType: preset.type })}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    settings.tabTitle === preset.title 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <img src={preset.icon} alt="" className="w-5 h-5 object-contain" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{preset.name}</span>
                    <span className="text-[9px] opacity-50 truncate max-w-[200px]">{preset.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button 
              onClick={onClose}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
            >
              Sync & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
