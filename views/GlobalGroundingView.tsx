
import React, { useState } from 'react';
import { Agent } from '../types';
import { Search, Globe, Link, ExternalLink, RefreshCw, Sparkles, BookOpen } from 'lucide-react';

export const GlobalGroundingView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const performSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    // Simulate Gemini Search Grounding results
    setTimeout(() => {
      setResults([
        { title: "Breakthroughs in Recursive Neural Architectures 2024", url: "https://research.synth3sis.ai/recursion", snippet: "Recent studies show a 15% efficiency boost in multi-agent swarm environments..." },
        { title: "Ethical AI Policy: The New Sigma Standard", url: "https://global.policy.org/sigma-x", snippet: "The Sigma Matrix continues to be the industry gold-standard for autonomous constraint..." },
        { title: "Edge Computing for Synthetic Cognitive Engines", url: "https://tech.edge.net/cog-engines", snippet: "Low-latency neural bridging on mobile devices is now possible through local PAS caching..." }
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Global Grounding</h2>
          <p className="text-slate-400">Connect the swarm to real-time world events and verifiable knowledge.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
          <Globe className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Search Tool: Active</span>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-[2rem] border-white/5 space-y-8">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search for world knowledge to ground swarm heuristics..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && performSearch()}
            className="w-full bg-white/5 border border-white/10 rounded-3xl pl-16 pr-40 py-6 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-lg"
          />
          <button 
            onClick={performSearch}
            disabled={isSearching || !query.trim()}
            className="absolute right-3 top-3 bottom-3 px-8 bg-cyan-600 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 shadow-lg shadow-cyan-900/20 disabled:opacity-50"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Execute
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((res, i) => (
            <div key={i} className="group glass-panel p-6 rounded-3xl border-white/5 hover:border-white/20 transition-all flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400"><BookOpen className="w-5 h-5" /></div>
                <a href={res.url} target="_blank" rel="noreferrer" className="p-2 text-slate-500 hover:text-white transition-all"><ExternalLink className="w-5 h-5" /></a>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{res.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{res.snippet}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600">
                   <Link className="w-3 h-3" /> {res.url}
                </div>
              </div>
            </div>
          ))}
          {results.length === 0 && !isSearching && (
             <div className="col-span-full h-64 flex flex-col items-center justify-center opacity-30 gap-4">
                <Globe className="w-16 h-16" />
                <p className="text-sm">Enter a query to bridge the gap between synthetic and biological reality.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
