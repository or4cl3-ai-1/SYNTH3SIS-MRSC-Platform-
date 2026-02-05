
import React, { useMemo } from 'react';
import { Agent } from '../types';
import { Info, ArrowRightLeft, MessageSquare, Zap, Target, Activity, ShieldCheck, HelpCircle } from 'lucide-react';

type InteractionType = 'data_exchange' | 'consensus' | 'conflict_resolution';

interface InteractionData {
  count: number;
  type: InteractionType;
}

export const InteractionMatrixView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  // Generate stable mock interaction data based on agent IDs
  const matrix = useMemo(() => {
    const data: Record<string, Record<string, InteractionData>> = {};
    agents.forEach(a1 => {
      data[a1.id] = {};
      agents.forEach(a2 => {
        if (a1.id === a2.id) {
          data[a1.id][a2.id] = { count: 0, type: 'data_exchange' };
        } else {
          const seed = a1.id.length + a2.id.length + a1.name.charCodeAt(0) + a2.name.charCodeAt(0);
          const types: InteractionType[] = ['data_exchange', 'consensus', 'conflict_resolution'];
          data[a1.id][a2.id] = {
            count: Math.floor((seed * 17) % 300) + 15,
            type: types[seed % 3]
          };
        }
      });
    });
    return data;
  }, [agents]);

  const getInteractionColor = (type: InteractionType, count: number) => {
    const opacity = Math.min(0.85, count / 300 + 0.15);
    switch (type) {
      case 'data_exchange': return `rgba(34, 211, 238, ${opacity})`;
      case 'consensus': return `rgba(34, 197, 94, ${opacity})`;
      case 'conflict_resolution': return `rgba(168, 85, 247, ${opacity})`;
      default: return 'transparent';
    }
  };

  const formatType = (type: string) => type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white flex items-center gap-4">
            <Activity className="w-10 h-10 text-cyan-400" />
            Interaction Matrix
          </h2>
          <p className="text-slate-400 font-medium max-w-2xl">
            Analyzing multi-node throughput and recursive protocol handshake density across the swarm.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 p-3 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-3xl shadow-2xl">
          <div className="flex items-center gap-3 px-4 py-2 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
             <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
             <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Data Exchange</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 rounded-2xl border border-green-500/20">
             <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
             <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Consensus</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-purple-500/10 rounded-2xl border border-purple-500/20">
             <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
             <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Conflict Res</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 glass-panel rounded-[3rem] p-12 border border-white/5 overflow-visible shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto overflow-y-visible custom-scrollbar pb-6">
            <table className="w-full border-separate border-spacing-4">
              <thead>
                <tr>
                  <th className="p-4"></th>
                  {agents.map(agent => (
                    <th key={agent.id} className="p-4 min-w-[140px]">
                      <div className="flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:scale-110">
                        <div className="w-16 h-16 rounded-[1.5rem] glass-panel flex items-center justify-center text-4xl border-white/10 group-hover:border-cyan-500/40 transition-all shadow-2xl">
                          {agent.emoji}
                        </div>
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{agent.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agents.map(rowAgent => (
                  <tr key={rowAgent.id}>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-4 pr-6 group cursor-pointer transition-transform hover:-translate-x-2">
                         <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{rowAgent.name}</span>
                         <div className="w-16 h-16 rounded-[1.5rem] glass-panel flex items-center justify-center text-4xl border-white/10 group-hover:border-cyan-500/40 transition-all shadow-2xl">
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
                            className={`h-32 rounded-[2rem] border flex flex-col items-center justify-center transition-all duration-500 relative ${isSelf ? 'bg-slate-900/40 border-white/5' : 'border-white/5 hover:border-white/50 cursor-help hover:scale-[1.05] active:scale-95 shadow-2xl hover:z-50'}`}
                            style={{ backgroundColor: isSelf ? '' : getInteractionColor(data.type, data.count) }}
                          >
                            {!isSelf ? (
                              <>
                                <div className="flex items-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                  <span className="text-2xl drop-shadow-2xl">{rowAgent.emoji}</span>
                                  <ArrowRightLeft className="w-5 h-5 text-white animate-pulse" />
                                  <span className="text-2xl drop-shadow-2xl">{colAgent.emoji}</span>
                                </div>
                                <span className="text-4xl font-black text-white z-10 text-glow leading-none">{data.count}</span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-[2rem]" />
                              </>
                            ) : (
                              <div className="w-4 h-4 bg-slate-800 rounded-full animate-pulse" />
                            )}
                          </div>

                          {/* Interactive Tooltip as requested */}
                          {!isSelf && (
                            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-[120%] mb-4 left-1/2 -translate-x-1/2 z-[100] w-80 p-8 rounded-[2.5rem] glass-panel border border-cyan-500/20 shadow-[0_40px_100px_rgba(0,0,0,0.9)] pointer-events-none backdrop-blur-3xl overflow-hidden">
                              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                                <Activity className="w-32 h-32" />
                              </div>
                              <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between">
                                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] ${
                                    data.type === 'data_exchange' ? 'bg-cyan-500/20 text-cyan-400' : 
                                    data.type === 'consensus' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'
                                  }`}>
                                    {formatType(data.type)}
                                  </span>
                                  <div className="flex -space-x-3">
                                    <div className="w-12 h-12 rounded-2xl bg-[#020617] flex items-center justify-center text-2xl border border-white/20 shadow-2xl">{rowAgent.emoji}</div>
                                    <div className="w-12 h-12 rounded-2xl bg-[#020617] flex items-center justify-center text-2xl border border-white/20 shadow-2xl">{colAgent.emoji}</div>
                                  </div>
                                </div>

                                <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 flex flex-col items-center gap-3">
                                   <div className="flex items-center gap-4 text-white font-black text-sm tracking-tight">
                                     <span>{rowAgent.name}</span>
                                     <ArrowRightLeft className="w-5 h-5 text-cyan-400 animate-pulse" />
                                     <span>{colAgent.name}</span>
                                   </div>
                                   <div className="h-px w-full bg-white/10" />
                                   <div className="flex items-center gap-3">
                                     <Zap className="w-4 h-4 text-yellow-400" />
                                     <span className="text-2xl font-black text-white italic">{data.count} Ops/Cycle</span>
                                   </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                   <div className="p-3 bg-white/5 rounded-xl text-center">
                                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Latency</div>
                                      <div className="text-xs font-black text-white">0.4ms</div>
                                   </div>
                                   <div className="p-3 bg-white/5 rounded-xl text-center">
                                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</div>
                                      <div className="text-xs font-black text-green-400">Stable</div>
                                   </div>
                                </div>
                              </div>
                              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 glass-panel border-r border-b border-cyan-500/20 rotate-45" />
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

        {/* Sidebar Analytics */}
        <div className="space-y-10">
           <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5 shadow-2xl bg-gradient-to-br from-[#020617] to-[#0f172a]">
             <h3 className="font-black text-2xl mb-10 flex items-center gap-4 uppercase tracking-tighter text-white italic">
               <Zap className="w-7 h-7 text-cyan-400 animate-pulse" />
               Throughput
             </h3>
             <div className="space-y-6">
                {[
                  { label: 'Network Density', value: '0.92 λ', icon: Target, color: 'cyan' },
                  { label: 'Swarm Sync', value: '99.8%', icon: ShieldCheck, color: 'blue' },
                  { label: 'Mesh Flux', value: '18k/s', icon: Activity, color: 'cyan' },
                  { label: 'Handshake Fail', value: '0', icon: HelpCircle, color: 'purple' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all cursor-default group">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-${item.color}-500/10 text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-white">{item.value}</span>
                  </div>
                ))}
             </div>
           </div>

           <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/5 blur-[60px] animate-pulse" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 text-red-500 mb-2">
                   <ShieldCheck className="w-6 h-6" />
                   <h3 className="font-black text-lg uppercase tracking-tight">Safety Overrides</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Recursive constraint layers are actively monitoring all high-frequency handshakes for semantic drift or policy violations.
                </p>
                <button 
                  onClick={() => alert("Conducting full mesh safety audit...")}
                  className="w-full py-4 rounded-2xl bg-red-600/10 border border-red-600/30 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl"
                >
                  Verify Mesh Integrity
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
