import React, { useState } from 'react';
import { Card, Typography, Collapse, Button, Space } from 'antd';
import { DownOutlined, UpOutlined, FileTextOutlined } from '@ant-design/icons';
import { Handle, Position, useReactFlow } from 'reactflow';
import { AgentNodeData } from '@/types/mdt';

const { Text } = Typography;
const { Panel } = Collapse;

export interface AgentNodeProps {
  data: AgentNodeData & { 
    onOpenDetails?: (nodeId: string) => void; 
    onOpenRAG?: (nodeId: string) => void;
    disabled?: boolean;
  };
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
  const [expanded, setExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { setNodes } = useReactFlow();

  // 处理鼠标进入节点
  const handleMouseEnter = () => {
    setIsFocused(true);
    
    // 将当前节点置顶
    setNodes((nodes) => {
      const updatedNodes = nodes.map((node) => ({
        ...node,
        zIndex: node.id === data.id ? 1000 : node.zIndex || 0
      }));
      return updatedNodes;
    });
  };

  // 处理鼠标离开节点
  const handleMouseLeave = () => {
    setIsFocused(false);
    
    // 重置z-index
    setNodes((nodes) => {
      const updatedNodes = nodes.map((node) => ({
        ...node,
        zIndex: node.id === data.id ? 0 : node.zIndex || 0
      }));
      return updatedNodes;
    });
  };

  return (
    <div 
      style={{ 
        width: 300, 
        opacity: data.disabled ? 0.7 : 1,
        cursor: data.disabled ? 'default' : 'grab',
        zIndex: isFocused ? 9999 : 0,
        transform: isFocused ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s ease, z-index 0s',
        userSelect: 'none',
        position: 'relative'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        size="small"
        title={<span>{data.label}</span>}
        hoverable={false}
        extra={
          <Space size={4}>
            <Button
              type="text"
              size="small"
              icon={expanded ? <UpOutlined /> : <DownOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              style={{ padding: '2px 4px' }}
            />
            {clickable && (
              <Button
                type="text"
                size="small"
                icon={<FileTextOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  data.onOpenRAG && data.onOpenRAG(data.id);
                }}
                style={{ padding: '2px 4px' }}
                title="查看引用"
              />
            )}
          </Space>
        }
        style={{ 
          background: palette.bg, 
          borderColor: palette.border,
          borderWidth: isFocused ? '2px' : '1px',
          boxShadow: isFocused ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
          transition: 'border-width 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        <Text type="secondary" style={{ display: 'block', lineHeight: 1.5 }}>
          {data.summary}
        </Text>
        
        {expanded && data.details && (
          <Collapse 
            size="small" 
            ghost 
            style={{ marginTop: 12, background: 'transparent' }}
            defaultActiveKey={['thinking', 'evidence', 'output']}
          >
            {data.details.thinking && data.details.thinking.length > 0 && (
              <Panel header="思考过程" key="thinking">
                <ol style={{ paddingLeft: 20, margin: 0 }}>
                  {data.details.thinking.map((t, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      <Text style={{ fontSize: '12px' }}>{t}</Text>
                    </li>
                  ))}
                </ol>
              </Panel>
            )}
            {data.details.evidence && data.details.evidence.length > 0 && (
              <Panel header="证据支持" key="evidence">
                <div>
                  {data.details.evidence.map((e, i) => (
                    <Text key={i} style={{ display: 'block', marginBottom: 4, fontSize: '12px' }}>
                      • {e}
                    </Text>
                  ))}
                </div>
              </Panel>
            )}
            {data.details.output && data.details.output.length > 0 && (
              <Panel header="推理结论" key="output">
                <div>
                  {data.details.output.map((o, i) => (
                    <Text key={i} style={{ display: 'block', marginBottom: 6, fontSize: '12px', lineHeight: 1.5 }}>
                      {o}
                    </Text>
                  ))}
                </div>
              </Panel>
            )}
          </Collapse>
        )}
      </Card>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default AgentNode;


