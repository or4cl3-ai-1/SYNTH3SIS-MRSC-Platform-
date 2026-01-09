
import React, { useState, useRef, useEffect } from 'react';
import { Agent, ChatMessage } from '../types';
import { Send, Users, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { generateSwarmResponse } from '../services/geminiService';

export const ChatView: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      from: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const agent = agents.find(a => a.id === selectedAgentId) || agents[0];
    const history = messages.slice(-5).map(m => ({
      role: m.from === 'user' ? 'user' : 'model',
      content: m.content
    }));

    const responseText = await generateSwarmResponse(agent, input, history);

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
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Direct Interface</h2>
          <p className="text-slate-400">Quantum-secure bridge to {selectedAgent?.name}'s neural node</p>
        </div>
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto scrollbar-hide">
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                selectedAgentId === agent.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-900/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-sm">{agent.emoji}</span>
              <span className="text-xs font-bold uppercase tracking-widest">{agent.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-3xl border border-white/5 flex flex-col overflow-hidden relative">
        {/* Chat Background Decal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <MessageSquare className="w-96 h-96" />
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 relative">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
              <div className="p-4 rounded-3xl bg-cyan-500/10 text-cyan-400">
                <Sparkles className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold">Neural Link Established</h3>
              <p className="text-slate-400 text-sm">
                You are currently interfacing with <span className="text-white font-bold">{selectedAgent?.name}</span>. 
                All communications are filtered through the ECL (Ethical Constraint Layer) and Sigma Matrix constraints.
              </p>
              <div className="grid grid-cols-2 gap-3 w-full">
                {["System status report", "Analyze PAS fluctuations", "Constraint audit", "Recursive loop check"].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => { setInput(suggestion); }}
                    className="p-3 text-[10px] font-bold uppercase tracking-widest border border-white/5 rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-cyan-400"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex gap-4 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.from !== 'user' && (
                  <div 
                    className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl shadow-lg"
                    style={{ backgroundColor: `${msg.agent?.color}20`, border: `1px solid ${msg.agent?.color}40` }}
                  >
                    {msg.agent?.emoji}
                  </div>
                )}
                <div className={`space-y-1 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-1 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {msg.from === 'user' ? 'Operator' : msg.agent?.name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div 
                    className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                      msg.from === 'user' 
                        ? 'bg-white/5 border-white/10 text-white rounded-tr-none' 
                        : 'bg-gradient-to-br from-slate-800 to-slate-900 border-white/5 text-slate-200 shadow-xl rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.pas_score && (
                    <div className="flex items-center gap-1.5 mt-1 px-1">
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden w-16">
                        <div className="bg-cyan-400 h-full" style={{ width: `${msg.pas_score * 100}%` }} />
                      </div>
                      <span className="text-[8px] font-mono text-cyan-400/60 uppercase">PAS Sync: {(msg.pas_score * 100).toFixed(0)}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-400/50" />
                 </div>
                 <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
                   <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-[#0f172a]/40 border-t border-white/5 backdrop-blur-xl">
           <div className="flex gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text"
                  placeholder={`Interface with ${selectedAgent?.name}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 pr-12 text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-900/20 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                <Users className="w-5 h-5" />
              </button>
           </div>
           <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                <AlertCircle className="w-3 h-3" />
                Recursive Safety Active
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Gemini flash v3.1
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
