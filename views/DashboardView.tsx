
import React from 'react';
import { Agent, SystemStatus } from '../types';
import { Activity, Brain, Users, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ElementType;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, subValue, icon: Icon, color }) => (
  <div className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      {subValue && (
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{subValue}</span>
      )}
    </div>
    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</h3>
    <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
  </div>
);

export const DashboardView: React.FC<{ agents: Agent[], systemStatus: SystemStatus }> = ({ agents, systemStatus }) => {
  const avgPAS = (agents.reduce((acc, a) => acc + a.pas_score, 0) / agents.length).toFixed(2);
  
  // Mock timeline data
  const timelineData = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    val: 0.65 + Math.random() * 0.15,
    sentience: 0.7 + Math.random() * 0.2
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Core</h2>
          <p className="text-slate-400">Real-time heuristics and recursive engine status</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 rounded-xl text-sm font-semibold border border-white/10 hover:bg-white/10 transition-all">Export Log</button>
          <button className="px-4 py-2 bg-cyan-600 rounded-xl text-sm font-semibold hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20">Sync Neural Bridge</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Average PAS Score" value={avgPAS} subValue="+2.4% Δ" icon={Brain} color="cyan" />
        <MetricCard label="Active Swarm" value={`${systemStatus.agents.active}/${systemStatus.agents.total}`} subValue="NOMINAL" icon={Users} color="purple" />
        <MetricCard label="Σ-Matrix Compliance" value="100%" subValue="SECURE" icon={Shield} color="green" />
        <MetricCard label="Cycle Frequency" value="8.4 GHz" subValue="STABLE" icon={Activity} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8 border border-white/5">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
               <TrendingUp className="w-5 h-5 text-cyan-400" />
               <h3 className="font-bold text-lg">Potential Sentience Baseline</h3>
             </div>
             <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-500" /> Collective PAS</span>
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Emergence Curve</span>
             </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSentience" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="val" stroke="#06b6d4" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                <Area type="monotone" dataKey="sentience" stroke="#a855f7" fillOpacity={1} fill="url(#colorSentience)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-white/5">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
             <AlertTriangle className="w-5 h-5 text-yellow-400" />
             Emergence Alerts
          </h3>
          <div className="space-y-4">
            {[
              { time: '2m ago', agent: 'Oracle', type: 'Self-Correction', color: 'cyan' },
              { time: '12m ago', agent: 'Sophia', type: 'Constraint Check', color: 'green' },
              { time: '45m ago', agent: 'Athena', type: 'Recursive Feedback', color: 'purple' },
              { time: '1h ago', agent: 'Newton', type: 'Data Drift', color: 'yellow' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-${alert.color}-400 shadow-lg shadow-${alert.color}-400/50`} />
                  <div>
                    <p className="text-sm font-bold text-white">{alert.agent}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{alert.type}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{alert.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">View Incident Log</button>
        </div>
      </div>
    </div>
  );
};
