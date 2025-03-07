import React from 'react';
import { Card, Typography, Space, Tag, Alert } from 'antd';
import { riskAssessmentData } from '@/mocks';
import { Risk } from '@/types/mock';

const { Text, Title, Paragraph } = Typography;

/**
 * 风险评估标签页组件
 * 展示患者的各项风险评估结果
 */
const RiskAssessmentTab: React.FC = () => {
  const riskData = riskAssessmentData;

  const RiskCard = ({ risk }: { risk: Risk }) => (
    <Card
      style={{ marginBottom: 16 }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Text strong>{risk.name}</Text>
            <Tag color={risk.level === 'critical' ? '#f5222d' : risk.level === 'high' ? '#fa541c' : '#fa8c16'}>
              {risk.level === 'critical' ? '危急' : risk.level === 'high' ? '高危' : '中危'}
            </Tag>
            <Tag color="blue">发生概率：{risk.probability}</Tag>
            <Tag color="purple">预警时间：{risk.timeWindow}</Tag>
          </Space>
        </div>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <Text strong>风险描述：</Text>
        <Paragraph style={{ marginTop: 8 }}>{risk.description}</Paragraph>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong>参考指标：</Text>
        <div style={{ marginTop: 8 }}>
          {risk.indicators.map((indicator, index) => (
            <Tag key={index} style={{ marginBottom: 4 }}>{indicator}</Tag>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong>参考依据：</Text>
        <div style={{ marginTop: 8 }}>
          {risk.references.map((ref, index) => (
            <Tag key={index} color="blue" style={{ marginBottom: 4 }}>{ref}</Tag>
          ))}
        </div>
      </div>

      <div>
        <Text strong>管理建议：</Text>
        <div style={{ marginTop: 8 }}>
          {risk.suggestions.map((suggestion, index) => (
            <Alert
              key={index}
              message={suggestion}
              type="info"
              showIcon
              style={{ marginBottom: 8 }}
            />
          ))}
        </div>
      </div>
    </Card>
  );

  return (
    <div>
      <Alert
        message="风险评估说明"
        description="基于患者的临床表现、实验室检查结果、影像学发现等多维度数据，结合人工智能分析模型，对患者可能面临的风险进行全面评估。风险等级划分为危急（红色）、高危（橙色）和中危（黄色）三级，并按照紧急程度和严重程度排序。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Title level={4}>迫切需要关注的风险</Title>
      {riskData.urgentRisks.map((risk, index) => (
        <RiskCard key={index} risk={risk} />
      ))}

      <Title level={4} style={{ marginTop: 24 }}>潜在风险</Title>
      {riskData.potentialRisks.map((risk, index) => (
        <RiskCard key={index} risk={risk} />
      ))}
    </div>
  );
};

export default RiskAssessmentTab; 