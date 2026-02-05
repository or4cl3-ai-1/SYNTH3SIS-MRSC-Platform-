
import React, { useMemo } from 'react';
import { Agent } from '../types';
import { Info, ArrowRightLeft, MessageSquare, Zap, Target, Activity } from 'lucide-react';

type InteractionType = 'data_exchange' | 'consensus' | 'conflict_resolution';

interface InteractionData {
  count: number;
  type: InteractionType;
}

export const InteractionMatrixView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  // Generate stable mock interaction data
  const matrix = useMemo(() => {
    const data: Record<string, Record<string, InteractionData>> = {};
    agents.forEach(a1 => {
      data[a1.id] = {};
      agents.forEach(a2 => {
        if (a1.id === a2.id) {
          data[a1.id][a2.id] = { count: 0, type: 'data_exchange' };
        } else {
          // Semi-random but deterministic based on IDs for mock
          const seed = a1.id.length + a2.id.length + a1.name.charCodeAt(0) + a2.name.charCodeAt(0);
          const types: InteractionType[] = ['data_exchange', 'consensus', 'conflict_resolution'];
          data[a1.id][a2.id] = {
            count: Math.floor((seed * 13) % 250) + 10,
            type: types[seed % 3]
          };
        }
      });
    });
    return data;
  }, [agents]);

  const getInteractionColor = (type: InteractionType, count: number) => {
    const opacity = Math.min(0.9, count / 250 + 0.15);
    switch (type) {
      case 'data_exchange': return `rgba(34, 211, 238, ${opacity})`; // Cyan
      case 'consensus': return `rgba(34, 197, 94, ${opacity})`; // Green
      case 'conflict_resolution': return `rgba(168, 85, 247, ${opacity})`; // Purple
      default: return 'transparent';
    }
  };

  const formatType = (type: string) => type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Interaction Matrix</h2>
          <p className="text-slate-400 font-medium">Real-time throughput analysis of recursive swarm protocols</p>
        </div>
        <div className="flex gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400">
             <div className="w-3 h-3 bg-cyan-500/50 rounded shadow-[0_0_8px_rgba(34,211,238,0.4)]" /> Data Exchange
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-400">
             <div className="w-3 h-3 bg-green-500/50 rounded shadow-[0_0_8px_rgba(34,197,94,0.4)]" /> Consensus
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-400">
             <div className="w-3 h-3 bg-purple-500/50 rounded shadow-[0_0_8px_rgba(168,85,247,0.4)]" /> Conflict Res
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 glass-panel rounded-[2.5rem] p-10 border border-white/5 overflow-visible">
          <div className="overflow-x-auto overflow-y-visible custom-scrollbar">
            <table className="w-full border-separate border-spacing-3">
              <thead>
                <tr>
                  <th className="p-3"></th>
                  {agents.map(agent => (
                    <th key={agent.id} className="p-3 min-w-[120px]">
                      <div className="flex flex-col items-center gap-2 group cursor-default">
                        <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-3xl border-white/10 group-hover:border-cyan-500/30 transition-all shadow-xl">
                          {agent.emoji}
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{agent.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agents.map(rowAgent => (
                  <tr key={rowAgent.id}>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-3 pr-4 group cursor-default">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{rowAgent.name}</span>
                         <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-3xl border-white/10 group-hover:border-cyan-500/30 transition-all shadow-xl">
                          {rowAgent.emoji}
                         </div>
                      </div>
                    </td>
                    {agents.map(colAgent => {
                      const data = matrix[rowAgent.id][colAgent.id];
                      const isSelf = rowAgent.id === colAgent.id;
                      return (
                        <td key={colAgent.id} className="p-0 relative group">
                          <div 
                            className={`h-28 rounded-2xl border flex flex-col items-center justify-center transition-all duration-400 relative ${isSelf ? 'bg-white/5 border-white/5' : 'border-white/5 hover:border-white/40 cursor-help hover:scale-[1.05] active:scale-95 shadow-2xl'}`}
                            style={{ backgroundColor: isSelf ? '' : getInteractionColor(data.type, data.count) }}
                          >
                            {!isSelf && (
                              <>
                                <div className="flex items-center gap-1.5 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                  <span className="text-xl drop-shadow-lg">{rowAgent.emoji}</span>
                                  <ArrowRightLeft className="w-4 h-4 text-white animate-pulse" />
                                  <span className="text-xl drop-shadow-lg">{colAgent.emoji}</span>
                                </div>
                                <span className="text-3xl font-black text-white z-10 text-glow">{data.count}</span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
                              </>
                            )}
                            {isSelf && <div className="w-3 h-3 bg-slate-700/50 rounded-full animate-pulse" />}
                          </div>

                          {/* Interactive Tooltip */}
                          {!isSelf && (
                            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full mb-6 left-1/2 -translate-x-1/2 z-[100] w-72 p-7 rounded-[2.5rem] glass-panel border border-cyan-500/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)] pointer-events-none backdrop-blur-3xl">
                              <div className="flex items-center justify-between mb-5">
                                <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                                  data.type === 'data_exchange' ? 'text-cyan-400' : 
                                  data.type === 'consensus' ? 'text-green-400' : 'text-purple-400'
                                }`}>{formatType(data.type)}</span>
                                <div className="flex -space-x-3">
                                  <div className="w-10 h-10 rounded-xl bg-[#020617] flex items-center justify-center text-xl border border-white/20 shadow-2xl">{rowAgent.emoji}</div>
                                  <div className="w-10 h-10 rounded-xl bg-[#020617] flex items-center justify-center text-xl border border-white/20 shadow-2xl">{colAgent.emoji}</div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="flex items-center justify-center gap-4 py-3 bg-white/5 rounded-2xl border border-white/10">
                                   <span className="text-sm font-black text-white tracking-tight">{rowAgent.name}</span>
                                   <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                                   <span className="text-sm font-black text-white tracking-tight">{colAgent.name}</span>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Throughput Score</span>
                                  <span className="text-sm font-mono font-black text-white shadow-cyan-500/20 shadow-sm">{data.count} ops/cycle</span>
                                </div>
                                <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase tracking-wider text-center pt-2">
                                  Handshake status: <span className="text-green-500">Nominal</span>
                                </p>
                              </div>
                              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 glass-panel border-r border-b border-cyan-500/20 rotate-45" />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
            <h3 className="font-black text-xl mb-8 flex items-center gap-3 uppercase tracking-tight text-white italic">
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              Neural Hotspots
            </h3>
            <div className="space-y-5">
              <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-3">
                   <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Latency Spike</span>
                   <span className="text-[10px] font-mono text-red-500/80 font-bold">ATHENA <> NEWTON</span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">Recursive handshake degradation detected in Sector 24. Integrity isolation pending.</p>
              </div>
              <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-3">
                   <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Peak Resonance</span>
                   <span className="text-[10px] font-mono text-cyan-500/80 font-bold">ORACLE <> SOPHIA</span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">High-density ethical alignment synchronization established (1.4 GB/cycle).</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
             <h3 className="font-black text-xl mb-8 flex items-center gap-3 uppercase tracking-tight text-white italic">
               <Info className="w-6 h-6 text-cyan-400" />
               Swarm Metrics
             </h3>
             <div className="space-y-4">
                {[
                  { label: 'Network Density', value: '0.88 λ', icon: Target, color: 'cyan' },
                  { label: 'Protocol Stability', value: '99.4%', icon: MessageSquare, color: 'blue' },
                  { label: 'Inter-node Flow', value: '14k req/m', icon: ArrowRightLeft, color: 'cyan' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all cursor-default group">
                    <div className="flex items-center gap-4 text-slate-500">
                      <item.icon className={`w-5 h-5 text-${item.color}-400 group-hover:scale-110 transition-transform`} />
                      <span className="text-[11px] font-black uppercase tracking-widest group-hover:text-slate-300 transition-colors">{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-white">{item.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
