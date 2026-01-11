
import React, { useState, useRef, useEffect } from 'react';
import { Agent, ChatMessage } from '../types';
import { Send, Users, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { generateSwarmResponse } from '../services/geminiService';

export const ChatView: React.FC<{ agents: Agent[], initialAgentId?: string }> = ({ agents, initialAgentId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(initialAgentId || agents[0]?.id || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      from: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!overrideInput) setInput('');
    setIsTyping(true);

    const agent = agents.find(a => a.id === selectedAgentId) || agents[0];
    const history = messages.slice(-5).map(m => ({
      role: m.from === 'user' ? 'user' : 'model',
      content: m.content
    }));

    const responseText = await generateSwarmResponse(agent, textToSend, history);

    const agentMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      from: agent.id,
      agent: agent,
      content: responseText,
      pas_score: agent.pas_score,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, agentMessage]);
    setIsTyping(false);
  };

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Interface</h2>
          <p className="text-slate-400 font-medium">Direct bridge to <span className="text-cyan-400 font-bold">{selectedAgent?.name}</span>'s node</p>
        </div>
        <div className="flex gap-2.5 p-1.5 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto scrollbar-hide">
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                selectedAgentId === agent.id 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-900/20' 
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              <span className="text-base">{agent.emoji}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{agent.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-[2.5rem] border border-white/5 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none">
          <MessageSquare className="w-[30rem] h-[30rem]" />
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 relative custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-8">
              <div className="p-6 rounded-[2.5rem] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <Sparkles className="w-16 h-16" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Neural Bridge Established</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Interfacing with <span className="text-white font-bold">{selectedAgent?.name}</span>. 
                  Sigma Matrix and ECL protocols are <span className="text-green-400 font-bold">nominal</span>.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                {["Status report", "Analyze PAS fluctuations", "Constraint audit", "Recursive loop check"].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="p-5 text-[10px] font-black uppercase tracking-[0.2em] border border-white/5 bg-white/5 rounded-2xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all text-slate-500 hover:text-cyan-400 text-center"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-400`}>
              <div className={`max-w-[75%] flex gap-6 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.from !== 'user' && (
                  <div 
                    className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl shadow-xl bg-cyan-500/5 border border-cyan-500/20"
                  >
                    {msg.agent?.emoji}
                  </div>
                )}
                <div className={`space-y-2 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-3 mb-1.5 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {msg.from === 'user' ? 'Operator' : msg.agent?.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 font-bold">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div 
                    className={`p-6 rounded-3xl text-base leading-relaxed border transition-all ${
                      msg.from === 'user' 
                        ? 'bg-white/5 border-white/10 text-white rounded-tr-none' 
                        : 'bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 text-slate-300 shadow-2xl rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.pas_score && (
                    <div className="flex items-center gap-2.5 mt-2 px-1">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden w-24">
                        <div className="bg-cyan-500 h-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" style={{ width: `${msg.pas_score * 100}%` }} />
                      </div>
                      <span className="text-[9px] font-mono font-black text-cyan-400/60 uppercase tracking-widest">PAS_SYNC: {(msg.pas_score * 100).toFixed(0)}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-6 items-center">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 animate-pulse flex items-center justify-center border border-white/5">
                    <Sparkles className="w-6 h-6 text-cyan-400/40" />
                 </div>
                 <div className="flex items-center gap-2 px-6 py-4 rounded-3xl bg-white/5 border border-white/5">
                   <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-8 bg-[#020617]/60 border-t border-white/10 backdrop-blur-2xl">
           <div className="flex gap-5">
              <div className="flex-1 relative">
                <input 
                  type="text"
                  placeholder={`Interface command for ${selectedAgent?.name}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 pr-16 text-base font-medium transition-all"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-cyan-600 text-white shadow-xl shadow-cyan-900/30 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={() => alert("Initializing swarm-wide broadcast... Signal pending.")}
                className="p-5 rounded-3xl bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center group"
              >
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
           </div>
           <div className="mt-6 flex items-center justify-center gap-10">
              <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                <AlertCircle className="w-4 h-4 text-cyan-500" />
                Recursive Safety: Enabled
              </div>
              <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4 text-blue-500" />
                Gemini_3_Pro_Preview
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
