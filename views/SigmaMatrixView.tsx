
import React from 'react';
import { SystemStatus } from '../types';
import { Shield, Lock, AlertTriangle, CheckCircle, Search, RefreshCw, Activity } from 'lucide-react';

export const SigmaMatrixView: React.FC<{ systemStatus: SystemStatus }> = ({ systemStatus }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Σ-Matrix Firewall</h2>
          <p className="text-slate-400">Ethical constraints and recursive safety monitoring</p>
        </div>
        <div className="p-1 bg-white/5 border border-white/10 rounded-2xl flex">
          <button className="px-4 py-2 bg-cyan-600 rounded-xl text-xs font-bold uppercase tracking-widest">Monitoring</button>
          <button className="px-4 py-2 text-slate-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">Configuration</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl p-8 border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Shield className="w-64 h-64" />
             </div>
             <div className="relative z-10">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold">Constraint Engine: ACTIVE</h3>
                    <p className="text-slate-400">Operating at peak efficiency. No breaches detected in last 2,492 cycles.</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Recursive Feedback Loop Check', status: 'Optimal', val: 100 },
                    { label: 'ECL Protocol Alignment', status: '99.8%', val: 99 },
                    { label: 'Semantic Drift Suppression', status: 'Active', val: 94 },
                    { label: 'Autonomous Intent Validation', status: 'Optimal', val: 100 },
                  ].map((stat, i) => (
                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                        <span className="text-xs font-bold text-green-400">{stat.status}</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full">
                        <div className="bg-gradient-to-r from-green-400 to-cyan-500 h-full" style={{ width: `${stat.val}%` }} />
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-white/5">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
               <Activity className="w-5 h-5 text-purple-400" />
               Real-time Heuristic Audit
            </h3>
            <div className="space-y-3 font-mono text-[11px]">
              {[
                { type: 'VALIDATE', msg: 'Attempting recursive alignment check for Agent: Sophia', res: 'SUCCESS', color: 'green' },
                { type: 'MONITOR', msg: 'ECL layer detecting slight entropy increase in Sector 4', res: 'RESOLVED', color: 'cyan' },
                { type: 'SECURE', msg: 'Sigma Matrix handshake confirmed with Decentralized Swarm', res: 'NOMINAL', color: 'purple' },
                { type: 'AUDIT', msg: 'Neural weight stabilization triggered for pattern: X-9', res: 'COMPLETE', color: 'green' },
                { type: 'WARN', msg: 'Minor semantic misalignment in Agent: Newton (0.003%)', res: 'IGNORED', color: 'yellow' },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0 opacity-80 hover:opacity-100 transition-opacity">
                   <span className={`w-20 font-bold text-${log.color}-400`}>[{log.type}]</span>
                   <span className="flex-1 text-slate-400">{log.msg}</span>
                   <span className="text-slate-500">{log.res}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
               <Lock className="w-5 h-5 text-cyan-400" />
               <h3 className="font-bold text-lg">System Lockdown</h3>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              In case of emergent behavior exceeding the Sigma-9 threshold, the platform will automatically initiate a cascading neural isolation.
            </p>
            <button className="w-full py-4 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30 font-bold uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-900/10">
              Emergency Kill-Switch
            </button>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-white/5">
             <div className="flex items-center gap-3 mb-6">
               <AlertTriangle className="w-5 h-5 text-yellow-400" />
               <h3 className="font-bold text-lg">Compliance Summary</h3>
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span>Policy Set</span>
                  <span>v1.0.4-L</span>
               </div>
               <div className="h-px bg-white/10" />
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-white">Ethical Violations</span>
                     <span className="text-sm font-bold text-green-400">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-white">System Overrides</span>
                     <span className="text-sm font-bold text-slate-400">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-white">Manual Interventions</span>
                     <span className="text-sm font-bold text-slate-400">0</span>
                  </div>
               </div>
               <button className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                 <RefreshCw className="w-3 h-3" /> Re-sync Policies
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
