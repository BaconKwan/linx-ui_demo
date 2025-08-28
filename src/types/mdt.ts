export type AgentLayer = 1 | 2 | 3 | 4;

export type AgentType =
  | 'medical_history_summarizer'
  | 'lab_analyzer'
  | 'pathogen_analyzer'
  | 'imaging_analyzer'
  | 'respiratory_specialist'
  | 'icu_specialist'
  | 'oncology_specialist'
  | 'pediatrics_specialist'
  | 'supervisor'
  | 'patient'
  | 'conflict';

export interface AgentNodeData {
  id: string;
  label: string;
  layer: AgentLayer;
  agentType: AgentType;
  summary: string;
  details?: {
    thinking?: string[];
    evidence?: string[];
    output?: string[];
  };
  status?: 'success' | 'warning' | 'error' | 'default';
}

export interface AgentEdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
}


