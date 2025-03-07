import React from 'react';
import { Card, Space, Tag, Row, Col, Typography, Button, Tooltip } from 'antd';
import { ReadOutlined, LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons';

const { Text, Title } = Typography;

export interface TreatmentGuide {
  name: string;
  references: string[];
}

export interface TreatmentRecommendation {
  content: string[];
  drugs?: string[];
}

export interface AITreatmentPlanCardProps {
  aiTreatmentPlan: {
    antiviral: {
      guide: TreatmentGuide;
      recommendations: TreatmentRecommendation;
    };
    antibiotic: {
      guide: TreatmentGuide;
      recommendations: TreatmentRecommendation;
    };
    supportive: {
      guide: TreatmentGuide;
      recommendations: TreatmentRecommendation;
    };
    management: {
      guide: TreatmentGuide;
      recommendations: TreatmentRecommendation;
    };
    monitoring: {
      guide: TreatmentGuide;
      routine: string[];
      warning: string[];
    };
  };
  feedback: {
    antiviral: 'like' | 'dislike' | null;
    antibiotic: 'like' | 'dislike' | null;
    supportive: 'like' | 'dislike' | null;
    management: 'like' | 'dislike' | null;
    monitoring: 'like' | 'dislike' | null;
  };
  onFeedback: (section: string, type: 'like' | 'dislike') => void;
}

/**
 * AI 干预措施推荐卡片组件
 * 显示 AI 给出的治疗方案推荐，包括抗病毒、抗菌、支持治疗、基础疾病管理和监测建议
 */
const AITreatmentPlanCard: React.FC<AITreatmentPlanCardProps> = ({
  aiTreatmentPlan,
  feedback,
  onFeedback
}) => {
  return (
    <Card 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>AI 干预措施推荐</span>
          <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
            以下内容由 AI 系统自动生成，仅供医生参考
          </Typography.Text>
        </div>
      }
      variant="outlined"
      style={{ marginBottom: 24 }}
    >
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {/* 抗病毒治疗 */}
        <Card 
          type="inner" 
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Space>
                {aiTreatmentPlan.antiviral.guide.name}
                <Tooltip 
                  title={
                    <div>
                      <p>参考指南：</p>
                      <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {aiTreatmentPlan.antiviral.guide.references.map((ref, index) => (
                          <li key={index}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  }
                >
                  <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                </Tooltip>
              </Space>
              <Space>
                <Button
                  type="text"
                  icon={feedback.antiviral === 'like' ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                  onClick={() => onFeedback('antiviral', 'like')}
                />
                <Button
                  type="text"
                  icon={feedback.antiviral === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                  onClick={() => onFeedback('antiviral', 'dislike')}
                />
              </Space>
            </div>
          } 
          size="small"
          styles={{ body: { padding: '12px' } }}
        >
          <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
            {aiTreatmentPlan.antiviral.recommendations.content.map((item, index) => (
              <li key={index}>
                {item}
                {index === 0 && aiTreatmentPlan.antiviral.recommendations.drugs && (
                  <>
                    {aiTreatmentPlan.antiviral.recommendations.drugs.map(drug => (
                      <Tag key={drug} color="blue" style={{ marginLeft: 8 }}>{drug}</Tag>
                    ))}
                  </>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* 抗菌治疗 */}
        <Card 
          type="inner" 
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Space>
                {aiTreatmentPlan.antibiotic.guide.name}
                <Tooltip 
                  title={
                    <div>
                      <p>参考指南：</p>
                      <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {aiTreatmentPlan.antibiotic.guide.references.map((ref, index) => (
                          <li key={index}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  }
                >
                  <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                </Tooltip>
              </Space>
              <Space>
                <Button
                  type="text"
                  icon={feedback.antibiotic === 'like' ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                  onClick={() => onFeedback('antibiotic', 'like')}
                />
                <Button
                  type="text"
                  icon={feedback.antibiotic === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                  onClick={() => onFeedback('antibiotic', 'dislike')}
                />
              </Space>
            </div>
          } 
          size="small"
          styles={{ body: { padding: '12px' } }}
        >
          <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
            {aiTreatmentPlan.antibiotic.recommendations.content.map((item, index) => (
              <li key={index}>
                {item}
                {index === 0 && aiTreatmentPlan.antibiotic.recommendations.drugs && (
                  <>
                    {aiTreatmentPlan.antibiotic.recommendations.drugs.map(drug => (
                      <Tag key={drug} color="blue" style={{ marginLeft: 8 }}>{drug}</Tag>
                    ))}
                  </>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* 对症支持治疗 */}
        <Card 
          type="inner" 
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Space>
                {aiTreatmentPlan.supportive.guide.name}
                <Tooltip 
                  title={
                    <div>
                      <p>参考指南：</p>
                      <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {aiTreatmentPlan.supportive.guide.references.map((ref, index) => (
                          <li key={index}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  }
                >
                  <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                </Tooltip>
              </Space>
              <Space>
                <Button
                  type="text"
                  icon={feedback.supportive === 'like' ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                  onClick={() => onFeedback('supportive', 'like')}
                />
                <Button
                  type="text"
                  icon={feedback.supportive === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                  onClick={() => onFeedback('supportive', 'dislike')}
                />
              </Space>
            </div>
          } 
          size="small"
          styles={{ body: { padding: '12px' } }}
        >
          <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
            {aiTreatmentPlan.supportive.recommendations.content.map((item, index) => (
              <li key={index}>
                {item}
                {index === 2 && aiTreatmentPlan.supportive.recommendations.drugs && (
                  <>
                    {aiTreatmentPlan.supportive.recommendations.drugs.map(drug => (
                      <Tag key={drug} color="blue" style={{ marginLeft: 8 }}>{drug}</Tag>
                    ))}
                  </>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* 基础疾病管理 */}
        <Card 
          type="inner" 
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Space>
                {aiTreatmentPlan.management.guide.name}
                <Tooltip 
                  title={
                    <div>
                      <p>参考指南：</p>
                      <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {aiTreatmentPlan.management.guide.references.map((ref, index) => (
                          <li key={index}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  }
                >
                  <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                </Tooltip>
              </Space>
              <Space>
                <Button
                  type="text"
                  icon={feedback.management === 'like' ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                  onClick={() => onFeedback('management', 'like')}
                />
                <Button
                  type="text"
                  icon={feedback.management === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                  onClick={() => onFeedback('management', 'dislike')}
                />
              </Space>
            </div>
          } 
          size="small"
          styles={{ body: { padding: '12px' } }}
        >
          <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
            {aiTreatmentPlan.management.recommendations.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Card>

        {/* 监测建议 */}
        <Card 
          type="inner" 
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Space>
                {aiTreatmentPlan.monitoring.guide.name}
                <Tooltip 
                  title={
                    <div>
                      <p>参考指南：</p>
                      <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {aiTreatmentPlan.monitoring.guide.references.map((ref, index) => (
                          <li key={index}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  }
                >
                  <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                </Tooltip>
              </Space>
              <Space>
                <Button
                  type="text"
                  icon={feedback.monitoring === 'like' ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                  onClick={() => onFeedback('monitoring', 'like')}
                />
                <Button
                  type="text"
                  icon={feedback.monitoring === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                  onClick={() => onFeedback('monitoring', 'dislike')}
                />
              </Space>
            </div>
          } 
          size="small"
          styles={{ body: { padding: '12px' } }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={5}>常规监测</Title>
              <ul style={{ paddingLeft: 20 }}>
                {aiTreatmentPlan.monitoring.routine.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>
            <Col span={12}>
              <Title level={5}>警戒指标</Title>
              <ul style={{ paddingLeft: 20 }}>
                {aiTreatmentPlan.monitoring.warning.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Card>
      </Space>
    </Card>
  );
};

export default AITreatmentPlanCard; 