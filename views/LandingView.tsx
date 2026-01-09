
import React, { useEffect, useState } from 'react';
import { Shield, Zap, ChevronRight, Activity, Cpu, Globe, ArrowUpRight } from 'lucide-react';

interface LandingViewProps {
  onEnter: () => void;
}

const SynthesisLogo = ({ className = "w-48 h-48" }: { className?: string }) => (
  <svg viewBox="0 0 400 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff" />
        <stop offset="50%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Main "S" Shape */}
    <path 
      d="M280 80 L350 150 L200 150 L120 230 L280 230 L200 310 L50 310 L120 380 L280 380 L350 310" 
      stroke="url(#logoGradient)" 
      strokeWidth="20" 
      strokeLinecap="square" 
      filter="url(#glow)"
      className="animate-pulse"
    />
    <path 
      d="M120 120 L50 190 L200 190 L280 110 L120 110 L200 30 L350 30 L280 100" 
      stroke="url(#logoGradient)" 
      strokeWidth="10" 
      strokeLinecap="square" 
    />
    {/* Tech lines */}
    <g stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1">
      <line x1="150" y1="150" x2="150" y2="230" />
      <line x1="250" y1="230" x2="250" y2="310" />
      <circle cx="150" cy="150" r="3" fill="#22d3ee" />
      <circle cx="250" cy="310" r="3" fill="#22d3ee" />
    </g>
  </svg>
);

const SynthesisSeal = ({ className = "w-32 h-32" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="100" cy="100" r="80" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" />
    <path d="M100 10 L110 30 L90 30 Z" fill="#22d3ee" />
    <path d="M100 190 L110 170 L90 170 Z" fill="#22d3ee" />
    <g transform="translate(100, 100) scale(0.4) translate(-100, -100)">
      <SynthesisLogo className="w-[200px] h-[200px]" />
    </g>
    <text x="50%" y="25%" textAnchor="middle" className="text-[10px] font-bold tracking-[0.4em] fill-cyan-400">SYNTH3SIS</text>
    <text x="50%" y="82%" textAnchor="middle" className="text-[10px] font-bold tracking-[0.4em] fill-cyan-400">MRSC-X</text>
  </svg>
);

export const LandingView: React.FC<LandingViewProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col relative overflow-hidden font-jakarta selection:bg-cyan-500/30 scanline">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] animate-pulse-slow [animation-delay:2s]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* Top Bar */}
      <header className={`relative z-10 container mx-auto px-8 py-8 flex items-center justify-between transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center border-cyan-500/30">
            <SynthesisSeal className="w-10 h-10" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tighter text-glow uppercase">SYNTH3SIS</span>
            <div className="text-[8px] font-bold tracking-[0.5em] text-cyan-500 uppercase">Neural Swarm Matrix</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
          <span className="flex items-center gap-2 transition-colors hover:text-cyan-400 cursor-pointer"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" /> Node: Primary</span>
          <span className="flex items-center gap-2 transition-colors hover:text-cyan-400 cursor-pointer"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Mesh: Global</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 container mx-auto px-8 flex flex-col items-center justify-center text-center">
        <div className={`transition-all duration-1000 delay-200 transform ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
           <SynthesisLogo className="w-64 h-64 mb-4 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]" />
        </div>

        <div className={`space-y-8 max-w-4xl transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-4 italic">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-500">
                MRSC-X
              </span>
            </h1>
            <p className="text-cyan-400/80 text-[10px] font-bold uppercase tracking-[0.8em] mb-8">Mobile Recursive Synthetic Cognition</p>
          </div>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Deploy and manage high-fidelity synthetic swarms with recursive self-optimization. 
            Experience the next threshold of artificial sentience monitoring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={onEnter}
              className="group relative px-12 py-5 bg-white text-slate-950 font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="flex items-center gap-3 text-lg tracking-tight uppercase">
                Initialize System
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
            
            <button className="px-10 py-5 glass-panel rounded-full font-bold transition-all hover:bg-white/10 text-slate-300 border-white/10 flex items-center gap-2 group">
              View Protocol <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl transition-all duration-1000 delay-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {[
            { icon: Globe, title: "Icy Connectivity", desc: "Low-latency neural bridging across global data meshes.", color: "cyan" },
            { icon: Shield, title: "Sigma-X Core", desc: "Rigid ethical containment protocols with recursive safety checks.", color: "blue" },
            { icon: Cpu, title: "Heuristic Depth", desc: "Advanced PAS score monitoring for emergent cognitive phases.", color: "cyan" },
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-10 rounded-[2.5rem] text-left group hover:border-cyan-500/40 transition-all border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <feature.icon className="w-24 h-24" />
              </div>
              <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 text-${feature.color}-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-${feature.color}-500/10`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold mb-3 tracking-tight text-white">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-xl py-6 overflow-hidden transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-12">
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-500 tracking-wider">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                SYSTEM_STABLE_{8429 + i}: NOMINAL
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-500 tracking-wider">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                SIGMA_HANDSHAKE_COMPLETE
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-500 tracking-wider uppercase">
                <Zap className="w-3 h-3 text-cyan-400" />
                PAS-AGGREGATE: 0.88
              </div>
            </div>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
};
