import React from 'react';
import { Drawer, Typography, Divider, Tag, List, Space } from 'antd';
import { FileTextOutlined, BookOutlined, ExperimentOutlined, UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export interface RAGReferencesDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  ragReferences?: {
    literature?: Array<{
      title: string;
      authors: string;
      journal: string;
      year: string;
      relevance: number;
      summary: string;
    }>;
    guidelines?: Array<{
      name: string;
      organization: string;
      version: string;
      relevance: number;
      keyPoints: string[];
    }>;
    cases?: Array<{
      id: string;
      diagnosis: string;
      similarity: number;
      outcome: string;
      keyLearnings: string[];
    }>;
    evidence?: Array<{
      type: string;
      source: string;
      confidence: number;
      content: string;
    }>;
  };
}

const RAGReferencesDrawer: React.FC<RAGReferencesDrawerProps> = ({ open, onClose, title, ragReferences }) => {
  return (
    <Drawer open={open} onClose={onClose} title={`${title} - RAG 引用参考`} width={500}>
      {ragReferences?.literature && ragReferences.literature.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <Title level={5} style={{ marginBottom: 12 }}>
            <FileTextOutlined style={{ marginRight: 8 }} />
            相关文献
          </Title>
          <List
            size="small"
            dataSource={ragReferences.literature}
            renderItem={(item) => (
              <List.Item>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text strong style={{ fontSize: '13px' }}>{item.title}</Text>
                    <Tag color="blue">{item.relevance}% 相关</Tag>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                    {item.authors} • {item.journal} • {item.year}
                  </Text>
                  <Text style={{ fontSize: '12px', display: 'block', marginTop: 4 }}>
                    {item.summary}
                  </Text>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}

      {ragReferences?.guidelines && ragReferences.guidelines.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <Title level={5} style={{ marginBottom: 12 }}>
            <BookOutlined style={{ marginRight: 8 }} />
            临床指南
          </Title>
          <List
            size="small"
            dataSource={ragReferences.guidelines}
            renderItem={(item) => (
              <List.Item>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text strong style={{ fontSize: '13px' }}>{item.name}</Text>
                    <Tag color="green">{item.relevance}% 相关</Tag>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                    {item.organization} • v{item.version}
                  </Text>
                  <div style={{ marginTop: 4 }}>
                    {item.keyPoints.map((point, i) => (
                      <Text key={i} style={{ display: 'block', fontSize: '12px', marginBottom: 2 }}>
                        • {point}
                      </Text>
                    ))}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}

      {ragReferences?.cases && ragReferences.cases.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <Title level={5} style={{ marginBottom: 12 }}>
            <UserOutlined style={{ marginRight: 8 }} />
            相似病例
          </Title>
          <List
            size="small"
            dataSource={ragReferences.cases}
            renderItem={(item) => (
              <List.Item>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text strong style={{ fontSize: '13px' }}>病例 {item.id}</Text>
                    <Tag color="orange">{item.similarity}% 相似</Tag>
                  </div>
                  <Text style={{ fontSize: '12px', display: 'block', marginBottom: 4 }}>
                    诊断：{item.diagnosis}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: 4 }}>
                    结局：{item.outcome}
                  </Text>
                  <div>
                    {item.keyLearnings.map((learning, i) => (
                      <Text key={i} style={{ display: 'block', fontSize: '12px', marginBottom: 2 }}>
                        • {learning}
                      </Text>
                    ))}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}

      {ragReferences?.evidence && ragReferences.evidence.length > 0 && (
        <div>
          <Title level={5} style={{ marginBottom: 12 }}>
            <ExperimentOutlined style={{ marginRight: 8 }} />
            证据支持
          </Title>
          <List
            size="small"
            dataSource={ragReferences.evidence}
            renderItem={(item) => (
              <List.Item>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text strong style={{ fontSize: '13px' }}>{item.type}</Text>
                    <Tag color={item.confidence > 0.8 ? 'green' : item.confidence > 0.6 ? 'orange' : 'red'}>
                      {Math.round(item.confidence * 100)}% 可信
                    </Tag>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: 4 }}>
                    来源：{item.source}
                  </Text>
                  <Text style={{ fontSize: '12px', display: 'block' }}>
                    {item.content}
                  </Text>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}

      {!ragReferences?.literature && !ragReferences?.guidelines && !ragReferences?.cases && !ragReferences?.evidence && (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <Text type="secondary">暂无 RAG 引用内容</Text>
        </div>
      )}
    </Drawer>
  );
};

export default RAGReferencesDrawer;


