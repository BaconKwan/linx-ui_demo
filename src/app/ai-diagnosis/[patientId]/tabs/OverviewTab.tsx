import React from 'react';
import { Card, Row, Col, Typography, Descriptions, Tag, List } from 'antd';
import { 
  HeartOutlined,
  FileImageOutlined,
  ApiOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import AIStatusPanel from '@/components/AIStatusPanel';
import AIDiagnosisCard from '@/components/AIDiagnosisCard';
import AITreatmentPlanCard from '@/components/AITreatmentPlanCard';

const { Text } = Typography;

export interface OverviewTabProps {
  mockData: any;
  feedback: Record<string, 'like' | 'dislike' | null>;
  onFeedback: (section: string, type: 'like' | 'dislike') => void;
  onOpenQuestionModal: () => void;
  onOpenUploadModal: () => void;
  onOpenKnowledgeModal: () => void;
}

/**
 * 总览标签页组件
 * 展示患者的AI诊断结论、治疗方案和相关指标信息
 */
const OverviewTab: React.FC<OverviewTabProps> = ({
  mockData,
  feedback,
  onFeedback,
  onOpenQuestionModal,
  onOpenUploadModal,
  onOpenKnowledgeModal
}) => {
  return (
    <div>
      {/* 使用封装后的 AI 智能体执行状态面板组件 */}
      <AIStatusPanel 
        onOpenQuestionModal={onOpenQuestionModal}
        onOpenUploadModal={onOpenUploadModal}
        onOpenKnowledgeModal={onOpenKnowledgeModal}
        aiReasoning={mockData.aiReasoning}
        feedback={feedback}
        onFeedback={onFeedback}
        mockData={mockData}
      />

      <Row gutter={[24, 24]}>
        {/* 左侧 AI 诊断内容 */}
        <Col span={18}>
          {/* 使用封装后的 AI 诊断结论卡片组件 */}
          <AIDiagnosisCard 
            aiConclusion={mockData.aiConclusion}
            aiDiagnosis={mockData.aiDiagnosis}
            feedback={{
              etiology: feedback.etiology,
              severity: feedback.severity,
              progression: feedback.progression
            }}
            onFeedback={onFeedback}
          />

          {/* 使用封装后的 AI 干预措施推荐卡片组件 */}
          <AITreatmentPlanCard 
            aiTreatmentPlan={mockData.aiTreatmentPlan}
            feedback={{
              antiviral: feedback.antiviral,
              antibiotic: feedback.antibiotic,
              supportive: feedback.supportive,
              management: feedback.management,
              monitoring: feedback.monitoring
            }}
            onFeedback={onFeedback}
          />

        </Col>

        {/* 右侧关键指标 */}
        <Col span={6}>
          {/* 基本体征指标 */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HeartOutlined style={{ marginRight: 8 }} />
                基本体征
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="体温">
                <Text type="danger">{mockData.vitalSigns.temperature}℃</Text>
              </Descriptions.Item>
              <Descriptions.Item label="心率">
                {mockData.vitalSigns.heartRate} 次/分
              </Descriptions.Item>
              <Descriptions.Item label="血压">
                {mockData.vitalSigns.bloodPressure}
              </Descriptions.Item>
              <Descriptions.Item label="呼吸频率">
                <Text type="warning">{mockData.vitalSigns.respiratoryRate}</Text> 次/分
              </Descriptions.Item>
              <Descriptions.Item label="血氧饱和度">
                <Text type="danger">{mockData.vitalSigns.oxygenSaturation}%</Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* 影像学报告 */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileImageOutlined style={{ marginRight: 8 }} />
                影像学报告
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            <div style={{ marginBottom: 8 }}>
              <Tag color="blue">{mockData.imaging.type}</Tag>
              <Text type="secondary" style={{ marginLeft: 8 }}>{mockData.imaging.date}</Text>
            </div>
            <div style={{ marginBottom: 8 }}>
              {mockData.imaging.findings.map((finding: string, index: number) => (
                <div key={index} style={{ marginBottom: 4 }}>
                  • {finding}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">结论：</Text>
              <Text>{mockData.imaging.conclusion}</Text>
            </div>
          </Card>

          {/* 实验室检查 */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ExperimentOutlined style={{ marginRight: 8 }} />
                异常检验结果
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            <List
              size="small"
              dataSource={mockData.labResults.abnormal}
              renderItem={(item: any) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{item.item}</Text>
                      <Text type="danger">{item.value} {item.unit}</Text>
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        参考值: {item.reference}
                      </Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>

          {/* 病原学检查 */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ExperimentOutlined style={{ marginRight: 8 }} />
                病原学检查
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            <List
              size="small"
              dataSource={mockData.pathogenTest.results}
              renderItem={(item: any) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{item.pathogen}</Text>
                      <Tag color="red">{item.result}</Tag>
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        检测方法: {item.method}
                      </Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>

          {/* 病原宏基因组检测 */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ApiOutlined style={{ marginRight: 8 }} />
                病原宏基因组检测
              </div>
            }
            size="small"
          >
            <List
              size="small"
              dataSource={mockData.metagenomics.results}
              renderItem={(item: any) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{item.pathogen}</Text>
                      <Tag color={item.confidence === 'high' ? 'red' : 'orange'}>
                        {item.reads} reads
                      </Tag>
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        占比: {item.percentage} | 可信度: {item.confidence}
                      </Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OverviewTab; 