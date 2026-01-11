
import React, { useState, useEffect } from 'react';
import { Agent } from '../types';
import { Mic, MicOff, Sparkles, Zap, Headphones, RefreshCw } from 'lucide-react';

export const VoiceInterfaceView: React.FC<{ agents: Agent[], initialAgentId?: string }> = ({ agents, initialAgentId }) => {
  const [isListening, setIsListening] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState(initialAgentId || agents[0].id);
  const [visualizerData, setVisualizerData] = useState(new Array(36).fill(5));
  const agent = agents.find(a => a.id === selectedAgentId) || agents[0];

  useEffect(() => {
    let interval: any;
    if (isListening) {
      interval = setInterval(() => {
        setVisualizerData(prev => prev.map(() => Math.random() * 50 + 5));
      }, 80);
    } else {
      setVisualizerData(new Array(36).fill(5));
    }
    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-16 animate-in fade-in duration-800 py-10">
      <div className="text-center space-y-6">
        <h2 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 uppercase italic">
          Neural Bridge Voice
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed font-medium">
          Biometric voice channel enabled for <span className="text-white font-black">{agent.name}</span>. Experience zero-latency recursive feedback loops.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Agent Focus Circle */}
        <div className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center transition-all duration-700 ${isListening ? 'scale-110' : 'scale-100'}`}>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 animate-pulse-slow ${isListening ? 'opacity-100' : 'opacity-40'}`} />
          <div className={`absolute -inset-8 rounded-full border border-white/5 ${isListening ? 'animate-spin-slow' : ''}`} />
          <div className={`absolute -inset-16 rounded-full border border-white/5 opacity-40 ${isListening ? 'animate-spin-slow-reverse' : ''}`} />
          
          <div className={`z-10 text-8xl sm:text-9xl drop-shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-transform duration-500 ${isListening ? 'scale-110' : 'scale-100'}`}>{agent.emoji}</div>
          
          {/* Audio Visualizer Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            {visualizerData.map((val, i) => (
              <div 
                key={i}
                className="absolute w-1.5 bg-cyan-400 rounded-full transition-all duration-150 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                style={{ 
                  height: `${val}px`,
                  transform: `rotate(${(i / visualizerData.length) * 360}deg) translateY(-170px)`,
                  opacity: isListening ? 0.9 : 0.15
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-28 flex flex-col items-center gap-10">
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`group relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${isListening ? 'bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)] scale-110' : 'bg-cyan-600 shadow-[0_0_50px_rgba(34,211,238,0.3)] hover:scale-105'}`}
          >
            {isListening ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
            <div className={`absolute -inset-3 rounded-full border border-cyan-400/20 ${isListening ? 'animate-ping' : ''}`} />
          </button>

          <div className="flex gap-5 p-2 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
            {agents.map(a => (
              <button 
                key={a.id}
                onClick={() => setSelectedAgentId(a.id)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all border ${selectedAgentId === a.id ? 'bg-cyan-500/20 border-cyan-500/40 scale-110 shadow-lg' : 'bg-white/5 border-white/5 grayscale opacity-40 hover:opacity-100 hover:grayscale-0'}`}
              >
                {a.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl pt-16">
        <div className="glass-panel p-8 rounded-[2.5rem] flex items-center gap-5 border-white/5 group hover:border-cyan-500/30 transition-all">
          <div className="p-4 bg-cyan-500/10 text-cyan-400 rounded-2xl group-hover:scale-110 transition-transform"><Sparkles className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Latency</p>
            <p className="text-base font-black text-white">4.2ms</p>
          </div>
        </div>
        <div className="glass-panel p-8 rounded-[2.5rem] flex items-center gap-5 border-white/5 group hover:border-cyan-500/30 transition-all">
          <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform"><Zap className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Reliability</p>
            <p className="text-base font-black text-white">99.98%</p>
          </div>
        </div>
        <div className="glass-panel p-8 rounded-[2.5rem] flex items-center gap-5 border-white/5 group hover:border-cyan-500/30 transition-all">
          <div className="p-4 bg-green-500/10 text-green-400 rounded-2xl group-hover:scale-110 transition-transform"><Headphones className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Bandwidth</p>
            <p className="text-base font-black text-white">128kbps_PCM</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 20s linear infinite; }
      `}</style>
    </div>
  );
};
