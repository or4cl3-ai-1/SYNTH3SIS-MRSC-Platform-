
import React, { useState } from 'react';
import { 
  Activity, Shield, Users, MessageSquare, Settings, Eye, Zap, 
  BookOpen, Share2, Grid, Mic, Vote, FileText, AlertOctagon, 
  Menu, X, Search, History, PlusSquare, Network
} from 'lucide-react';

interface SidebarItemProps {
  id: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SynthesisSealDesign = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 300 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="150" r="145" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="opacity-20" />
    <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="4" />
    <circle cx="150" cy="150" r="100" stroke="currentColor" strokeWidth="6" />
    <path d="M150 20 L180 80 L120 80 Z" fill="currentColor" />
    <path d="M150 280 L180 220 L120 220 Z" fill="currentColor" />
    <path d="M20 150 L80 180 L80 120 Z" fill="currentColor" />
    <path d="M280 150 L220 180 L220 120 Z" fill="currentColor" />
    <path d="M120 120 L180 180 M180 120 L120 180" stroke="currentColor" strokeWidth="8" strokeLinecap="square" />
  </svg>
);

const SidebarItem: React.FC<SidebarItemProps> = ({ id, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-400 ${
      isActive
        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.08)]'
        : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
    }`}
  >
    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400 text-glow' : ''}`} />
    <span className={`font-black text-[10px] uppercase tracking-[0.2em] ${isActive ? 'text-cyan-50' : ''}`}>{label}</span>
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

  // Fix: Move CoreSettings declaration before its usage in navGroups to avoid hoisting error
  const CoreSettings = Settings;

  const navGroups = [
    {
      title: "Control Center",
      items: [
        { id: 'dashboard', icon: Activity, label: 'Dashboard' },
        { id: 'swarm-chat', icon: Network, label: 'Swarm Hub' },
        { id: 'agents', icon: Users, label: 'Swarm Nodes' },
        { id: 'chat', icon: MessageSquare, label: 'Interface' },
        { id: 'voice', icon: Mic, label: 'Neural Voice' },
      ]
    },
    {
      title: "Intelligence",
      items: [
        { id: 'consensus', icon: Vote, label: 'Consensus' },
        { id: 'training', icon: BookOpen, label: 'Training' },
        { id: 'briefing', icon: FileText, label: 'Emergence' },
        { id: 'grounding', icon: Search, label: 'Grounding' },
      ]
    },
    {
      title: "Swarm Analysis",
      items: [
        { id: 'graph', icon: Share2, label: 'Knowledge' },
        { id: 'matrix', icon: Grid, label: 'Interaction' },
        { id: 'consciousness', icon: Eye, label: 'Sentience' },
        { id: 'stresstest', icon: AlertOctagon, label: 'Stress Test' },
      ]
    },
    {
      title: "Configuration",
      items: [
        { id: 'sigma', icon: Shield, label: 'Σ-Matrix' },
        { id: 'settings', icon: CoreSettings, iconType: Settings, label: 'Parameters' },
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-100 scanline select-none">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 border-r border-white/5 bg-[#020617]/90 backdrop-blur-3xl flex flex-col shrink-0 transition-all duration-600 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-7 flex flex-col h-full overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveView('dashboard')}>
              <div className="w-11 h-11 glass-panel rounded-2xl flex items-center justify-center text-cyan-400 transition-all group-hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] border-cyan-500/20">
                <SynthesisSealDesign className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-black text-base tracking-tighter text-glow uppercase leading-none text-white">SYNTH3SIS</h1>
                <p className="text-[7px] uppercase tracking-[0.5em] text-cyan-500/80 font-black mt-1.5">MRSC-X Engine</p>
              </div>
            </div>
            <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-10">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-3">
                <h3 className="px-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">{group.title}</h3>
                {group.items.map(item => (
                  <SidebarItem 
                    key={item.id} 
                    id={item.id} 
                    icon={item.iconType || item.icon} 
                    label={item.label} 
                    isActive={activeView === item.id} 
                    onClick={() => { setActiveView(item.id); setIsSidebarOpen(false); }} 
                  />
                ))}
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-white/5 space-y-5">
            <div className="p-5 rounded-3xl bg-cyan-500/5 border border-cyan-500/10">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Global Integrity</span>
                <span className="text-[9px] text-cyan-400 font-black uppercase">94%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-300 h-full w-[94%] shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-all duration-1000" />
              </div>
            </div>
            <div className="flex items-center gap-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] px-2 italic">
              <Zap className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
              Build MRSC-X_3.1.2_Stable
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-[#020617]/50 backdrop-blur-2xl flex items-center justify-between px-8 lg:px-12 z-50 shrink-0">
          <div className="flex items-center gap-8">
             <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-cyan-400 transition-colors" onClick={() => setIsSidebarOpen(true)}>
               <Menu className="w-7 h-7" />
             </button>
             <div className="hidden sm:flex items-center gap-8">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
                   <span className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">Neural Link Established</span>
                </div>
                <div className="h-5 w-px bg-white/10" />
                <div className="text-[10px] font-mono text-cyan-500/90 font-black uppercase tracking-widest">
                   SYNC_LATENCY: {systemStatus.latency}ms
                </div>
             </div>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={() => setActiveView('briefing')}
              className="p-2.5 text-slate-500 hover:text-cyan-400 transition-all relative group"
            >
               <History className="w-5 h-5" />
               <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-[#020617] group-hover:scale-125 transition-transform" />
            </button>
            <button 
              onClick={() => {
                alert("Initiating new agent deployment protocol...");
                setActiveView('training');
              }}
              className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-black uppercase tracking-[0.15em] hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all group"
            >
               <PlusSquare className="w-4 h-4 group-hover:scale-125 transition-transform" /> 
               Deploy Swarm Node
            </button>
            <div 
              onClick={() => setActiveView('settings')}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center text-[11px] font-black text-cyan-400 shadow-2xl cursor-pointer hover:border-cyan-500/30 transition-all"
            >
              OP
            </div>
          </div>
        </header>

        {/* Scrollable View */}
        <main className="flex-1 overflow-y-auto bg-[#020617] p-8 lg:p-14 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-6 duration-800 ease-out">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
