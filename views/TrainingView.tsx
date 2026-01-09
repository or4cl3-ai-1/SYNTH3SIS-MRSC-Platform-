
import React, { useState, useEffect } from 'react';
import { Agent } from '../types';
import { Upload, Star, Play, CheckCircle, BarChart, Database, BookOpen, AlertCircle } from 'lucide-react';

export const TrainingView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id || '');
  const [isUploading, setIsUploading] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setTrainingLogs(['Initializing recursive neural bridge...', 'Loading dataset vectors...']);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setTrainingLogs(logs => [...logs, 'Training cycle complete. Weight synchronization established.', 'Performance delta: +4.2% coherence.']);
          return 100;
        }
        if (prev % 20 === 0) {
           setTrainingLogs(logs => [...logs, `Analyzing epoch ${prev / 20 + 1}... Found ${Math.floor(Math.random() * 50)} optimizations.`]);
        }
        return prev + 2;
      });
    }, 100);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setTrainingLogs(logs => [...logs, 'Dataset "heuristic_v3_set.json" uploaded successfully. Ready for processing.']);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Neural Training</h2>
          <p className="text-slate-400">Refine agent heuristics and recursive weight mapping</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={simulateUpload}
             disabled={isUploading}
             className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all disabled:opacity-50"
           >
             <Upload className="w-4 h-4" /> {isUploading ? 'Uploading...' : 'Upload Dataset'}
           </button>
           <button 
             onClick={startTraining}
             disabled={isTraining || isUploading}
             className="px-6 py-2 bg-cyan-600 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50"
           >
             <Play className="w-4 h-4" /> Start Cycle
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Agent Selection & Stats */}
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
               <Database className="w-5 h-5 text-cyan-400" />
               Select Neural Node
            </h3>
            <div className="space-y-2">
              {agents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                    selectedAgentId === agent.id 
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-white' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{agent.emoji}</span>
                  <div className="text-left">
                    <p className="text-sm font-bold">{agent.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{agent.role}</p>
                  </div>
                  {selectedAgentId === agent.id && <CheckCircle className="ml-auto w-4 h-4 text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-white/5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
               <BarChart className="w-5 h-5 text-purple-400" />
               Training Metrics
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Knowledge Density</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">4.8 TB</span>
                  <span className="text-xs font-bold text-green-400">+12%</span>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Coherence Variance</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">0.0024 σ</span>
                  <span className="text-xs font-bold text-cyan-400">Stable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main: Training Progress & Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl p-8 border border-white/5 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-bold text-xl flex items-center gap-3">
                 <BookOpen className="w-6 h-6 text-cyan-400" />
                 Active Session: {selectedAgent?.name}
               </h3>
               {isTraining && (
                 <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" /> Cycle in progress
                 </div>
               )}
            </div>

            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span>Progress Index</span>
                  <span>{trainingProgress}%</span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/10">
                   <div 
                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 transition-all duration-300" 
                    style={{ width: `${trainingProgress}%`, backgroundSize: '200% 100%' }} 
                   />
                </div>
              </div>

              <div className="bg-black/40 rounded-2xl border border-white/5 p-6 h-64 overflow-y-auto font-mono text-xs space-y-2 custom-scrollbar">
                {trainingLogs.map((log, i) => (
                  <div key={i} className="flex gap-3 opacity-80 animate-in slide-in-from-left-2 fade-in duration-300">
                    <span className="text-slate-600">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                    <span className={log.includes('complete') ? 'text-green-400 font-bold' : 'text-slate-300'}>{log}</span>
                  </div>
                ))}
                {trainingLogs.length === 0 && (
                  <div className="h-full flex items-center justify-center text-slate-600 italic">
                    Waiting for cycle initiation...
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <h4 className="font-bold text-white mb-1">Human-in-the-Loop Feedback</h4>
                    <p className="text-xs text-slate-400">Rate the coherence and accuracy of the latest neural response</p>
                 </div>
                 <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        onClick={() => setFeedbackRating(star)}
                        className={`p-2 rounded-xl border transition-all ${
                          feedbackRating >= star 
                            ? 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400' 
                            : 'bg-white/5 border-white/5 text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        <Star className={`w-6 h-6 ${feedbackRating >= star ? 'fill-yellow-400' : ''}`} />
                      </button>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-3xl flex items-center gap-4">
             <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl">
               <AlertCircle className="w-6 h-6" />
             </div>
             <div>
               <p className="text-sm font-bold text-white mb-0.5">Recursive Safety Check Passed</p>
               <p className="text-xs text-slate-400">Sigma Matrix confirms all training weights are within ethical boundaries.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
