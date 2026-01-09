
import React from 'react';
import { Activity, Brain, Shield, Users, MessageSquare, Settings, Eye, Zap, BookOpen, Share2, Grid } from 'lucide-react';

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
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white border border-white/10'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
    <span className="font-medium">{label}</span>
  </button>
);

interface LayoutProps {
  activeView: string;
  setActiveView: (view: string) => void;
  systemStatus: any;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ activeView, setActiveView, systemStatus, children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f1e]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0f172a]/50 backdrop-blur-xl flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">SYNTH3SIS</h1>
              <p className="text-[10px] uppercase tracking-widest text-cyan-400/80 font-bold">MRSC Platform</p>
            </div>
          </div>

          <nav className="space-y-1">
            <SidebarItem id="dashboard" icon={Activity} label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
            <SidebarItem id="agents" icon={Users} label="Agent Swarm" isActive={activeView === 'agents'} onClick={() => setActiveView('agents')} />
            <SidebarItem id="training" icon={BookOpen} label="Neural Training" isActive={activeView === 'training'} onClick={() => setActiveView('training')} />
            <SidebarItem id="graph" icon={Share2} label="Knowledge Graph" isActive={activeView === 'graph'} onClick={() => setActiveView('graph')} />
            <SidebarItem id="matrix" icon={Grid} label="Interaction Matrix" isActive={activeView === 'matrix'} onClick={() => setActiveView('matrix')} />
            <SidebarItem id="consciousness" icon={Eye} label="Sentience Monitor" isActive={activeView === 'consciousness'} onClick={() => setActiveView('consciousness')} />
            <SidebarItem id="chat" icon={MessageSquare} label="Direct Interface" isActive={activeView === 'chat'} onClick={() => setActiveView('chat')} />
            <SidebarItem id="sigma" icon={Shield} label="Σ-Matrix" isActive={activeView === 'sigma'} onClick={() => setActiveView('sigma')} />
            <SidebarItem id="settings" icon={Settings} label="Core Settings" isActive={activeView === 'settings'} onClick={() => setActiveView('settings')} />
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">System Integrity</span>
              <span className="text-[10px] text-green-400 font-bold uppercase">Nominal</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-[94%]" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            <Zap className="w-3 h-3 text-yellow-400" />
            V-3.1 Stable Build
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-[#0f172a]/20 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-slate-300 font-medium">Neural Bridge Active</span>
             </div>
             <div className="h-4 w-px bg-white/10" />
             <div className="text-sm font-mono text-cyan-400/80 uppercase">
                LATENCY: {systemStatus.latency}ms
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
               <Activity className="w-5 h-5" />
               <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#0a0f1e]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold">
              SYS
            </div>
          </div>
        </header>

        {/* Scrollable View */}
        <main className="flex-1 overflow-y-auto bg-[#0a0f1e] p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
