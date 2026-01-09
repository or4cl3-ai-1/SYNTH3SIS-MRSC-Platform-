
import React, { useState } from 'react';
import { Agent } from '../types';
import { Vote, CheckCircle2, XCircle, HelpCircle, Send, Brain, ShieldAlert } from 'lucide-react';

export const SwarmConsensusView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [proposal, setProposal] = useState('');
  const [isVoting, setIsVoting] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const initiateConsensus = () => {
    if (!proposal.trim()) return;
    setIsVoting(true);
    setResults([]);
    
    // Simulate multi-agent voting
    agents.forEach((agent, i) => {
      setTimeout(() => {
        const vote = Math.random() > 0.3 ? 'approve' : 'reject';
        const reasoning = `Based on my current ${agent.role} heuristics and Sigma alignment...`;
        setResults(prev => [...prev, { agent, vote, reasoning }]);
        if (i === agents.length - 1) setIsVoting(false);
      }, (i + 1) * 600);
    });
  };

  const approveCount = results.filter(r => r.vote === 'approve').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Swarm Consensus</h2>
          <p className="text-slate-400">Trigger distributed voting for system-level heuristic modifications.</p>
        </div>
        <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-purple-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Governance Active</span>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-[2rem] border-white/10 space-y-6">
        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Neural Proposal Interface</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Enter system modification proposal..." 
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            <button 
              onClick={initiateConsensus}
              disabled={isVoting || !proposal.trim()}
              className="px-8 bg-cyan-600 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 shadow-lg shadow-cyan-900/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> Initiate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => {
            const result = results.find(r => r.agent.id === agent.id);
            return (
              <div key={agent.id} className={`p-6 rounded-3xl border transition-all duration-500 ${result ? (result.vote === 'approve' ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20') : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.emoji}</span>
                    <span className="font-bold text-white text-sm">{agent.name}</span>
                  </div>
                  {result ? (
                    result.vote === 'approve' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />
                  ) : isVoting ? (
                    <div className="w-5 h-5 border-2 border-cyan-500/50 border-t-cyan-500 rounded-full animate-spin" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <div className="text-[10px] text-slate-400 leading-relaxed min-h-[40px]">
                  {result ? result.reasoning : "Awaiting transmission..."}
                </div>
              </div>
            );
          })}
        </div>

        {results.length === agents.length && (
          <div className="pt-8 border-t border-white/10 flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500">
             <div className="text-center space-y-2">
               <h3 className="text-2xl font-bold text-white">Consensus Result</h3>
               <p className="text-sm text-slate-400">
                 {approveCount > agents.length / 2 ? 'Proposal VALIDATED by swarm majority.' : 'Proposal REJECTED by swarm majority.'}
               </p>
             </div>
             <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 bg-green-500 rounded-full" />
                   <span className="text-xs font-bold">{approveCount} Approve</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 bg-red-500 rounded-full" />
                   <span className="text-xs font-bold">{agents.length - approveCount} Reject</span>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
