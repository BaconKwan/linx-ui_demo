import React, { useMemo, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, MiniMap, Node, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { buildMDTGraph } from '@/lib/buildMDTGraph';
import { AgentNodeData } from '@/types/mdt';
import AgentNode from './AgentNode';
import RAGReferencesDrawer from './RAGReferencesDrawer';

export interface MDTReasoningFlowProps {
  mockData: any;
}

const nodeTypes = { agent: AgentNode } as const;

// 基于层级的稳定居中布局：不依赖外部容器宽度
const getLayouted = (nodes: Node[], edges: Edge[]) => {
  const groups: Record<number, Node[]> = {};
  nodes.forEach((n) => {
    const layerIndex: number = n.id === 'patient' ? 0 : (n.data?.layer ?? 1);
    if (!groups[layerIndex]) groups[layerIndex] = [];
    groups[layerIndex].push(n);
  });

  const horizontalGap = 360;
  const verticalGap = 220;

  const positioned: Node[] = [];
  Object.keys(groups)
    .map((k) => Number(k))
    .sort((a, b) => a - b)
    .forEach((layer) => {
      const list = groups[layer];
      const count = list.length;
      const startX = -((count - 1) * horizontalGap) / 2;
      list.forEach((node, i) => {
        const x = startX + i * horizontalGap;
        const y = layer * verticalGap;
        positioned.push({ ...node, position: { x: x, y: y } });
      });
    });

  return { nodes: positioned, edges };
};

const MDTReasoningFlowInner: React.FC<MDTReasoningFlowProps> = ({ mockData }) => {
  const graph = useMemo(() => buildMDTGraph(mockData), [mockData]);

  const [selectedRAG, setSelectedRAG] = useState<{ nodeId: string; nodeLabel: string } | null>(null);

  const nodes: Node[] = graph.nodes.map((n) => ({
    id: n.id,
    type: 'agent',
    draggable: true, // 启用拖拽
    data: { 
      ...n, 
      onOpenRAG: (nodeId: string) => {
        const node = graph.nodes.find(node => node.id === nodeId);
        setSelectedRAG({ nodeId, nodeLabel: node?.label || '' });
      },
      disabled: n.status === 'default' && n.agentType.endsWith('_specialist') 
    },
    position: { x: 0, y: 0 }
  }));

  // Edge styling: dashed lines, color consistent with source node palette
  const getPalette = (agentType?: string, status?: string, id?: string) => {
    if ((status === 'default') && agentType && agentType.endsWith('_specialist')) {
      return { bg: '#f5f5f5', border: '#d9d9d9' };
    }
    if (id === 'patient') {
      return { bg: '#fffbe6', border: '#ffe58f' };
    }
    if (agentType === 'conflict') {
      return { bg: '#f9f0ff', border: '#efdbff' };
    }
    if (agentType && (agentType.includes('medical') || agentType.endsWith('analyzer'))) {
      return { bg: '#e6f4ff', border: '#91caff' };
    }
    if (agentType && agentType.endsWith('_specialist')) {
      return { bg: '#f6ffed', border: '#b7eb8f' };
    }
    if (agentType === 'supervisor') {
      return { bg: '#fff1f0', border: '#ffa39e' };
    }
    return { bg: '#ffffff', border: '#d9d9d9' };
  };

  const nodeMap: Record<string, Node> = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const edges: Edge[] = graph.edges.map((e) => {
    const sourceNode = nodeMap[e.source];
    const palette = getPalette((sourceNode?.data as any)?.agentType, (sourceNode?.data as any)?.status, (sourceNode?.data as any)?.id);
    return {
      id: e.id,
      source: e.source,
      target: e.target,
      style: {
        stroke: palette.border,
        strokeDasharray: '6 6',
        strokeWidth: 2
      },
      type: 'bezier'
    } as Edge;
  });

  const layouted = useMemo(() => getLayouted(nodes, edges), [graph]);

  // Generate RAG references for the selected node
  const getRAGReferences = (nodeId: string) => {
    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) return undefined;

    // 从 mockData 中获取 RAG 引用数据
    return mockData?.ragReferences?.[nodeId] || undefined;
  };

  return (
    <div style={{ height: '72vh' }}>
      <ReactFlow 
        nodes={layouted.nodes} 
        edges={layouted.edges} 
        nodeTypes={nodeTypes} 
        fitView
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        selectNodesOnDrag={false}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <RAGReferencesDrawer
        open={!!selectedRAG}
        onClose={() => setSelectedRAG(null)}
        title={selectedRAG?.nodeLabel}
        ragReferences={selectedRAG ? getRAGReferences(selectedRAG.nodeId) : undefined}
      />
    </div>
  );
};

const MDTReasoningFlow: React.FC<MDTReasoningFlowProps> = (props) => {
  return (
    <ReactFlowProvider>
      <MDTReasoningFlowInner {...props} />
    </ReactFlowProvider>
  );
};

export default MDTReasoningFlow;


