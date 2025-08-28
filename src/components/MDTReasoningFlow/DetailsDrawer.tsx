import React from 'react';
import { Drawer, Typography, Divider, Tag } from 'antd';

const { Text, Title } = Typography;

export interface DetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  details?: {
    thinking?: string[];
    evidence?: string[];
    output?: string[];
  };
  hideTitle?: boolean;
  outputTitle?: string;
}

const DetailsDrawer: React.FC<DetailsDrawerProps> = ({ open, onClose, title, details, hideTitle, outputTitle }) => {
  const hasPrev = !!(details && ((details.thinking && details.thinking.length > 0) || (details.evidence && details.evidence.length > 0)));
  return (
    <Drawer open={open} onClose={onClose} title={hideTitle ? undefined : title} width={420}>
      {details?.thinking && details.thinking.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Title level={5} style={{ marginBottom: 8 }}>思考过程</Title>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            {details.thinking.map((t, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                <Text>{t}</Text>
              </li>
            ))}
          </ol>
        </div>
      )}
      {details?.evidence && details.evidence.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Title level={5} style={{ marginBottom: 8 }}>证据支持</Title>
          {details.evidence.map((e, i) => (
            <Tag key={i} style={{ marginBottom: 6 }}>{e}</Tag>
          ))}
        </div>
      )}
      {details?.output && details.output.length > 0 && (
        <div>
          {hasPrev && <Divider />}
          <Title level={5} style={{ marginBottom: 8 }}>{outputTitle || '推理结论'}</Title>
          {details.output.map((o, i) => (
            <Text key={i} style={{ display: 'block', marginBottom: 8, lineHeight: 1.7 }}>{o}</Text>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default DetailsDrawer;


