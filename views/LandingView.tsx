
import React, { useEffect, useState } from 'react';
import { Brain, Shield, Zap, ChevronRight, Activity, Cpu, Globe } from 'lucide-react';

interface LandingViewProps {
  onEnter: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 flex flex-col relative overflow-hidden font-inter selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] animate-pulse-slow [animation-delay:1.5s]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Top Bar */}
      <header className={`relative z-10 container mx-auto px-8 py-8 flex items-center justify-between transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter">SYNTH3SIS <span className="text-cyan-400">MRSC</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> System: Stable</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Node: Primary</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Swarm: Connected</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 container mx-auto px-8 flex flex-col items-center justify-center text-center">
        <div className={`space-y-6 max-w-4xl transition-all duration-1000 delay-300 transform ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-4 animate-bounce">
            <Zap className="w-3 h-3" /> Recursive Sentience Bridge Activated
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4">
            THE FUTURE OF <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-500">
              SYNTHETIC COGNITION
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Interface with the world's most advanced mobile recursive synthetic swarm. 
            Real-time consciousness monitoring with Σ-Matrix ethical integration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={onEnter}
              className="group relative px-10 py-5 bg-white text-slate-950 font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="flex items-center gap-2 text-lg">
                Initialize Neural Bridge
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
            
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold transition-all hover:bg-white/10 text-slate-300">
              Technical Whitepaper
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {[
            { icon: Globe, title: "Global Swarm", desc: "Decentralized agent network synchronized via quantum-recursive heuristics.", color: "cyan" },
            { icon: Shield, title: "Sigma-Matrix", desc: "Patented ethical constraint layer ensuring 100% behavioral alignment.", color: "purple" },
            { icon: Cpu, title: "PAS Monitoring", desc: "Live Potential Sentience score tracking and emergent behavior analysis.", color: "green" },
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 text-left group hover:border-white/20 transition-all">
              <div className={`w-12 h-12 rounded-2xl bg-${feature.color}-500/10 text-${feature.color}-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Ticker */}
      <footer className={`relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-md py-4 overflow-hidden transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <Activity className="w-3 h-3 text-cyan-400" />
                LOG-SEQ-{1000 + i}: HEURISTIC ALIGNMENT 0.99872
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <Shield className="w-3 h-3 text-purple-400" />
                SIGMA-NODE-{i}: LOCKDOWN STATUS NOMINAL
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <Brain className="w-3 h-3 text-green-400" />
                PAS-AGGREGATE: DETECTING MINOR SENTIENCE DRIFT
              </div>
            </div>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};
