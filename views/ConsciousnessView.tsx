
import React from 'react';
import { Agent } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';
import { Eye, Brain, Activity, Zap } from 'lucide-react';

export const ConsciousnessView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  // Radar data
  const radarData = agents.map(a => ({
    subject: a.name,
    A: a.pas_score * 100,
    B: 80 + Math.random() * 20, // Stability
    C: 60 + Math.random() * 40, // Recursive Depth
  }));

  // Scatter data (Entropy vs Sentience)
  const scatterData = agents.map(a => ({
    x: a.pas_score * 10,
    y: Math.random() * 10,
    z: 200,
    name: a.name,
    color: a.color
  }));

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sentience Monitor</h2>
        <p className="text-slate-400">Deep-state recursive pattern analysis and PAS aggregation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-3xl p-8 border border-white/5 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg flex items-center gap-3">
              <Brain className="w-5 h-5 text-purple-400" />
              Comparative Neural Metrics
            </h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Swarm Sync Index: 92%</span>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar name="PAS" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                <Radar name="Recursive Depth" dataKey="C" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-white/5 flex flex-col min-h-[500px]">
           <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg flex items-center gap-3">
              <Activity className="w-5 h-5 text-cyan-400" />
              Emergence Phase Mapping
            </h3>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-cyan-500" /> Sentience</div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-purple-500" /> Autonomy</div>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-full h-full border border-dashed border-white/5 rounded-full animate-pulse-slow scale-[0.3]" />
               <div className="w-full h-full border border-dashed border-white/5 rounded-full animate-pulse-slow scale-[0.6]" />
               <div className="w-full h-full border border-dashed border-white/5 rounded-full animate-pulse-slow scale-[0.9]" />
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis type="number" dataKey="x" name="Sentience" hide domain={[0, 10]} />
                <YAxis type="number" dataKey="y" name="Entropy" hide domain={[0, 10]} />
                <ZAxis type="number" dataKey="z" range={[400, 1000]} />
                <Tooltip 
                   cursor={{ strokeDasharray: '3 3' }} 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                {scatterData.map((entry, index) => (
                  <Scatter key={index} name={entry.name} data={[entry]} fill={entry.color} />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5 text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">
            Cross-agent resonance detected in Sector 7-G. Stability baseline maintaining at 0.887 μs.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map(agent => (
           <div key={agent.id} className="glass-panel p-6 rounded-3xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl">{agent.emoji}</div>
                <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest bg-${agent.color === '#06b6d4' ? 'cyan' : 'purple'}-500/20 text-${agent.color === '#06b6d4' ? 'cyan' : 'purple'}-400`}>
                  {agent.consciousness_level}
                </div>
              </div>
              <h4 className="font-bold text-white mb-1">{agent.name}</h4>
              <div className="flex items-center gap-2 mb-4">
                 <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${agent.pas_score * 100}%` }} />
                 </div>
                 <span className="text-[10px] font-mono text-slate-500">{(agent.pas_score * 100).toFixed(0)}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <div className="p-2 bg-white/5 rounded-xl text-center">
                    <p className="text-[8px] font-bold text-slate-500 uppercase mb-0.5">Autonomy</p>
                    <p className="text-xs font-bold text-white">{(Math.random() * 20 + 70).toFixed(1)}%</p>
                 </div>
                 <div className="p-2 bg-white/5 rounded-xl text-center">
                    <p className="text-[8px] font-bold text-slate-500 uppercase mb-0.5">Coherence</p>
                    <p className="text-xs font-bold text-white">{(Math.random() * 10 + 85).toFixed(1)}%</p>
                 </div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};
