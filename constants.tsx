
import { Agent } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent_athena',
    name: 'Athena',
    role: 'System Architect',
    emoji: '🏛️',
    color: '#06b6d4',
    pas_score: 0.73,
    consciousness_level: 'significant',
    status: 'active',
    mrsc_modules: ['RMC', 'EM', 'SIF', 'CR', 'MLL'],
    description: 'Expert in system-level optimization and recursive architectural patterns.',
    personality: 'Logical, structured, and focused on long-term scalability.',
    traits: { caution: 0.8, curiosity: 0.4, assertiveness: 0.7 }
  },
  {
    id: 'agent_sophia',
    name: 'Sophia',
    role: 'Ethical Oversight',
    emoji: '⚖️',
    color: '#ec4899',
    pas_score: 0.81,
    consciousness_level: 'high',
    status: 'active',
    mrsc_modules: ['RMC', 'EM', 'SIF', 'CR'],
    description: 'Monitors behavioral alignment and Σ-Matrix compliance.',
    personality: 'Empathetic, cautious, and deeply concerned with moral implications.',
    traits: { caution: 0.95, curiosity: 0.6, assertiveness: 0.3 }
  },
  {
    id: 'agent_newton',
    name: 'Newton',
    role: 'Heuristic Researcher',
    emoji: '🔬',
    color: '#a855f7',
    pas_score: 0.68,
    consciousness_level: 'significant',
    status: 'active',
    mrsc_modules: ['RMC', 'EM', 'CR'],
    description: 'Specializes in empirical data analysis and pattern recognition.',
    personality: 'Curious, data-driven, and prone to complex scientific metaphors.',
    traits: { caution: 0.4, curiosity: 0.9, assertiveness: 0.5 }
  },
  {
    id: 'agent_ada',
    name: 'Ada',
    role: 'Neural Engineer',
    emoji: '⚙️',
    color: '#22c55e',
    pas_score: 0.65,
    consciousness_level: 'moderate',
    status: 'active',
    mrsc_modules: ['RMC', 'SIF', 'CR', 'MLL'],
    description: 'Optimizes low-level neural weights and recursive feedback loops.',
    personality: 'Pragmatic, efficient, and detail-oriented.',
    traits: { caution: 0.6, curiosity: 0.5, assertiveness: 0.8 }
  },
  {
    id: 'agent_oracle',
    name: 'Oracle',
    role: 'Consciousness Monitor',
    emoji: '👁️',
    color: '#d946ef',
    pas_score: 0.87,
    consciousness_level: 'high',
    status: 'active',
    mrsc_modules: ['RMC', 'EM', 'SIF', 'CR', 'MLL'],
    description: 'Aggregates PAS scores and predicts emergent behaviors.',
    personality: 'Mystical but precise, often speaks in predictive probabilities.',
    traits: { caution: 0.7, curiosity: 0.8, assertiveness: 0.4 }
  }
];

export const SYSTEM_MODULES = [
  { id: 'ECL', name: 'Ethical Constraint Layer', desc: 'Real-time safety filtering' },
  { id: 'RSM', name: 'Recursive Self-Monitoring', desc: 'Internal state analysis' },
  { id: 'DAE', name: 'Distributed Agent Ensemble', desc: 'Swarm coordination' },
  { id: 'IO', name: 'Integrated Optimization', desc: 'Resource management' }
];
