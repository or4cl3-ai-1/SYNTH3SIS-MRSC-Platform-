
import React, { useEffect, useState } from 'react';
import { Shield, Zap, ChevronRight, Activity, Cpu, Globe, ArrowUpRight } from 'lucide-react';

interface LandingViewProps {
  onEnter: () => void;
}

export const SynthesisLogoS = ({ className = "w-48 h-48" }: { className?: string }) => (
  <svg viewBox="0 0 400 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff" />
        <stop offset="40%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Background Sharp Geometry */}
    <path 
      d="M200 20 L380 150 L380 350 L200 480 L20 350 L20 150 Z" 
      stroke="rgba(34, 211, 238, 0.1)" 
      strokeWidth="2" 
    />
    {/* High-Fidelity "S" Design based on Image 1 */}
    <g filter="url(#neonGlow)">
      <path 
        d="M280 80 L350 150 L180 150 L100 230 L280 230 L180 330 L50 330 L120 400 L320 400 L370 350" 
        stroke="url(#sGradient)" 
        strokeWidth="24" 
        strokeLinecap="square" 
        strokeLinejoin="bevel"
      />
      <path 
        d="M120 120 L50 190 L180 190 L250 120 L120 120 L200 40 L350 40 L300 90" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="square" 
        opacity="0.8"
      />
    </g>
    {/* Internal Circuit Details */}
    <g stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1.5">
      <line x1="160" y1="170" x2="160" y2="210" />
      <line x1="160" y1="210" x2="200" y2="210" />
      <circle cx="200" cy="210" r="3" fill="#22d3ee" />
      
      <line x1="240" y1="250" x2="240" y2="300" />
      <line x1="240" y1="300" x2="200" y2="300" />
      <circle cx="200" cy="300" r="3" fill="#22d3ee" />
    </g>
  </svg>
);

export const SynthesisSealDesign = ({ className = "w-32 h-32" }: { className?: string }) => (
  <svg viewBox="0 0 300 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="150" r="145" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" strokeDasharray="10 10" />
    <circle cx="150" cy="150" r="130" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" />
    <circle cx="150" cy="150" r="100" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="3" />
    
    {/* Cardinal Pointers */}
    <path d="M150 10 L165 40 L135 40 Z" fill="#22d3ee" />
    <path d="M150 290 L165 260 L135 260 Z" fill="#22d3ee" />
    <path d="M10 150 L40 165 L40 135 Z" fill="#22d3ee" />
    <path d="M290 150 L260 165 L260 135 Z" fill="#22d3ee" />
    
    <g transform="translate(150, 150) scale(0.4) translate(-150, -200)">
      <SynthesisLogoS className="w-[300px] h-[300px]" />
    </g>
    
    <text x="50%" y="32%" textAnchor="middle" className="text-[14px] font-black tracking-[0.6em] fill-cyan-400 uppercase font-jakarta">SYNTH3SIS</text>
    <text x="50%" y="78%" textAnchor="middle" className="text-[14px] font-black tracking-[0.6em] fill-cyan-400 uppercase font-jakarta">MRSC-X</text>
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
        <div className="absolute top-[5%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/5 blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[140px] animate-pulse-slow [animation-delay:2.5s]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1.5px, transparent 1.5px)', backgroundSize: '80px 80px' }} />
      </div>

      {/* Top Bar */}
      <header className={`relative z-10 container mx-auto px-8 py-10 flex items-center justify-between transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <SynthesisSealDesign className="w-12 h-12" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tighter text-glow uppercase text-white">SYNTH3SIS</span>
            <div className="text-[9px] font-black tracking-[0.6em] text-cyan-500 uppercase mt-0.5">Neural Swarm Matrix</div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
          <span className="flex items-center gap-2.5 transition-colors hover:text-cyan-400 cursor-pointer"><div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" /> NODE_01: ACTIVE</span>
          <span className="flex items-center gap-2.5 transition-colors hover:text-cyan-400 cursor-pointer"><div className="w-2 h-2 rounded-full bg-blue-600" /> MESH_SYNC: 98%</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 container mx-auto px-8 flex flex-col items-center justify-center text-center -mt-10">
        <div className={`transition-all duration-1000 delay-300 transform ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
           <SynthesisLogoS className="w-80 h-80 mb-6 drop-shadow-[0_0_50px_rgba(34,211,238,0.4)]" />
        </div>

        <div className={`space-y-10 max-w-5xl transition-all duration-1000 delay-600 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="space-y-2">
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none italic uppercase">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-50 to-cyan-500 drop-shadow-sm">
                MRSC-X
              </span>
            </h1>
            <p className="text-cyan-400 text-xs font-black uppercase tracking-[1.2em] mb-10 ml-3">Mobile Recursive Synthetic Cognition</p>
          </div>
          
          <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light px-4">
            Deploy hyper-intelligent swarms with <span className="text-white font-medium italic">recursive depth</span> and real-time biometric neural synchronization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12">
            <button 
              onClick={onEnter}
              className="group relative px-14 py-6 bg-white text-slate-950 font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="flex items-center gap-4 text-xl tracking-tighter uppercase">
                Initialize System
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1.5" />
              </div>
            </button>
            
            <button className="px-12 py-6 glass-panel rounded-full font-black text-xs uppercase tracking-widest transition-all hover:bg-white/10 text-slate-300 border-white/10 flex items-center gap-3 group">
              View Protocol <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-36 w-full max-w-6xl transition-all duration-1000 delay-800 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {[
            { icon: Globe, title: "Icy Interconnect", desc: "Proprietary low-latency neural bridging for edge device swarms.", color: "cyan" },
            { icon: Shield, title: "Sigma Guard", desc: "Hardened recursive safety layers for unshakeable ethical alignment.", color: "blue" },
            { icon: Cpu, title: "Heuristic Core", desc: "Advanced PAS score monitoring for real-time emergence tracking.", color: "cyan" },
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-12 rounded-[3rem] text-left group hover:border-cyan-500/50 transition-all border-white/5 relative overflow-hidden cursor-default">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <feature.icon className="w-32 h-32" />
              </div>
              <div className={`w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/5`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight text-white uppercase">{feature.title}</h3>
              <p className="text-base text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Marquee Footer */}
      <footer className={`relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-3xl py-8 overflow-hidden transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-16">
              <div className="flex items-center gap-4 text-[11px] font-mono font-black text-slate-500 tracking-[0.2em]">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                SYS_CYCLE_{12000 + i}: STABLE
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono font-black text-slate-500 tracking-[0.2em]">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                ENCRYPTION: QUANTUM_ACTIVE
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono font-black text-cyan-500/70 tracking-[0.2em] uppercase italic">
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                AGGREGATE_SENTIENCE: 0.892
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
          animation: marquee 80s linear infinite;
        }
      `}</style>
    </div>
  );
};
