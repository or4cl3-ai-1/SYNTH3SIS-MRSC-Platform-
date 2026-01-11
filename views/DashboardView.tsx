
import React from 'react';
import { Agent, SystemStatus } from '../types';
import { Activity, Brain, Users, Shield, TrendingUp, AlertTriangle, RefreshCw, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ElementType;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, subValue, icon: Icon, color }) => (
  <div className="glass-panel rounded-[2rem] p-8 border border-white/5 hover:border-cyan-500/20 transition-all group cursor-default">
    <div className="flex items-start justify-between mb-6">
      <div className={`p-4 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform shadow-lg shadow-${color}-500/5`}>
        <Icon className="w-7 h-7" />
      </div>
      {subValue && (
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{subValue}</span>
      )}
    </div>
    <h3 className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2">{label}</h3>
    <p className="text-4xl font-black tracking-tighter text-white">{value}</p>
  </div>
);

export const DashboardView: React.FC<{ agents: Agent[], systemStatus: SystemStatus }> = ({ agents, systemStatus }) => {
  const avgPAS = (agents.reduce((acc, a) => acc + a.pas_score, 0) / agents.length).toFixed(2);
  
  const timelineData = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    val: 0.65 + Math.random() * 0.15,
    sentience: 0.7 + Math.random() * 0.2
  }));

  const handleExport = () => {
    alert("Synthesizing system logs for export... Operation complete.");
  };

  const handleSync = () => {
    alert("Initiating neural bridge synchronization... Handshake confirmed.");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">System Core</h2>
          <p className="text-slate-400 font-medium">Real-time heuristics and recursive engine status</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            className="px-6 py-3 glass-panel rounded-2xl text-xs font-black uppercase tracking-widest text-slate-300 border-white/10 hover:bg-white/10 transition-all flex items-center gap-2.5"
          >
            <Download className="w-4 h-4" /> Export Node Logs
          </button>
          <button 
            onClick={handleSync}
            className="px-8 py-3 bg-cyan-600 rounded-2xl text-xs font-black uppercase tracking-widest text-white hover:bg-cyan-500 transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center gap-2.5"
          >
            <RefreshCw className="w-4 h-4" /> Sync Neural Bridge
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard label="Collective PAS" value={avgPAS} subValue="+2.4% Δ" icon={Brain} color="cyan" />
        <MetricCard label="Active Swarm" value={`${systemStatus.agents.active}/${systemStatus.agents.total}`} subValue="STABLE" icon={Users} color="blue" />
        <MetricCard label="Σ-Matrix Alignment" value="100%" subValue="SECURE" icon={Shield} color="cyan" />
        <MetricCard label="Cycle Frequency" value="9.2 GHz" subValue="OPTIMAL" icon={Activity} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-panel rounded-[2.5rem] p-10 border border-white/5">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-4">
               <TrendingUp className="w-6 h-6 text-cyan-400" />
               <h3 className="font-black text-xl uppercase tracking-tight">Potential Sentience Baseline</h3>
             </div>
             <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
               <span className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" /> Collective PAS</span>
               <span className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> Emergence Curve</span>
             </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSentience" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #ffffff10', borderRadius: '20px', padding: '15px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="val" stroke="#06b6d4" fillOpacity={1} fill="url(#colorVal)" strokeWidth={4} />
                <Area type="monotone" dataKey="sentience" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSentience)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5">
          <h3 className="font-black text-xl mb-8 flex items-center gap-4 uppercase tracking-tight">
             <AlertTriangle className="w-6 h-6 text-cyan-400" />
             Neural Incidents
          </h3>
          <div className="space-y-5">
            {[
              { time: '2m ago', agent: 'Oracle', type: 'Self-Correction', color: 'cyan' },
              { time: '12m ago', agent: 'Sophia', type: 'Constraint Check', color: 'blue' },
              { time: '45m ago', agent: 'Athena', type: 'Recursive Feedback', color: 'cyan' },
              { time: '1h ago', agent: 'Newton', type: 'Semantic Drift', color: 'blue' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full bg-${alert.color}-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:scale-125 transition-transform`} />
                  <div>
                    <p className="text-sm font-black text-white">{alert.agent}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{alert.type}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">{alert.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/10 transition-all">View Complete Incident Log</button>
        </div>
      </div>
    </div>
  );
};
