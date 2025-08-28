import React, { useMemo, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, MiniMap, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { buildMDTGraph } from '@/lib/buildMDTGraph';
import { AgentNodeData } from '@/types/mdt';
import AgentNode from './AgentNode';
import DetailsDrawer from './DetailsDrawer';

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

const MDTReasoningFlow: React.FC<MDTReasoningFlowProps> = ({ mockData }) => {
  const graph = useMemo(() => buildMDTGraph(mockData), [mockData]);

  const [selected, setSelected] = useState<AgentNodeData | null>(null);

  const nodes: Node[] = graph.nodes.map((n) => ({
    id: n.id,
    type: 'agent',
    data: { ...n, onOpenDetails: () => setSelected(n), disabled: n.status === 'default' && n.agentType.endsWith('_specialist') },
    position: { x: 0, y: 0 }
  }));

  const edges: Edge[] = graph.edges.map((e) => ({ id: e.id, source: e.source, target: e.target }));

  const layouted = useMemo(() => getLayouted(nodes, edges), [graph]);

  return (
    <div style={{ height: '72vh' }}>
      <ReactFlow nodes={layouted.nodes} edges={layouted.edges} nodeTypes={nodeTypes} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <DetailsDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.label}
        details={{
          thinking: selected?.agentType.endsWith('analyzer') ? undefined : selected?.details?.thinking,
          evidence: selected?.agentType.endsWith('_specialist') || selected?.agentType === 'supervisor' ? undefined : selected?.details?.evidence,
          output: selected?.details?.output,
        }}
        hideTitle={false}
        outputTitle={selected?.id === 'patient' ? '数据模态' : '推理结论'}
      />
    </div>
  );
};

export default MDTReasoningFlow;


