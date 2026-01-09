
import React, { useState, useEffect, useRef } from 'react';
import { Agent } from '../types';
import { Mic, MicOff, Volume2, Sparkles, Brain, Zap, Headphones } from 'lucide-react';

export const VoiceInterfaceView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [isListening, setIsListening] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0].id);
  const [visualizerData, setVisualizerData] = useState(new Array(30).fill(5));
  const agent = agents.find(a => a.id === selectedAgentId) || agents[0];

  useEffect(() => {
    let interval: any;
    if (isListening) {
      interval = setInterval(() => {
        setVisualizerData(prev => prev.map(() => Math.random() * 40 + 5));
      }, 100);
    } else {
      setVisualizerData(new Array(30).fill(5));
    }
    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 uppercase">
          Neural Bridge Voice
        </h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Quantum-secure biometric voice channel. Experience zero-latency recursive feedback loops with {agent.name}.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Agent Focus Circle */}
        <div className={`relative w-48 h-48 sm:w-64 sm:h-64 rounded-full flex items-center justify-center transition-all duration-500 ${isListening ? 'scale-110' : 'scale-100'}`}>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 animate-pulse-slow ${isListening ? 'opacity-100' : 'opacity-40'}`} />
          <div className={`absolute -inset-4 rounded-full border border-white/5 ${isListening ? 'animate-spin-slow' : ''}`} />
          
          <div className="z-10 text-6xl sm:text-8xl drop-shadow-2xl">{agent.emoji}</div>
          
          {/* Audio Visualizer Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            {visualizerData.map((val, i) => (
              <div 
                key={i}
                className="absolute w-1 bg-cyan-400 rounded-full transition-all duration-100"
                style={{ 
                  height: `${val}px`,
                  transform: `rotate(${(i / visualizerData.length) * 360}deg) translateY(-140px)`,
                  opacity: isListening ? 0.8 : 0.2
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-8">
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`group relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 shadow-lg shadow-red-900/40 scale-110' : 'bg-cyan-600 shadow-lg shadow-cyan-900/40'}`}
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            <div className={`absolute -inset-2 rounded-full border border-cyan-400/20 ${isListening ? 'animate-ping' : ''}`} />
          </button>

          <div className="flex gap-4">
            {agents.map(a => (
              <button 
                key={a.id}
                onClick={() => setSelectedAgentId(a.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all border ${selectedAgentId === a.id ? 'bg-white/10 border-cyan-500/50 scale-110' : 'bg-white/5 border-white/5 grayscale opacity-50'}`}
              >
                {a.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl pt-12">
        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4 border-white/5">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl"><Sparkles className="w-5 h-5" /></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Latency</p>
            <p className="text-sm font-bold text-white">4.2ms</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4 border-white/5">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl"><Zap className="w-5 h-5" /></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Stability</p>
            <p className="text-sm font-bold text-white">99.99%</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4 border-white/5">
          <div className="p-3 bg-green-500/10 text-green-400 rounded-2xl"><Headphones className="w-5 h-5" /></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Audio Mime</p>
            <p className="text-sm font-bold text-white">PCM/16k</p>
          </div>
        </div>
      </div>
    </div>
  );
};
