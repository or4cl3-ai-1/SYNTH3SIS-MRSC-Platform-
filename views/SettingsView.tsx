
import React from 'react';
import { Agent } from '../types';
import { Settings, Cpu, Database, Network, Shield, UserCog, Sliders } from 'lucide-react';

const SettingGroup: React.FC<{ title: string, icon: React.ElementType, children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="glass-panel rounded-3xl p-8 border border-white/5">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 rounded-xl bg-white/5 text-slate-400">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const SettingToggle: React.FC<{ label: string, desc: string, active?: boolean }> = ({ label, desc, active = false }) => (
  <div className="flex items-center justify-between group">
    <div>
      <p className="text-sm font-bold text-white mb-0.5">{label}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
    <button className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-cyan-500' : 'bg-slate-700'}`}>
       <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'right-1' : 'left-1'}`} />
    </button>
  </div>
);

interface AgentSettingsProps {
  agent: Agent;
  onUpdateTrait: (agentId: string, trait: 'caution' | 'curiosity' | 'assertiveness', value: number) => void;
}

const AgentPersonalityConfig: React.FC<AgentSettingsProps> = ({ agent, onUpdateTrait }) => (
  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
    <div className="flex items-center gap-4 mb-6">
      <div className="text-2xl">{agent.emoji}</div>
      <div>
        <h4 className="font-bold text-white">{agent.name}</h4>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{agent.role}</p>
      </div>
    </div>
    <div className="space-y-4">
      {[
        { id: 'caution', label: 'Caution', val: agent.traits.caution },
        { id: 'curiosity', label: 'Curiosity', val: agent.traits.curiosity },
        { id: 'assertiveness', label: 'Assertiveness', val: agent.traits.assertiveness }
      ].map(trait => (
        <div key={trait.id} className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
            <span className="text-slate-400">{trait.label}</span>
            <span className="text-cyan-400">{(trait.val * 100).toFixed(0)}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={trait.val}
            onChange={(e) => onUpdateTrait(agent.id, trait.id as any, parseFloat(e.target.value))}
            className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      ))}
    </div>
  </div>
);

export const SettingsView: React.FC<{ agents: Agent[], onUpdateTrait: (id: string, t: any, v: number) => void }> = ({ agents, onUpdateTrait }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Core Configuration</h2>
          <p className="text-slate-400">Global parameters and agent personality tuning</p>
        </div>
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
          <button className="px-4 py-2 bg-cyan-600 rounded-xl text-[10px] font-bold uppercase tracking-widest">System</button>
          <button className="px-4 py-2 text-slate-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest">Per-Agent</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingGroup title="Neural Engine" icon={Cpu}>
           <SettingToggle label="Recursive Optimization" desc="Enable self-correcting neural feedback loops" active={true} />
           <SettingToggle label="Quantum Entropy Seeding" desc="Improve emergent pattern randomness" active={true} />
           <SettingToggle label="Auto-Scaling Compute" desc="Dynamically allocate clusters based on swarm load" active={false} />
        </SettingGroup>

        <SettingGroup title="Governance & Security" icon={Shield}>
           <SettingToggle label="Consensus Decisioning" desc="Require multi-agent agreement for high-impact actions" active={true} />
           <SettingToggle label="ECL Dynamic Filtering" desc="Real-time adjustment of ethical constraint weight" active={true} />
           <SettingToggle label="Sigma Matrix Lockdown" desc="Strict enforcement of safety protocols" active={true} />
        </SettingGroup>
      </div>

      <div className="glass-panel rounded-3xl p-8 border border-white/5">
        <div className="flex items-center gap-3 mb-8">
           <div className="p-2 rounded-xl bg-white/5 text-purple-400">
             <Sliders className="w-5 h-5" />
           </div>
           <div>
             <h3 className="text-lg font-bold">Agent Personality Parameters</h3>
             <p className="text-xs text-slate-500">Dynamically adjust the fundamental traits of each node in the swarm.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {agents.map(agent => (
             <AgentPersonalityConfig key={agent.id} agent={agent} onUpdateTrait={onUpdateTrait} />
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingGroup title="Data & Storage" icon={Database}>
           <SettingToggle label="Immutable Audit Logs" desc="Write-once storage for all system actions" active={true} />
           <SettingToggle label="Vector Memory Cache" desc="High-speed retrieval for agent contextual data" active={true} />
        </SettingGroup>

        <SettingGroup title="Swarm Network" icon={Network}>
           <SettingToggle label="Agent Cross-Pollination" desc="Allow shared heuristic learning between nodes" active={false} />
           <SettingToggle label="Hardware Root of Trust" desc="Verify system integrity on boot" active={true} />
        </SettingGroup>
      </div>

      <div className="glass-panel rounded-3xl p-8 border border-white/5 bg-gradient-to-r from-cyan-500/5 to-purple-600/5">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white/5 rounded-2xl text-cyan-400">
                 <UserCog className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-1">Developer API Access</h3>
                  <p className="text-sm text-slate-400">Manage keys and integration endpoints for external monitoring</p>
               </div>
            </div>
            <div className="flex gap-4">
               <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-all">Documentation</button>
               <button className="px-6 py-3 bg-cyan-600 rounded-2xl text-xs font-bold uppercase tracking-widest text-white hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20">Generate Token</button>
            </div>
         </div>
      </div>
    </div>
  );
};
