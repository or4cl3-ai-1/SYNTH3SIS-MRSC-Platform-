
import React, { useState, useMemo, useEffect } from 'react';
import { Agent } from '../types';
import { Share2, Filter, Zap, Info, Layers, Activity } from 'lucide-react';

export const KnowledgeGraphView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [isFlowActive, setIsFlowActive] = useState(true);

  // Define unique modules across all agents
  const allModules = useMemo(() => {
    const mods = new Set<string>();
    agents.forEach(a => a.mrsc_modules.forEach(m => mods.add(m)));
    return Array.from(mods);
  }, [agents]);

  // Calculate node positions in a circle for simple visualization
  const nodes = useMemo(() => {
    const center = { x: 400, y: 300 };
    const radius = 220;
    return agents.map((agent, i) => {
      const angle = (i / agents.length) * 2 * Math.PI - Math.PI/2;
      return {
        ...agent,
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      };
    });
  }, [agents]);

  // Calculate edges based on shared modules
  const edges = useMemo(() => {
    const result: { from: any, to: any, modules: string[] }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const shared = nodes[i].mrsc_modules.filter(m => nodes[j].mrsc_modules.includes(m));
        if (shared.length > 0) {
          result.push({
            from: nodes[i],
            to: nodes[j],
            modules: shared
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
    <div className="h-full flex flex-col gap-8 animate-in fade-in duration-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Knowledge Graph</h2>
          <p className="text-slate-400 font-medium">Mapping swarm dependencies and recursive neural interconnects</p>
        </div>
        <div className="flex gap-2.5 p-2 bg-white/5 border border-white/10 rounded-3xl overflow-x-auto scrollbar-hide backdrop-blur-xl">
          <button 
            onClick={() => setSelectedModule(null)}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!selectedModule ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30' : 'text-slate-500 hover:text-white'}`}
          >
            All Protocols
          </button>
          {allModules.map(mod => (
            <button
              key={mod}
              onClick={() => setSelectedModule(mod)}
              className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedModule === mod ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30' : 'text-slate-500 hover:text-white'}`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-[3rem] border border-white/5 relative overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        {/* Visualization Canvas */}
        <div className="flex-1 relative bg-black/40 overflow-hidden cursor-crosshair group select-none">
          <svg className="w-full h-full min-h-[550px]" viewBox="0 0 800 600">
            {/* Edge Gradients */}
            <defs>
              <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="activeEdgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Edges */}
            {filteredEdges.map((edge, i) => {
              const isNodeHovered = hoveredAgent === edge.from.id || hoveredAgent === edge.to.id;
              const isActive = !hoveredAgent || isNodeHovered;
              const isHighlighted = selectedModule && edge.modules.includes(selectedModule);
              
              return (
                <g key={i}>
                  <line
                    x1={edge.from.x}
                    y1={edge.from.y}
                    x2={edge.to.x}
                    y2={edge.to.y}
                    stroke={isHighlighted ? '#a855f7' : (isActive ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255, 255, 255, 0.03)')}
                    strokeWidth={isHighlighted ? 4 : (isActive ? 2 : 1)}
                    className="transition-all duration-700"
                    strokeDasharray={isFlowActive ? "none" : "8 4"}
                  />
                  
                  {/* Flow Particles */}
                  {isFlowActive && isActive && (
                    <circle r={isHighlighted ? 4 : 2} fill={isHighlighted ? "#a855f7" : "#22d3ee"} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                      <animateMotion 
                        dur={`${2 + Math.random() * 3}s`} 
                        repeatCount="indefinite" 
                        path={`M${edge.from.x},${edge.from.y} L${edge.to.x},${edge.to.y}`} 
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const isDimmed = hoveredAgent && hoveredAgent !== node.id;
              const isRelevant = selectedModule && node.mrsc_modules.includes(selectedModule);
              const isHovered = hoveredAgent === node.id;
              
              return (
                <g 
                  key={node.id} 
                  onMouseEnter={() => setHoveredAgent(node.id)}
                  onMouseLeave={() => setHoveredAgent(null)}
                  className="cursor-pointer transition-all duration-500"
                  style={{ opacity: isDimmed && !isRelevant ? 0.2 : 1 }}
                >
                  <defs>
                    <filter id={`glow-${node.id}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="15" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r={isHovered ? 52 : 44} 
                    fill="#020617" 
                    stroke={isRelevant ? '#a855f7' : (isHovered ? '#fff' : node.color)}
                    strokeWidth={isRelevant ? 6 : 3}
                    filter={isHovered ? `url(#glow-${node.id})` : ''}
                    className="transition-all duration-500"
                  />
                  <text 
                    x={node.x} 
                    y={node.y} 
                    textAnchor="middle" 
                    dominantBaseline="central" 
                    fontSize={isHovered ? "32" : "28"}
                    className="transition-all duration-500 select-none"
                  >
                    {node.emoji}
                  </text>
                  <g className="transition-all duration-500" style={{ transform: `translateY(${isHovered ? '15px' : '0px'})` }}>
                    <text 
                      x={node.x} 
                      y={node.y + 65} 
                      textAnchor="middle" 
                      fontSize="11" 
                      fontWeight="900" 
                      fill="#ffffff" 
                      className="uppercase tracking-[0.2em] text-glow select-none"
                    >
                      {node.name}
                    </text>
                    <text 
                      x={node.x} 
                      y={node.y + 80} 
                      textAnchor="middle" 
                      fontSize="8" 
                      fill="#64748b" 
                      className="uppercase tracking-[0.3em] font-black select-none"
                    >
                      {node.role}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
          
          <div className="absolute top-8 left-8 flex flex-col gap-4">
             <div className="p-4 bg-black/60 backdrop-blur-3xl rounded-3xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl">
               <Share2 className="w-4 h-4 text-cyan-400" /> Swarm Mesh_v3.1
             </div>
             <button 
               onClick={() => setIsFlowActive(!isFlowActive)}
               className={`p-4 bg-black/60 backdrop-blur-3xl rounded-3xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl transition-all ${isFlowActive ? 'text-cyan-400' : 'text-slate-500'}`}
             >
               <Activity className={`w-4 h-4 ${isFlowActive ? 'animate-pulse' : ''}`} /> 
               Flow_Visualization: {isFlowActive ? 'ON' : 'OFF'}
             </button>
             <div className="p-4 bg-black/60 backdrop-blur-3xl rounded-3xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl">
               <Layers className="w-4 h-4 text-purple-400" /> Active_Interconnects: {filteredEdges.length}
             </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-white/5 p-10 flex flex-col gap-10 bg-[#020617]/60 backdrop-blur-3xl">
           <h3 className="font-black text-2xl flex items-center gap-4 uppercase tracking-tighter text-white">
             <Info className="w-6 h-6 text-cyan-400" />
             Node Analysis
           </h3>

           {hoveredAgent ? (
             <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
               <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl">
                 <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">{nodes.find(n => n.id === hoveredAgent)?.emoji}</div>
                 <h4 className="text-2xl font-black mb-1 uppercase tracking-tighter text-white">{nodes.find(n => n.id === hoveredAgent)?.name}</h4>
                 <p className="text-[10px] text-cyan-500 uppercase font-black tracking-[0.5em] mb-6">{nodes.find(n => n.id === hoveredAgent)?.role}</p>
                 <div className="h-px bg-white/10 mb-6" />
                 <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                   "{nodes.find(n => n.id === hoveredAgent)?.description}"
                 </p>
               </div>

               <div className="space-y-5">
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] ml-2">Shared Knowledge Modules</p>
                 <div className="flex flex-wrap gap-3">
                   {nodes.find(n => n.id === hoveredAgent)?.mrsc_modules.map(mod => (
                     <span 
                       key={mod} 
                       className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedModule === mod ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/40' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                     >
                       {mod}
                     </span>
                   ))}
                 </div>
               </div>
               
               <div className="p-6 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10">
                 <div className="flex items-center gap-3 mb-3 text-cyan-400">
                   <Zap className="w-5 h-5 animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Synchronization</span>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">
                   Managing {filteredEdges.filter(e => e.from.id === hoveredAgent || e.to.id === hoveredAgent).length} recursive dependencies within the current topology focus.
                 </p>
               </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 opacity-40">
               <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                 <Share2 className="w-10 h-10 text-slate-700" />
               </div>
               <div className="space-y-3">
                 <p className="text-lg font-bold text-slate-500 uppercase tracking-tighter leading-tight">Neural Focus Required</p>
                 <p className="text-sm text-slate-600 font-medium max-w-[200px] mx-auto">Hover over a cognitive node to analyze dependency mapping and module distribution.</p>
               </div>
             </div>
           )}

           <button 
            onClick={() => alert("Synthesizing global dependency report... Transmission finalized.")}
            className="mt-auto w-full py-5 rounded-3xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
           >
             Generate Topology Audit
           </button>
        </div>
      </div>
    </div>
  );
};
