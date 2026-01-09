
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DashboardView } from './views/DashboardView';
import { AgentsView } from './views/AgentsView';
import { ChatView } from './views/ChatView';
import { ConsciousnessView } from './views/ConsciousnessView';
import { SigmaMatrixView } from './views/SigmaMatrixView';
import { SettingsView } from './views/SettingsView';
import { TrainingView } from './views/TrainingView';
import { KnowledgeGraphView } from './views/KnowledgeGraphView';
import { InteractionMatrixView } from './views/InteractionMatrixView';
import { LandingView } from './views/LandingView';
import { INITIAL_AGENTS } from './constants';
import { Agent, SystemStatus } from './types';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    overall: 'operational',
    sigmaMatrix: {
      status: 'active',
      violations: 0,
      lastChecked: new Date(),
    },
    agents: {
      active: INITIAL_AGENTS.filter(a => a.status === 'active').length,
      total: INITIAL_AGENTS.length,
    },
    latency: 24,
  });

  // Simulated live updates
  useEffect(() => {
    if (!hasEntered) return;
    
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        pas_score: Math.min(0.99, Math.max(0.1, agent.pas_score + (Math.random() - 0.5) * 0.02)),
        consciousness_level: agent.pas_score > 0.9 ? 'transcendent' : 
                            agent.pas_score > 0.8 ? 'high' :
                            agent.pas_score > 0.6 ? 'significant' :
                            agent.pas_score > 0.3 ? 'moderate' : 'minimal'
      })));
      setSystemStatus(prev => ({
        ...prev,
        latency: Math.floor(18 + Math.random() * 15)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [hasEntered]);

  const updateAgentTrait = (agentId: string, trait: 'caution' | 'curiosity' | 'assertiveness', value: number) => {
    setAgents(prev => prev.map(a => 
      a.id === agentId 
        ? { ...a, traits: { ...a.traits, [trait]: value } }
        : a
    ));
  };

  if (!hasEntered) {
    return <LandingView onEnter={() => setHasEntered(true)} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView agents={agents} systemStatus={systemStatus} />;
      case 'agents': return <AgentsView agents={agents} />;
      case 'training': return <TrainingView agents={agents} />;
      case 'graph': return <KnowledgeGraphView agents={agents} />;
      case 'matrix': return <InteractionMatrixView agents={agents} />;
      case 'consciousness': return <ConsciousnessView agents={agents} />;
      case 'chat': return <ChatView agents={agents} />;
      case 'sigma': return <SigmaMatrixView systemStatus={systemStatus} />;
      case 'settings': return <SettingsView agents={agents} onUpdateTrait={updateAgentTrait} />;
      default: return <DashboardView agents={agents} systemStatus={systemStatus} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} systemStatus={systemStatus}>
      {renderView()}
    </Layout>
  );
};

export default App;
