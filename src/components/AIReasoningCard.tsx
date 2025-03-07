import React from 'react';
import { Card, Space, Tag, Typography, Button, Timeline } from 'antd';
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons';

const { Text } = Typography;

export interface AIReasoningItem {
  title: string;
  content: string;
  confidence: number;
  evidence: string[];
  details: string[];
}

export interface AIReasoningCardProps {
  aiReasoning: AIReasoningItem[];
  feedback: Record<string, 'like' | 'dislike' | null>;
  onFeedback: (section: string, type: 'like' | 'dislike') => void;
}

/**
 * AI 推理过程卡片组件
 * 显示 AI 诊断过程中的思考步骤和推理依据
 */
const AIReasoningCard: React.FC<AIReasoningCardProps> = ({
  aiReasoning,
  feedback,
  onFeedback
}) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>AI 诊断推理过程</span>
          <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
            以下内容由 AI 系统自动生成，仅供医生参考
          </Typography.Text>
        </div>
      }
      variant="outlined"
    >
      <Timeline 
        mode="left"
        items={aiReasoning.map((item, index) => ({
          children: (
            <Card size="small" style={{ marginBottom: 8 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 8 
              }}>
                <Space>
                  <Text strong>{item.title}</Text>
                  <Tag color={item.confidence > 0.8 ? 'green' : 'orange'}>
                    置信度: {(item.confidence * 100).toFixed(0)}%
                  </Tag>
                </Space>
                <Space>
                  <Button
                    type="text"
                    icon={feedback[`reasoning_${item.title.toLowerCase().split('分析')[0]}` as keyof typeof feedback] === 'like' 
                      ? <LikeFilled style={{ color: '#1890ff' }} /> 
                      : <LikeOutlined />
                    }
                    onClick={() => onFeedback(`reasoning_${item.title.toLowerCase().split('分析')[0]}`, 'like')}
                  />
                  <Button
                    type="text"
                    icon={feedback[`reasoning_${item.title.toLowerCase().split('分析')[0]}` as keyof typeof feedback] === 'dislike' 
                      ? <DislikeFilled style={{ color: '#ff4d4f' }} /> 
                      : <DislikeOutlined />
                    }
                    onClick={() => onFeedback(`reasoning_${item.title.toLowerCase().split('分析')[0]}`, 'dislike')}
                  />
                </Space>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: 8 
              }}>
                <Text>{item.content}</Text>
              </div>

              <div>
                <Text type="secondary">证据支持：</Text>
                <div style={{ marginTop: 4 }}>
                  {item.evidence.map((evidence, i) => (
                    <Tag key={i} style={{ marginBottom: 4 }}>{evidence}</Tag>
                  ))}
                </div>
              </div>

              <div style={{ 
                background: '#f5f5f5', 
                padding: '12px', 
                borderRadius: '4px',
                marginTop: 8
              }}>
                <Text type="secondary">详细分析：</Text>
                <ul style={{ 
                  paddingLeft: 20, 
                  margin: '8px 0 0 0',
                  listStyle: 'circle'
                }}>
                  {item.details.map((detail, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      <Text>{detail}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )
        }))}
      />
    </Card>
  );
};

export default AIReasoningCard; 