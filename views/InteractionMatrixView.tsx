
import React, { useMemo } from 'react';
import { Agent } from '../types';
import { Info, ArrowRightLeft, MessageSquare, Zap, Target } from 'lucide-react';

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
          const seed = a1.id.length + a2.id.length;
          const types: InteractionType[] = ['data_exchange', 'consensus', 'conflict_resolution'];
          data[a1.id][a2.id] = {
            count: Math.floor((seed * 7) % 100),
            type: types[seed % 3]
          };
        }
      });
    });
    return data;
  }, [agents]);

  const getInteractionColor = (type: InteractionType, count: number) => {
    const opacity = Math.min(0.8, count / 100 + 0.1);
    switch (type) {
      case 'data_exchange': return `rgba(6, 182, 212, ${opacity})`; // Cyan
      case 'consensus': return `rgba(34, 197, 94, ${opacity})`; // Green
      case 'conflict_resolution': return `rgba(168, 85, 247, ${opacity})`; // Purple
      default: return 'transparent';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Interaction Matrix</h2>
          <p className="text-slate-400">Heatmap of swarm communication protocols and throughput</p>
        </div>
        <div className="flex gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
             <div className="w-3 h-3 bg-cyan-500/50 rounded" /> Data Exchange
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-400">
             <div className="w-3 h-3 bg-green-500/50 rounded" /> Consensus
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-purple-400">
             <div className="w-3 h-3 bg-purple-500/50 rounded" /> Conflict Res
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 glass-panel rounded-3xl p-8 border border-white/5 overflow-x-auto">
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="p-2"></th>
                {agents.map(agent => (
                  <th key={agent.id} className="p-2 min-w-[80px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">{agent.emoji}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{agent.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map(rowAgent => (
                <tr key={rowAgent.id}>
                  <td className="p-2 text-right">
                    <div className="flex items-center justify-end gap-2 pr-2">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{rowAgent.name}</span>
                       <span className="text-xl">{rowAgent.emoji}</span>
                    </div>
                  </td>
                  {agents.map(colAgent => {
                    const data = matrix[rowAgent.id][colAgent.id];
                    const isSelf = rowAgent.id === colAgent.id;
                    return (
                      <td key={colAgent.id} className="p-0">
                        <div 
                          className={`h-16 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 relative group overflow-hidden ${isSelf ? 'bg-white/5 border-white/5' : 'border-white/5 hover:border-white/20'}`}
                          style={{ backgroundColor: isSelf ? '' : getInteractionColor(data.type, data.count) }}
                        >
                          {!isSelf && (
                            <>
                              <span className="text-lg font-bold text-white z-10">{data.count}</span>
                              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                            </>
                          )}
                          {isSelf && <div className="w-1 h-1 bg-slate-700 rounded-full" />}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/5">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Swarm Bottlenecks
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[10px] font-bold text-red-400 uppercase">Latency Spike</span>
                   <span className="text-[10px] font-mono text-red-500/80">ATHENA <> NEWTON</span>
                </div>
                <p className="text-xs text-slate-400">Recursive handshake failed in Cycle 24. Retrying...</p>
              </div>
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[10px] font-bold text-green-400 uppercase">Peak Throughput</span>
                   <span className="text-[10px] font-mono text-green-500/80">ORACLE <> SOPHIA</span>
                </div>
                <p className="text-xs text-slate-400">High-density ethical data exchange (1.2 GB/s)</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-white/5">
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
               <Info className="w-5 h-5 text-cyan-400" />
               Matrix Analysis
             </h3>
             <div className="space-y-3">
                {[
                  { label: 'Avg Frequency', value: '42 ops/m', icon: ArrowRightLeft },
                  { label: 'Top Link', value: 'Oracle Ensemble', icon: Target },
                  { label: 'Network Cohesion', value: '0.94 λ', icon: MessageSquare }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 text-slate-400">
                      <item.icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                    </div>
                    <span className="text-xs font-bold text-white">{item.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
