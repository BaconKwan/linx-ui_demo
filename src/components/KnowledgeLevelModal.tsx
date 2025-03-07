import React from 'react';
import { Modal, Button, Slider, Typography, Card, Space, message } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

// 定义组件的Props类型
export interface KnowledgeLevelModalProps {
  isOpen: boolean;
  onCancel: () => void;
  knowledgeLevel: number;
  setKnowledgeLevel: (level: number) => void;
}

/**
 * 知识储备调整对话框组件
 * 允许用户调整AI知识储备的层级
 */
const KnowledgeLevelModal: React.FC<KnowledgeLevelModalProps> = ({
  isOpen,
  onCancel,
  knowledgeLevel,
  setKnowledgeLevel,
}) => {
  const handleSubmit = () => {
    message.loading({
      content: '正在调整知识库层级...',
      duration: 2,
      onClose: () => {
        message.success({
          content: `已将 AI 知识储备调整至 ${knowledgeLevel} 级`,
          duration: 3
        });
      }
    });
    onCancel();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DatabaseOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <span>调整 AI 知识储备层级</span>
        </div>
      }
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
        >
          确认调整
        </Button>
      ]}
      width={600}
    >
      <div style={{ marginBottom: 24 }}>
        <Text type="secondary">
          请选择需要 AI 使用的知识储备层级。更高层级包含更专业和特殊的医学知识，可用于分析复杂或罕见病例。
        </Text>
      </div>

      <div style={{ padding: '0 20px', marginBottom: 32 }}>
        <Slider
          value={knowledgeLevel}
          onChange={setKnowledgeLevel}
          min={1}
          max={3}
          step={1}
          marks={{
            1: '一级',
            2: '二级',
            3: '三级'
          }}
          tooltip={{
            formatter: (value) => `${value}级知识库`
          }}
        />
      </div>

      <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
        <Title level={5}>知识储备层级说明</Title>
        <div style={{ marginTop: 16 }}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Card 
              size="small" 
              title="一级知识储备" 
              style={{ 
                background: knowledgeLevel === 1 ? '#e6f7ff' : 'white',
                cursor: 'pointer'
              }}
              onClick={() => setKnowledgeLevel(1)}
              hoverable
            >
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>医学教材</li>
                <li>诊疗指南</li>
                <li>临床诊疗标准</li>
              </ul>
            </Card>
            <Card 
              size="small" 
              title="二级知识储备" 
              style={{ 
                background: knowledgeLevel === 2 ? '#e6f7ff' : 'white',
                cursor: 'pointer'
              }}
              onClick={() => setKnowledgeLevel(2)}
              hoverable
            >
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>专家共识</li>
                <li>高水平医学期刊研究论文</li>
                <li>临床试验研究成果</li>
              </ul>
            </Card>
            <Card 
              size="small" 
              title="三级知识储备" 
              style={{ 
                background: knowledgeLevel === 3 ? '#e6f7ff' : 'white',
                cursor: 'pointer'
              }}
              onClick={() => setKnowledgeLevel(3)}
              hoverable
            >
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>高水平期刊的 Case Report</li>
                <li>罕见病例报道</li>
                <li>最新医学研究进展</li>
              </ul>
            </Card>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default KnowledgeLevelModal; 