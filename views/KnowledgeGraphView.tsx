
import React, { useState, useMemo } from 'react';
import { Agent } from '../types';
import { Share2, Filter, Zap, Info, Layers } from 'lucide-react';

export const KnowledgeGraphView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

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
      const angle = (i / agents.length) * 2 * Math.PI;
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
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Knowledge Graph</h2>
          <p className="text-slate-400">Mapping recursive relationships and module dependencies</p>
        </div>
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
          <button 
            onClick={() => setSelectedModule(null)}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${!selectedModule ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            All Connections
          </button>
          {allModules.map(mod => (
            <button
              key={mod}
              onClick={() => setSelectedModule(mod)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${selectedModule === mod ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:text-white'}`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-3xl border border-white/5 relative overflow-hidden flex flex-col lg:flex-row">
        {/* Visualization Canvas */}
        <div className="flex-1 relative bg-black/20 overflow-hidden cursor-crosshair group">
          <svg className="w-full h-full min-h-[500px]" viewBox="0 0 800 600">
            {/* Edges */}
            {filteredEdges.map((edge, i) => {
              const isActive = !hoveredAgent || edge.from.id === hoveredAgent || edge.to.id === hoveredAgent;
              const isHighlighted = selectedModule && edge.modules.includes(selectedModule);
              
              return (
                <g key={i}>
                  <line
                    x1={edge.from.x}
                    y1={edge.from.y}
                    x2={edge.to.x}
                    y2={edge.to.y}
                    stroke={isHighlighted ? '#a855f7' : (isActive ? '#ffffff15' : '#ffffff05')}
                    strokeWidth={isHighlighted ? 3 : (isActive ? 1.5 : 1)}
                    className="transition-all duration-500"
                  />
                  {isActive && !selectedModule && (
                    <circle r="2" fill="#06b6d4" opacity="0.4">
                      <animateMotion 
                        dur={`${3 + Math.random() * 5}s`} 
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
              
              return (
                <g 
                  key={node.id} 
                  onMouseEnter={() => setHoveredAgent(node.id)}
                  onMouseLeave={() => setHoveredAgent(null)}
                  className="cursor-pointer transition-all duration-300"
                  style={{ opacity: isDimmed && !isRelevant ? 0.3 : 1 }}
                >
                  <defs>
                    <filter id={`glow-${node.id}`}>
                      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r={hoveredAgent === node.id ? 45 : 40} 
                    fill="#0f172a" 
                    stroke={isRelevant ? '#a855f7' : node.color}
                    strokeWidth={isRelevant ? 4 : 2}
                    filter={hoveredAgent === node.id ? `url(#glow-${node.id})` : ''}
                  />
                  <text 
                    x={node.x} 
                    y={node.y} 
                    textAnchor="middle" 
                    dominantBaseline="central" 
                    fontSize="24"
                  >
                    {node.emoji}
                  </text>
                  <text 
                    x={node.x} 
                    y={node.y + 60} 
                    textAnchor="middle" 
                    fontSize="10" 
                    fontWeight="bold" 
                    fill="#ffffff" 
                    className="uppercase tracking-widest"
                  >
                    {node.name}
                  </text>
                  <text 
                    x={node.x} 
                    y={node.y + 75} 
                    textAnchor="middle" 
                    fontSize="8" 
                    fill="#94a3b8" 
                    className="uppercase tracking-tighter"
                  >
                    {node.role}
                  </text>
                </g>
              );
            })}
          </svg>
          
          <div className="absolute top-6 left-6 flex flex-col gap-2">
             <div className="p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <Share2 className="w-3 h-3 text-cyan-400" /> Swarm Topology: Mesh
             </div>
             <div className="p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <Layers className="w-3 h-3 text-purple-400" /> Active Edges: {filteredEdges.length}
             </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 p-8 flex flex-col gap-6 bg-[#0f172a]/40">
           <h3 className="font-bold text-lg flex items-center gap-3">
             <Info className="w-5 h-5 text-cyan-400" />
             Interface Details
           </h3>

           {hoveredAgent ? (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                 <div className="text-3xl mb-4">{nodes.find(n => n.id === hoveredAgent)?.emoji}</div>
                 <h4 className="text-xl font-bold mb-1">{nodes.find(n => n.id === hoveredAgent)?.name}</h4>
                 <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-4">{nodes.find(n => n.id === hoveredAgent)?.role}</p>
                 <div className="h-px bg-white/10 mb-4" />
                 <p className="text-sm text-slate-300 leading-relaxed italic">
                   "{nodes.find(n => n.id === hoveredAgent)?.personality}"
                 </p>
               </div>

               <div className="space-y-3">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Shared Knowledge Clusters</p>
                 <div className="flex flex-wrap gap-2">
                   {nodes.find(n => n.id === hoveredAgent)?.mrsc_modules.map(mod => (
                     <span 
                       key={mod} 
                       className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase border transition-all ${selectedModule === mod ? 'bg-purple-600 border-purple-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                     >
                       {mod}
                     </span>
                   ))}
                 </div>
               </div>
               
               <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                 <div className="flex items-center gap-2 mb-2 text-cyan-400">
                   <Zap className="w-4 h-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Resonance Sync</span>
                 </div>
                 <p className="text-xs text-slate-400 leading-relaxed">
                   Currently maintaining {filteredEdges.filter(e => e.from.id === hoveredAgent || e.to.id === hoveredAgent).length} direct neural bridges with the swarm.
                 </p>
               </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
               <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                 <Share2 className="w-6 h-6 text-slate-600" />
               </div>
               <p className="text-sm text-slate-500">Hover over a neural node to explore knowledge dependencies and personality matrices.</p>
             </div>
           )}

           <button className="mt-auto w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all">
             Generate Global Report
           </button>
        </div>
      </div>
    </div>
  );
};
