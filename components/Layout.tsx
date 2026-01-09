
import React, { useState } from 'react';
import { 
  Activity, Brain, Shield, Users, MessageSquare, Settings, Eye, Zap, 
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

const SidebarItem: React.FC<SidebarItemProps> = ({ id, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white border border-white/10'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
    <span className="font-medium text-sm">{label}</span>
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
        { id: 'agents', icon: Users, label: 'Agent Swarm' },
        { id: 'chat', icon: MessageSquare, label: 'Direct Interface' },
        { id: 'voice', icon: Mic, label: 'Neural Bridge Voice' },
      ]
    },
    {
      title: "Intelligence",
      items: [
        { id: 'consensus', icon: Vote, label: 'Swarm Consensus' },
        { id: 'training', icon: BookOpen, label: 'Neural Training' },
        { id: 'briefing', icon: FileText, label: 'Emergence Brief' },
        { id: 'grounding', icon: Search, label: 'Global Grounding' },
      ]
    },
    {
      title: "Analysis",
      items: [
        { id: 'graph', icon: Share2, label: 'Knowledge Graph' },
        { id: 'matrix', icon: Grid, label: 'Interaction Matrix' },
        { id: 'consciousness', icon: Eye, label: 'Sentience Monitor' },
        { id: 'stresstest', icon: AlertOctagon, label: 'Stress Testing' },
      ]
    },
    {
      title: "System",
      items: [
        { id: 'sigma', icon: Shield, label: 'Σ-Matrix' },
        { id: 'settings', icon: Settings, label: 'Core Settings' },
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f1e] text-slate-100">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0f172a]/80 backdrop-blur-2xl flex flex-col shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-base tracking-tight leading-none">SYNTH3SIS</h1>
                <p className="text-[8px] uppercase tracking-widest text-cyan-400/80 font-bold">MRSC-X Engine</p>
              </div>
            </div>
            <button className="lg:hidden p-2 text-slate-400" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">{group.title}</h3>
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

          <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 font-medium uppercase">Neural Load</span>
                <span className="text-[10px] text-green-400 font-bold uppercase">Nominal</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-[94%]" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-[#0f172a]/20 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
             <button className="lg:hidden p-2 -ml-2 text-slate-400" onClick={() => setIsSidebarOpen(true)}>
               <Menu className="w-6 h-6" />
             </button>
             <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs">
                   <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                   <span className="text-slate-400 font-medium hidden md:inline">Neural Bridge Active</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="text-[10px] font-mono text-cyan-400/80 uppercase">
                   LATENCY: {systemStatus.latency}ms
                </div>
             </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
               <History className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-600/20 transition-all">
               <PlusSquare className="w-4 h-4" /> <span className="hidden sm:inline">New Agent</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold">
              OP
            </div>
          </div>
        </header>

        {/* Scrollable View */}
        <main className="flex-1 overflow-y-auto bg-[#0a0f1e] p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
