
import React, { useState } from 'react';
import { Agent } from '../types';
import { Shield, Cpu, ChevronRight, Zap, Target, Search } from 'lucide-react';

export const AgentsView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Swarm</h2>
          <p className="text-slate-400">Currently managing {agents.length} recursive entities</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search neural patterns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map(agent => (
          <div key={agent.id} className="glass-panel rounded-3xl p-6 border border-white/5 hover:border-white/20 transition-all group overflow-hidden relative">
            {/* Background Accent */}
            <div 
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20"
              style={{ backgroundColor: agent.color }}
            />

            <div className="flex items-center gap-4 mb-6 relative">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg border"
                style={{ backgroundColor: `${agent.color}10`, borderColor: `${agent.color}30` }}
              >
                {agent.emoji}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{agent.role}</p>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <div className="flex items-center gap-1.5 mb-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-bold text-green-400 uppercase">Active</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">PAS: {(agent.pas_score * 100).toFixed(0)}%</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-6 line-clamp-2">
              {agent.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {agent.mrsc_modules.map(mod => (
                <span key={mod} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  {mod}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex -space-x-2">
                 {[Shield, Target, Cpu].map((Icon, idx) => (
                   <div key={idx} className="w-8 h-8 rounded-full bg-[#1e293b] border-2 border-[#0a0f1e] flex items-center justify-center text-slate-400">
                     <Icon className="w-3 h-3" />
                   </div>
                 ))}
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">
                Interface <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
