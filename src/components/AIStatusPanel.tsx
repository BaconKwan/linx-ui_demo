import React from 'react';
import { Card, Row, Col, Steps, Space, Tag, Tooltip, Button, Typography, message } from 'antd';
import { 
  RobotOutlined, 
  CheckCircleOutlined, 
  WarningOutlined, 
  BranchesOutlined, 
  QuestionCircleOutlined, 
  PlusCircleOutlined, 
  DatabaseOutlined 
} from '@ant-design/icons';

const { Text } = Typography;

export interface AIStatusPanelProps {
  onOpenQuestionModal: () => void;
  onOpenUploadModal: () => void;
  onOpenKnowledgeModal: () => void;
}

/**
 * AI 智能体执行状态面板组件
 * 显示 AI 执行进度、数据完整性、知识库层级以及用户交互操作按钮
 */
const AIStatusPanel: React.FC<AIStatusPanelProps> = ({
  onOpenQuestionModal,
  onOpenUploadModal,
  onOpenKnowledgeModal
}) => {
  return (
    <Card style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {/* 执行进度指示器 */}
          <div style={{ marginBottom: 16 }}>
            <Space align="center" style={{ marginBottom: 8 }}>
              <RobotOutlined style={{ fontSize: 16, color: '#1890ff' }} />
              <Text strong>AI 智能体思考步骤</Text>
            </Space>
            <Steps
              size="small"
              current={4}
              style={{ marginTop: 8 }}
              items={[
                { title: '病历分析', description: '完成' },
                { title: '多模态融合', description: '完成' },
                { title: '深度推理', description: '完成' },
                { title: '自我检查', description: '通过' },
              ]}
            />
          </div>

          {/* 数据完整性指示 */}
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary">数据检查：</Text>
            <Space style={{ marginLeft: 8 }}>
              <Tag icon={<CheckCircleOutlined />} color="success">
                电子病历
              </Tag>
              <Tag icon={<CheckCircleOutlined />} color="success">
                体征数据
              </Tag>
              <Tag icon={<CheckCircleOutlined />} color="success">
                实验室检查
              </Tag>
              <Tag icon={<CheckCircleOutlined />} color="success">
                影像学检查
              </Tag>
              <Tag icon={<CheckCircleOutlined />} color="success">
                病原学检测
              </Tag>
              <Tag icon={<WarningOutlined />} color="warning">
                基因检测
              </Tag>
            </Space>
          </div>

          {/* 知识库层级指示 */}
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary">知识储备：</Text>
            <Space style={{ marginLeft: 8 }}>
              <Tag color="blue">一级</Tag>
              <Tag color="blue">二级</Tag>
              <Tag color="default">三级</Tag>
            </Space>
          </div>

          {/* 用户交互按钮组 */}
          <Space size={16}>
            <Tooltip title="AI 将重新思考并深入分析现有信息">
              <Button 
                icon={<BranchesOutlined />}
                onClick={() => message.loading({
                  content: 'AI 正在重新思考分析...',
                  duration: 2,
                  onClose: () => {
                    message.info('此功能正在开发中，敬请期待');
                  }
                })}
              >
                再次反思推理
              </Button>
            </Tooltip>
            <Button 
              icon={<QuestionCircleOutlined />}
              onClick={onOpenQuestionModal}
            >
              质疑诊断结果
            </Button>
            <Button 
              icon={<PlusCircleOutlined />}
              onClick={onOpenUploadModal}
            >
              补充检查信息
            </Button>
            <Tooltip title="要求 AI 引用更高层级的知识库重新分析">
              <Button 
                icon={<DatabaseOutlined />}
                onClick={onOpenKnowledgeModal}
              >
                调整知识储备
              </Button>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default AIStatusPanel; 