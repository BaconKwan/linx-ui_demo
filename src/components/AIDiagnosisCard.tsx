import React from 'react';
import { Card, Row, Col, Space, Alert, Tag, List, Button, Typography, Tooltip } from 'antd';
import { 
  ThunderboltOutlined, 
  ExperimentOutlined, 
  WarningOutlined, 
  LineChartOutlined, 
  LikeOutlined, 
  DislikeOutlined,
  LikeFilled,
  DislikeFilled
} from '@ant-design/icons';

const { Text } = Typography;

export interface AIDiagnosisCardProps {
  aiConclusion: string;
  aiDiagnosis: {
    etiology: {
      primary: string;
      secondary: string;
      evidence: string[];
    };
    severity: {
      level: string;
      criteria: string[];
    };
    progression: {
      trend: string;
      prediction: string;
      factors: string[];
    };
    risks: Array<{
      type: string;
      probability: string;
      timeWindow: string;
      indicators: string[];
    }>;
  };
  feedback: {
    etiology: 'like' | 'dislike' | null;
    severity: 'like' | 'dislike' | null;
    progression: 'like' | 'dislike' | null;
  };
  onFeedback: (section: string, type: 'like' | 'dislike') => void;
}

/**
 * AI 诊断结论卡片组件
 * 显示 AI 给出的诊断结论，包括病因分析、病情严重程度和病情发展预测
 */
const AIDiagnosisCard: React.FC<AIDiagnosisCardProps> = ({
  aiConclusion,
  aiDiagnosis,
  feedback,
  onFeedback
}) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ThunderboltOutlined style={{ marginRight: 8 }} />
            AI 诊断结论
          </div>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            以下内容由 AI 系统自动生成，仅供医生参考
          </Text>
        </div>
      }
      variant="outlined"
      style={{ marginBottom: 24 }}
    >
      {/* AI 诊断总结 */}
      <div style={{ 
        marginBottom: 16,
        lineHeight: '1.8',
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: '14px',
        padding: '0 8px'
      }}>
        {aiConclusion}
      </div>

      <Row gutter={[16, 16]}>
        {/* 病因分析 */}
        <Col span={8}>
          <Card
            type="inner"
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Space>
                  <ExperimentOutlined />
                  <Text strong>病因分析</Text>
                </Space>
                <Space>
                  <Button
                    type="text"
                    icon={feedback.etiology === 'like' ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                    onClick={() => onFeedback('etiology', 'like')}
                  />
                  <Button
                    type="text"
                    icon={feedback.etiology === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                    onClick={() => onFeedback('etiology', 'dislike')}
                  />
                </Space>
              </div>
            }
            styles={{ body: { padding: '12px' } }}
          >
            <Alert
              message="主要病因"
              description={aiDiagnosis.etiology.primary}
              type="error"
              showIcon
              style={{ marginBottom: 8 }}
            />
            <Alert
              message="次要病因"
              description={aiDiagnosis.etiology.secondary}
              type="warning"
              showIcon
              style={{ marginBottom: 8 }}
            />
            <div>
              <Text type="secondary">诊断依据：</Text>
              <div style={{ marginTop: 4 }}>
                {aiDiagnosis.etiology.evidence.map((evidence, index) => (
                  <Tag key={index} style={{ marginBottom: 4 }}>{evidence}</Tag>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* 病情严重程度 */}
        <Col span={8}>
          <Card
            type="inner"
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Space>
                  <WarningOutlined />
                  <Text strong>病情严重程度</Text>
                </Space>
                <Space>
                  <Button
                    type="text"
                    icon={feedback.severity === 'like' ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                    onClick={() => onFeedback('severity', 'like')}
                  />
                  <Button
                    type="text"
                    icon={feedback.severity === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                    onClick={() => onFeedback('severity', 'dislike')}
                  />
                </Space>
              </div>
            }
            styles={{ body: { padding: '12px' } }}
          >
            <div style={{ marginBottom: 8 }}>
              <Text>严重程度评级：</Text>
              <Tag color="red" style={{ marginLeft: 8 }}>{aiDiagnosis.severity.level}</Tag>
            </div>
            <div>
              <Text type="secondary">判断依据：</Text>
              <div style={{ marginTop: 4 }}>
                {aiDiagnosis.severity.criteria.map((criterion, index) => (
                  <Tag key={index} color="red" style={{ marginBottom: 4 }}>{criterion}</Tag>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* 病情发展与风险预测 */}
        <Col span={8}>
          <Card
            type="inner"
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Space>
                  <LineChartOutlined />
                  <Text strong>病情发展与风险预测</Text>
                </Space>
                <Space>
                  <Button
                    type="text"
                    icon={feedback.progression === 'like' ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                    onClick={() => onFeedback('progression', 'like')}
                  />
                  <Button
                    type="text"
                    icon={feedback.progression === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                    onClick={() => onFeedback('progression', 'dislike')}
                  />
                </Space>
              </div>
            }
            styles={{ body: { padding: '12px' } }}
          >
            <Alert
              message={aiDiagnosis.progression.trend}
              description={aiDiagnosis.progression.prediction}
              type="error"
              showIcon
              style={{ marginBottom: 8 }}
            />
            
            <div style={{ marginBottom: 8 }}>
              <Text type="secondary">影响因素：</Text>
              <div style={{ marginTop: 4 }}>
                {aiDiagnosis.progression.factors.map((factor, index) => (
                  <Tag key={index} color="orange" style={{ marginBottom: 4 }}>{factor}</Tag>
                ))}
              </div>
            </div>

            <div>
              <Text type="secondary">主要风险：</Text>
              <List
                size="small"
                dataSource={aiDiagnosis.risks}
                renderItem={risk => (
                  <List.Item style={{ padding: '4px 0' }}>
                    <Space direction="vertical" size={2} style={{ width: '100%' }}>
                      <div>
                        <Text strong>{risk.type}</Text>
                        <Tag 
                          color={risk.probability === 'high' ? 'red' : 'orange'} 
                          style={{ marginLeft: 4 }}
                        >
                          {risk.probability === 'high' ? '高风险' : '中等风险'}
                        </Tag>
                        <Tag color="blue" style={{ marginLeft: 4 }}>{risk.timeWindow}</Tag>
                      </div>
                      <div>
                        {risk.indicators.map((indicator, index) => (
                          <Tag key={index} style={{ marginRight: 4 }}>{indicator}</Tag>
                        ))}
                      </div>
                    </Space>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default AIDiagnosisCard; 