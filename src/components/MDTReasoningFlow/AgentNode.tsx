import React from 'react';
import { Card, Typography } from 'antd';
import { Handle, Position } from 'reactflow';
import { AgentNodeData } from '@/types/mdt';

const { Text } = Typography;

export interface AgentNodeProps {
  data: AgentNodeData & { onOpenDetails?: (nodeId: string) => void; disabled?: boolean };
}

const getPalette = (agentType: string, status?: string, id?: string) => {
  // 医技=蓝、专科=绿、主席=红、无关专科=灰
  if ((status === 'default') && agentType.endsWith('_specialist')) {
    return { bg: '#f5f5f5', border: '#d9d9d9' };
  }
  if (id === 'patient') {
    return { bg: '#fffbe6', border: '#ffe58f' }; // warning
  }
  if (agentType === 'conflict') {
    return { bg: '#f9f0ff', border: '#efdbff' }; // purple-1 fill, purple-2 border
  }
  if (agentType.includes('medical') || agentType.endsWith('analyzer')) {
    return { bg: '#e6f4ff', border: '#91caff' }; // info
  }
  if (agentType.endsWith('_specialist')) {
    return { bg: '#f6ffed', border: '#b7eb8f' }; // success
  }
  if (agentType === 'supervisor') {
    return { bg: '#fff1f0', border: '#ffa39e' }; // alert
  }
  return { bg: '#ffffff', border: '#d9d9d9' };
};

const AgentNode: React.FC<AgentNodeProps> = ({ data }) => {
  const palette = getPalette(data.agentType, data.status, data.id);
  const clickable = !data.disabled;
  return (
    <div 
      style={{ width: 300, cursor: clickable ? 'pointer' : 'default', opacity: data.disabled ? 0.7 : 1 }}
      onClick={() => clickable && data.onOpenDetails && data.onOpenDetails(data.id)}
    >
      <Card
        size="small"
        title={<span>{data.label}</span>}
        hoverable
        style={{ background: palette.bg, borderColor: palette.border }}
      >
        <Text type="secondary" style={{ display: 'block' }}>
          {data.summary}
        </Text>
      </Card>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default AgentNode;


