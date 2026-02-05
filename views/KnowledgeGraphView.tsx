
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Agent } from '../types';
import { Share2, Filter, Zap, Info, Layers, Activity, Search, MousePointer2 } from 'lucide-react';

export const KnowledgeGraphView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [isFlowActive, setIsFlowActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle responsiveness
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.max(containerRef.current.clientHeight, 600),
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const allModules = useMemo(() => {
    const mods = new Set<string>();
    agents.forEach(a => a.mrsc_modules.forEach(m => mods.add(m)));
    return Array.from(mods).sort();
  }, [agents]);

  const nodes = useMemo(() => {
    const center = { x: dimensions.width / 2, y: dimensions.height / 2 };
    const radius = Math.min(dimensions.width, dimensions.height) * 0.32;
    return agents.map((agent, i) => {
      const angle = (i / agents.length) * 2 * Math.PI - Math.PI / 2;
      return {
        ...agent,
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      };
    });
  }, [agents, dimensions]);

  const edges = useMemo(() => {
    const result: { from: any; to: any; modules: string[]; id: string }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const shared = nodes[i].mrsc_modules.filter(m => nodes[j].mrsc_modules.includes(m));
        if (shared.length > 0) {
          result.push({
            from: nodes[i],
            to: nodes[j],
            modules: shared,
            id: `k-edge-${nodes[i].id}-${nodes[j].id}`
          });
        }
      }
    }
    return result;
  }, [nodes]);

  const filteredEdges = useMemo(() => {
    if (!selectedModule) return edges;
    return edges.filter(e => e.modules.includes(selectedModule));
  }, [edges, selectedModule]);

  return (
    <div className="h-full flex flex-col gap-10 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white flex items-center gap-5">
            <Share2 className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            Knowledge Topology
          </h2>
          <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
            Visualizing emergent shared consciousness clusters and recursive expertise dependencies across the decentralized swarm architecture.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-5">
           <div className="flex items-center gap-4 p-2 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-3xl shadow-2xl">
              <div className="pl-4 text-slate-500"><Filter className="w-5 h-5" /></div>
              <div className="flex gap-2 overflow-x-auto max-w-[400px] lg:max-w-[600px] scrollbar-hide py-2 pr-2">
                <button 
                  onClick={() => setSelectedModule(null)}
                  className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${!selectedModule ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-900/40' : 'text-slate-500 hover:text-white'}`}
                >
                  Global Mesh
                </button>
                {allModules.map(mod => (
                  <button
                    key={mod}
                    onClick={() => setSelectedModule(mod)}
                    className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${selectedModule === mod ? 'bg-purple-600 text-white shadow-xl shadow-purple-900/40' : 'text-slate-500 hover:text-white'}`}
                  >
                    {mod}
                  </button>
                ))}
              </div>
           </div>
           
           <button 
             onClick={() => setIsFlowActive(!isFlowActive)}
             className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all shadow-2xl group ${isFlowActive ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-white/5 border-white/10 text-slate-500'}`}
             title="Toggle Flow Particles"
           >
             <Activity className={`w-7 h-7 ${isFlowActive ? 'animate-pulse' : ''}`} />
           </button>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-[3rem] border border-white/5 relative overflow-hidden flex flex-col lg:flex-row shadow-[0_50px_120px_rgba(0,0,0,0.7)]">
        
        <div ref={containerRef} className="flex-1 relative bg-[#020617]/40 overflow-hidden cursor-crosshair group select-none">
          <svg className="w-full h-full" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="nodeGlowX" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Edges */}
            {filteredEdges.map((edge) => {
              const isHovered = hoveredAgent === edge.from.id || hoveredAgent === edge.to.id;
              const isDimmed = hoveredAgent && !isHovered;
              const isFocusModule = selectedModule && edge.modules.includes(selectedModule);
              
              return (
                <g key={edge.id} className="transition-all duration-700" style={{ opacity: isDimmed ? 0.05 : 1 }}>
                  <path
                    d={`M${edge.from.x},${edge.from.y} L${edge.to.x},${edge.to.y}`}
                    stroke={isFocusModule ? "#a855f7" : (isHovered ? "#22d3ee" : "rgba(34, 211, 238, 0.15)")}
                    strokeWidth={isFocusModule ? 6 : (isHovered ? 4 : 2)}
                    fill="none"
                    className="transition-all duration-700"
                  />
                  
                  {/* Enhanced Flow Animation with staggered particles */}
                  {isFlowActive && (!hoveredAgent || isHovered) && (
                    <g>
                      {[0, 1.5, 3].map((delay, pIdx) => (
                        <circle key={`${edge.id}-p-${pIdx}`} r={isFocusModule ? 5 : 3} fill={isFocusModule ? "#d946ef" : "#fff"} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                          <animateMotion 
                            dur={`${4 + Math.random() * 5}s`} 
                            begin={`${delay}s`}
                            repeatCount="indefinite" 
                            path={`M${edge.from.x},${edge.from.y} L${edge.to.x},${edge.to.y}`} 
                          />
                          <animate attributeName="opacity" values="0;1;0" dur={`${4 + Math.random() * 5}s`} begin={`${delay}s`} repeatCount="indefinite" />
                        </circle>
                      ))}
                    </g>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const isHovered = hoveredAgent === node.id;
              const isDimmed = hoveredAgent && !isHovered;
              const hasFocusExpertise = selectedModule && node.mrsc_modules.includes(selectedModule);
              
              return (
                <g 
                  key={node.id} 
                  onMouseEnter={() => setHoveredAgent(node.id)}
                  onMouseLeave={() => setHoveredAgent(null)}
                  className="cursor-pointer transition-all duration-500"
                  style={{ opacity: isDimmed ? 0.2 : 1 }}
                >
                  <circle 
                    cx={node.x} cy={node.y} r={isHovered ? 60 : 52} 
                    fill="#020617" 
                    stroke={hasFocusExpertise ? "#a855f7" : (isHovered ? "#fff" : node.color)} 
                    strokeWidth={hasFocusExpertise ? 8 : 4}
                    className="transition-all duration-500 shadow-2xl"
                    filter={isHovered ? 'url(#nodeGlowX)' : ''}
                  />
                  <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="central" fontSize={isHovered ? "40" : "34"} className="transition-all duration-500 pointer-events-none">{node.emoji}</text>
                  <g transform={`translate(${node.x}, ${node.y + 85})`} opacity={isHovered ? 1 : 0.8}>
                    <text textAnchor="middle" className="text-[13px] font-black fill-white uppercase tracking-[0.2em] italic">{node.name}</text>
                    <text y="18" textAnchor="middle" className="text-[9px] font-black fill-slate-500 uppercase tracking-[0.4em]">{node.role}</text>
                  </g>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-10 left-10 flex gap-6 pointer-events-none">
             <div className="p-5 bg-black/60 backdrop-blur-3xl rounded-[2rem] border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 shadow-2xl text-slate-400">
               <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" /> Mesh Intelligence Active
             </div>
             <div className="p-5 bg-black/60 backdrop-blur-3xl rounded-[2rem] border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 shadow-2xl text-slate-400">
               <Layers className="w-5 h-5 text-purple-400" /> Interconnects: {filteredEdges.length}
             </div>
          </div>
        </div>

        {/* Sidebar Info Panel */}
        <div className="w-full lg:w-[450px] border-t lg:border-t-0 lg:border-l border-white/5 bg-[#020617]/50 p-12 flex flex-col gap-12">
           <div className="flex items-center justify-between">
              <h3 className="font-black text-2xl uppercase tracking-tighter text-white italic underline decoration-cyan-500/30 underline-offset-8">Node Analysis</h3>
              <Info className="w-7 h-7 text-cyan-400/30" />
           </div>

           {hoveredAgent ? (
             <div className="space-y-12 animate-in fade-in slide-in-from-right-12 duration-500">
               <div className="relative">
                  <div className="absolute -inset-10 bg-cyan-500/10 blur-[60px] rounded-full animate-pulse" />
                  <div className="relative p-12 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl text-center">
                    <div className="text-8xl mb-8 drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]">{agents.find(n => n.id === hoveredAgent)?.emoji}</div>
                    <h4 className="text-3xl font-black mb-1 uppercase tracking-tighter text-white">{agents.find(n => n.id === hoveredAgent)?.name}</h4>
                    <p className="text-[10px] text-cyan-500 uppercase font-black tracking-[0.5em] mb-8">{agents.find(n => n.id === hoveredAgent)?.role}</p>
                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                       <div className="text-center">
                          <div className="text-xl font-black text-white">{(agents.find(n => n.id === hoveredAgent)?.pas_score! * 100).toFixed(0)}%</div>
                          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">PAS Sync</div>
                       </div>
                       <div className="text-center">
                          <div className="text-xl font-black text-white">{agents.find(n => n.id === hoveredAgent)?.mrsc_modules.length}</div>
                          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Protocols</div>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-500 font-black text-[11px] uppercase tracking-[0.3em] mb-4">
                    <Zap className="w-4 h-4 text-cyan-400" /> Specialized Expertise
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {agents.find(n => n.id === hoveredAgent)?.mrsc_modules.map(mod => (
                      <span 
                        key={mod} 
                        className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${selectedModule === mod ? 'bg-purple-600 border-purple-400 text-white shadow-2xl' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20'}`}
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
               </div>

               <p className="text-base text-slate-400 leading-relaxed font-medium italic border-l-4 border-cyan-500/20 pl-6 py-2">
                 "{agents.find(n => n.id === hoveredAgent)?.description}"
               </p>
               
               <button className="w-full py-6 rounded-[2.5rem] bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-cyan-900/40 hover:scale-[1.03] transition-all flex items-center justify-center gap-4 group">
                 <Activity className="w-5 h-5 group-hover:animate-pulse" />
                 Initialize Recursive Audit
               </button>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
               <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-cyan-500/5 blur-[50px] rounded-full" />
                  <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin-slow" />
                  <div className="absolute inset-0 m-auto w-12 h-12 text-slate-800"><Share2 className="w-full h-full" /></div>
               </div>
               <div className="space-y-4 max-w-[280px] mx-auto">
                 <h4 className="text-2xl font-black text-slate-500 uppercase tracking-tighter italic">Neural Focus Required</h4>
                 <p className="text-sm text-slate-600 font-medium leading-relaxed">
                   Select a cognitive node from the mesh topology to investigate specialized knowledge handshakes and protocol dependencies.
                 </p>
               </div>
               <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 w-full text-left space-y-6">
                  <div className="flex items-center gap-4 text-cyan-400/40">
                     <MousePointer2 className="w-6 h-6" />
                     <span className="text-[11px] font-black uppercase tracking-[0.4em]">Operator Instructions</span>
                  </div>
                  <ul className="space-y-4">
                     <li className="text-[11px] text-slate-500 font-medium flex gap-4"><div className="w-2 h-2 rounded-full bg-cyan-500/40 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.4)]" /> <span>Isolate expertise clusters using global mesh filters.</span></li>
                     <li className="text-[11px] text-slate-500 font-medium flex gap-4"><div className="w-2 h-2 rounded-full bg-cyan-500/40 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.4)]" /> <span>Animated flows represent real-time neural handshake frequency.</span></li>
                  </ul>
               </div>
             </div>
           )}
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 30s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
