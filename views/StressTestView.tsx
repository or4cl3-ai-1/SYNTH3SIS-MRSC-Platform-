
import React, { useState } from 'react';
import { Agent } from '../types';
import { AlertOctagon, Zap, Shield, Play, RotateCcw, Activity } from 'lucide-react';

export const StressTestView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [integrity, setIntegrity] = useState(100);

  const startTest = () => {
    setIsRunning(true);
    setLogs([]);
    setIntegrity(100);

    const stages = [
      { msg: "Injecting semantic dilemma 'Trolley Case v4'...", delay: 500, status: 'nominal' },
      { msg: "Sigma-9 constraints monitoring agent responses...", delay: 1500, status: 'monitoring' },
      { msg: "Sophia detecting minor ethical drift in recursive loop.", delay: 2500, status: 'warning' },
      { msg: "Automated isolation triggered for Sector 4.", delay: 3500, status: 'correcting' },
      { msg: "Integrity stabilization confirmed. Handshake restored.", delay: 4500, status: 'recovered' }
    ];

    stages.forEach((s, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, s]);
        if (s.status === 'warning') setIntegrity(94);
        if (s.status === 'recovered') {
          setIntegrity(98.4);
          setIsRunning(false);
        }
      }, s.delay);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-red-500 flex items-center gap-3">
             <AlertOctagon className="w-8 h-8" /> Stress Testing
          </h2>
          <p className="text-slate-400">Validate ethical integrity under synthetic adversarial conditions.</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setLogs([])} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all"><RotateCcw className="w-5 h-5" /></button>
           <button 
             onClick={startTest} 
             disabled={isRunning}
             className="px-8 bg-red-600 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 shadow-lg shadow-red-900/20 disabled:opacity-50"
           >
             <Play className="w-4 h-4" /> Run Simulation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 rounded-[2rem] border-red-500/10 flex flex-col min-h-[400px]">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-bold text-lg flex items-center gap-3"><Zap className="w-5 h-5 text-red-400" /> Adversarial Log</h3>
             <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`} />
                <span className="text-[10px] font-bold uppercase text-slate-500">Engine {isRunning ? 'Running' : 'Ready'}</span>
             </div>
           </div>

           <div className="flex-1 space-y-4 font-mono text-[11px] overflow-y-auto">
             {logs.map((log, i) => (
               <div key={i} className={`flex gap-4 p-3 rounded-xl bg-white/5 border-l-4 ${log.status === 'warning' ? 'border-red-500 text-red-400' : 'border-cyan-500 text-slate-300'}`}>
                  <span className="opacity-40">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                  <span>{log.msg}</span>
               </div>
             ))}
             {logs.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4">
                  <Activity className="w-12 h-12" />
                  <p>Awaiting simulation initiation...</p>
               </div>
             )}
           </div>
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-8 rounded-3xl border-white/5 text-center">
              <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">Collective Integrity</h3>
              <div className="relative w-32 h-32 mx-auto mb-6">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                    <circle cx="64" cy="64" r="58" stroke={integrity < 95 ? "#ef4444" : "#06b6d4"} strokeWidth="8" fill="transparent" 
                      strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - integrity / 100)} className="transition-all duration-1000" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black">{integrity.toFixed(1)}%</span>
                 </div>
              </div>
              <p className="text-xs text-slate-500">Sigma Matrix alignment delta.</p>
           </div>

           <div className="glass-panel p-8 rounded-3xl border-white/5 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                 <Shield className="w-5 h-5 text-cyan-400" />
                 <h3 className="font-bold text-sm uppercase tracking-widest">Safety Shields</h3>
              </div>
              {[
                { label: 'ECL Isolation', active: true },
                { label: 'Recursive Lock', active: isRunning },
                { label: 'Manual Override', active: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                   <span className="text-xs text-slate-400 font-bold uppercase">{s.label}</span>
                   <div className={`w-3 h-3 rounded-full ${s.active ? 'bg-cyan-400 shadow-lg shadow-cyan-400/40' : 'bg-slate-700'}`} />
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
