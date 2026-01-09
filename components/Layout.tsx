
import React, { useState } from 'react';
import { 
  Activity, Shield, Users, MessageSquare, Settings, Eye, Zap, 
  BookOpen, Share2, Grid, Mic, Vote, FileText, AlertOctagon, 
  Menu, X, Search, History, PlusSquare
} from 'lucide-react';

interface SidebarItemProps {
  id: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SynthesisSeal = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="opacity-20" />
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="4" />
    <path d="M100 20 L120 60 L80 60 Z" fill="currentColor" />
    <path d="M100 180 L120 140 L80 140 Z" fill="currentColor" />
    <path d="M160 100 L120 120 L120 80 Z" fill="currentColor" />
    <path d="M40 100 L80 120 L80 80 Z" fill="currentColor" />
    <path d="M140 140 L160 160 M60 60 L40 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const SidebarItem: React.FC<SidebarItemProps> = ({ id, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
      isActive
        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.05)]'
        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
    }`}
  >
    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400 text-glow' : ''}`} />
    <span className={`font-bold text-[11px] uppercase tracking-widest ${isActive ? 'text-cyan-100' : ''}`}>{label}</span>
  </button>
);

interface LayoutProps {
  activeView: string;
  setActiveView: (view: string) => void;
  systemStatus: any;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ activeView, setActiveView, systemStatus, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navGroups = [
    {
      title: "Control",
      items: [
        { id: 'dashboard', icon: Activity, label: 'Dashboard' },
        { id: 'agents', icon: Users, label: 'Swarm' },
        { id: 'chat', icon: MessageSquare, label: 'Interface' },
        { id: 'voice', icon: Mic, label: 'Voice' },
      ]
    },
    {
      title: "Intelligence",
      items: [
        { id: 'consensus', icon: Vote, label: 'Consensus' },
        { id: 'training', icon: BookOpen, label: 'Training' },
        { id: 'briefing', icon: FileText, label: 'Briefing' },
        { id: 'grounding', icon: Search, label: 'Grounding' },
      ]
    },
    {
      title: "Analysis",
      items: [
        { id: 'graph', icon: Share2, label: 'Knowledge' },
        { id: 'matrix', icon: Grid, label: 'Matrix' },
        { id: 'consciousness', icon: Eye, label: 'Sentience' },
        { id: 'stresstest', icon: AlertOctagon, label: 'Stress' },
      ]
    },
    {
      title: "Settings",
      items: [
        { id: 'sigma', icon: Shield, label: 'Σ-Matrix' },
        { id: 'settings', icon: Settings, label: 'Core' },
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-100 scanline">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 border-r border-white/5 bg-[#020617]/80 backdrop-blur-3xl flex flex-col shrink-0 transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 glass-panel rounded-xl flex items-center justify-center text-cyan-400 transition-all group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <SynthesisSeal className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-black text-sm tracking-tighter text-glow uppercase leading-none">SYNTH3SIS</h1>
                <p className="text-[7px] uppercase tracking-[0.4em] text-cyan-500/80 font-bold mt-1">MRSC-X Core</p>
              </div>
            </div>
            <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <h3 className="px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-3">{group.title}</h3>
                {group.items.map(item => (
                  <SidebarItem 
                    key={item.id} 
                    id={item.id} 
                    icon={item.icon} 
                    label={item.label} 
                    isActive={activeView === item.id} 
                    onClick={() => { setActiveView(item.id); setIsSidebarOpen(false); }} 
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Integrity</span>
                <span className="text-[9px] text-cyan-400 font-black uppercase">94%</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full w-[94%] shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest px-2">
              <Zap className="w-3 h-3 text-cyan-500 animate-pulse" />
              Build V-3.1-MRSC-X
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-[#020617]/40 backdrop-blur-md flex items-center justify-between px-6 lg:px-10 z-30 shrink-0">
          <div className="flex items-center gap-6">
             <button className="lg:hidden p-2 -ml-2 text-slate-500" onClick={() => setIsSidebarOpen(true)}>
               <Menu className="w-6 h-6" />
             </button>
             <div className="hidden sm:flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Neural Bridge Enabled</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="text-[9px] font-mono text-cyan-500/80 font-bold uppercase tracking-widest">
                   SYNC_LATENCY: {systemStatus.latency}ms
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-cyan-400 transition-all relative group">
               <History className="w-4 h-4" />
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]" />
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500/20 transition-all group">
               <PlusSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> 
               Deploy Agent
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center text-[10px] font-black text-cyan-400 shadow-xl">
              OP
            </div>
          </div>
        </header>

        {/* Scrollable View */}
        <main className="flex-1 overflow-y-auto bg-[#020617] p-6 lg:p-12 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
