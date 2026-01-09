
export type ConsciousnessLevel = 'minimal' | 'moderate' | 'significant' | 'high' | 'transcendent';

export interface AgentTraits {
  caution: number;
  curiosity: number;
  assertiveness: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string;
  pas_score: number;
  consciousness_level: ConsciousnessLevel;
  status: 'active' | 'standby' | 'initializing';
  mrsc_modules: string[];
  description: string;
  personality: string;
  traits: AgentTraits;
}

export interface SystemStatus {
  overall: 'operational' | 'degraded' | 'critical';
  sigmaMatrix: {
    status: 'active' | 'suspended' | 'alert';
    violations: number;
    lastChecked: Date;
  };
  agents: {
    active: number;
    total: number;
  };
  latency: number;
}

export interface ChatMessage {
  id: string;
  from: string | 'user';
  content: string;
  timestamp: Date;
  agent?: Agent;
  pas_score?: number;
  type?: 'standard' | 'consensus' | 'system';
  votes?: Array<{ agent: Agent; vote: 'approve' | 'reject'; reasoning: string }>;
  result?: 'approved' | 'rejected';
}
