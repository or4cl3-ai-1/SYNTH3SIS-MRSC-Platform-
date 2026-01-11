
import React, { useState } from 'react';
import { Agent } from '../types';
import { Shield, Cpu, ChevronRight, Zap, Target, Search, MessageSquare } from 'lucide-react';

interface AgentsViewProps {
  agents: Agent[];
  setActiveView: (view: string) => void;
  setSelectedAgentId: (id: string) => void;
}

export const AgentsView: React.FC<AgentsViewProps> = ({ agents, setActiveView, setSelectedAgentId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInterface = (id: string) => {
    setSelectedAgentId(id);
    setActiveView('chat');
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Swarm Nodes</h2>
          <p className="text-slate-400 font-medium">Currently managing {agents.length} recursive entities</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search neural patterns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 w-full md:w-80 text-sm font-medium transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredAgents.map(agent => (
          <div key={agent.id} className="glass-panel rounded-[2.5rem] p-8 border border-white/5 hover:border-cyan-500/30 transition-all group overflow-hidden relative cursor-default">
            {/* Background Accent */}
            <div 
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] opacity-[0.03] transition-all group-hover:opacity-[0.08]"
              style={{ backgroundColor: '#22d3ee' }}
            />

            <div className="flex items-center gap-5 mb-8 relative">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl border bg-[#22d3ee]/5 border-[#22d3ee]/20 group-hover:scale-105 transition-transform"
              >
                {agent.emoji}
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{agent.name}</h3>
                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mt-1">{agent.role}</p>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1.5">
                   <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                   <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Active</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500">PAS: {(agent.pas_score * 100).toFixed(0)}%</span>
              </div>
            </div>

            <p className="text-base text-slate-400 mb-8 line-clamp-2 leading-relaxed font-medium">
              {agent.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {agent.mrsc_modules.map(mod => (
                <span key={mod} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] hover:text-white transition-colors">
                  {mod}
                </span>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex -space-x-3">
                 {[Shield, Target, Cpu, MessageSquare].map((Icon, idx) => (
                   <div key={idx} className="w-10 h-10 rounded-full bg-[#0f172a] border-2 border-[#020617] flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors shadow-lg">
                     <Icon className="w-4 h-4" />
                   </div>
                 ))}
              </div>
              <button 
                onClick={() => handleInterface(agent.id)}
                className="flex items-center gap-2 text-xs font-black text-cyan-400 hover:text-white transition-all uppercase tracking-[0.2em] group/btn"
              >
                Interface Node <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
