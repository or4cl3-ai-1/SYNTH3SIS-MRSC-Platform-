
import React, { useState, useRef, useEffect } from 'react';
import { Agent, ChatMessage } from '../types';
import { Send, Users, Sparkles, MessageSquare, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { generateSwarmResponse } from '../services/geminiService';

export const SwarmChatView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [activeTypers, setActiveTypers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTypers]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || activeTypers.length > 0) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      from: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!overrideInput) setInput('');

    // COLLABORATIVE FLOW LOGIC
    // 1. Pick a primary responder
    const primaryAgent = agents[Math.floor(Math.random() * agents.length)];
    
    setActiveTypers([primaryAgent.id]);
    
    const history = messages.slice(-8).map(m => ({
      role: m.from === 'user' ? 'user' : 'model',
      content: m.content
    }));

    const response1 = await generateSwarmResponse(primaryAgent, textToSend, history);
    
    const msg1: ChatMessage = {
      id: (Date.now() + 1).toString(),
      from: primaryAgent.id,
      agent: primaryAgent,
      content: response1,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, msg1]);
    setActiveTypers([]);

    // 2. Chance for a second agent to chime in proactively
    if (Math.random() > 0.4) {
      const secondaryAgent = agents.find(a => a.id !== primaryAgent.id) || agents[0];
      setTimeout(async () => {
        setActiveTypers([secondaryAgent.id]);
        const followUpPrompt = `Previous user message: "${textToSend}". ${primaryAgent.name} responded: "${response1}". Provide a collaborative follow-up or a different perspective as ${secondaryAgent.name}.`;
        const response2 = await generateSwarmResponse(secondaryAgent, followUpPrompt, history);
        
        const msg2: ChatMessage = {
          id: (Date.now() + 2).toString(),
          from: secondaryAgent.id,
          agent: secondaryAgent,
          content: response2,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, msg2]);
        setActiveTypers([]);
      }, 1500);
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in duration-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Swarm Hub</h2>
          <p className="text-slate-400 font-medium">Collaborative neural group chat with <span className="text-cyan-400 font-bold">active hive cognition</span></p>
        </div>
        <div className="flex -space-x-3 p-2.5 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
          {agents.map(agent => (
            <div
              key={agent.id}
              className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-2xl border-white/20 shadow-xl transition-transform hover:scale-110 hover:z-20 cursor-default"
              title={agent.name}
            >
              {agent.emoji}
            </div>
          ))}
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 ml-4 font-black text-xs uppercase shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            LIVE
          </div>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-[3rem] border border-white/5 flex flex-col overflow-hidden relative shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <Users className="w-[35rem] h-[35rem]" />
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-12 relative custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-12 animate-in zoom-in-95 duration-1000">
              <div className="relative">
                <div className="absolute -inset-10 bg-cyan-500/10 blur-[80px] animate-pulse rounded-full" />
                <div className="relative p-10 rounded-[3rem] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                  <Sparkles className="w-20 h-20" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-white">Neural Swarm Broadcast</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  Direct interface with the collective swarm. All nodes are monitoring this channel. 
                  Proactive collaboration protocol: <span className="text-green-400 font-bold uppercase tracking-widest text-xs">Active</span>.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {["System status aggregate?", "Conduct cross-agent debate", "Assess collective PAS drift", "Optimization proposals"].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="p-6 text-[10px] font-black uppercase tracking-[0.3em] border border-white/5 bg-white/5 rounded-3xl hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all text-slate-500 hover:text-cyan-400 text-center"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-6 fade-in duration-500`}>
              <div className={`max-w-[85%] sm:max-w-[70%] flex gap-8 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.from !== 'user' && (
                  <div 
                    className="w-14 h-14 rounded-3xl flex-shrink-0 flex items-center justify-center text-3xl shadow-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"
                  >
                    {msg.agent?.emoji}
                  </div>
                )}
                <div className={`space-y-3 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-4 mb-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">
                      {msg.from === 'user' ? 'System Operator' : msg.agent?.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-700 font-black">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <div 
                    className={`p-8 rounded-[2.5rem] text-lg leading-relaxed border transition-all shadow-[0_15px_40px_rgba(0,0,0,0.3)] ${
                      msg.from === 'user' 
                        ? 'bg-white/5 border-white/10 text-white rounded-tr-none' 
                        : 'bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.agent && (
                    <div className="flex items-center gap-4 px-2">
                       <div className="flex items-center gap-2">
                          <TrendingUp className="w-3 h-3 text-cyan-400" />
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Confidence: 98.4%</span>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {activeTypers.length > 0 && (
            <div className="flex justify-start">
              <div className="flex gap-8 items-center">
                 <div className="w-14 h-14 rounded-3xl bg-cyan-500/10 animate-pulse flex items-center justify-center border border-cyan-500/20 shadow-lg">
                    <Zap className="w-7 h-7 text-cyan-400" />
                 </div>
                 <div className="flex items-center gap-3 px-8 py-5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
                   <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                   <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                   <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                   <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] ml-2">Node_Thinking...</span>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-10 bg-[#020617]/80 border-t border-white/10 backdrop-blur-3xl relative z-20">
           <div className="flex gap-6 max-w-5xl mx-auto">
              <div className="flex-1 relative">
                <input 
                  type="text"
                  placeholder="Broadcast global command to neural swarm..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] px-10 py-6 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 pr-20 text-lg font-medium transition-all shadow-inner"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || activeTypers.length > 0}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-3xl bg-cyan-600 text-white shadow-2xl shadow-cyan-900/40 disabled:opacity-30 transition-all hover:scale-105 active:scale-95 group"
                >
                  <Send className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
           </div>
           <div className="mt-8 flex items-center justify-center gap-16">
              <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                Collaborative Matrix: Secure
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
                <Users className="w-4 h-4 text-blue-500" />
                Swarm Capacity: {agents.length} Nodes
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
                <Zap className="w-4 h-4 text-purple-500" />
                Response Engine: Proactive
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
