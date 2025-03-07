import React from 'react';
import { Modal, Button, Input, Card, Typography, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

// 定义组件的Props类型
export interface DiagnosisQuestionModalProps {
  isOpen: boolean;
  onCancel: () => void;
  questionInput: string;
  setQuestionInput: (input: string) => void;
  onSubmitSuccess?: () => void; // 提交成功后的回调函数
}

/**
 * 质疑诊断对话框组件
 * 允许用户提出对AI诊断结果的质疑
 */
const DiagnosisQuestionModal: React.FC<DiagnosisQuestionModalProps> = ({
  isOpen,
  onCancel,
  questionInput,
  setQuestionInput,
  onSubmitSuccess,
}) => {
  // 内部定义快捷质疑选项
  const quickQuestions = [
    {
      title: '症状与诊断不符',
      content: '患者的症状表现与新冠病毒感染的典型特征有所差异，建议重新评估诊断依据，考虑其他可能的病因。'
    },
    {
      title: '风险评估过重',
      content: '目前的风险评估可能过于保守，患者的各项指标虽有异常但尚在可控范围内，建议重新评估病情严重程度。'
    },
    {
      title: '合并症判断欠妥',
      content: '肺炎链球菌感染的证据强度不足，PCT和白细胞的升高可能与病毒感染的炎症反应有关，建议重新评估合并感染的诊断。'
    }
  ];

  // 处理质疑提交
  const handleSubmit = () => {
    message.loading({
      content: 'AI 正在处理您的质疑...',
      duration: 2,
      onClose: () => {
        message.success({
          content: '您的质疑已提交，AI 将重新分析诊断结果',
          duration: 3
        });
      }
    });
    
    // 重置状态
    setQuestionInput('');
    
    // 调用回调函数
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    
    // 关闭对话框
    onCancel();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <QuestionCircleOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <span>质疑诊断结果</span>
        </div>
      }
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          提交质疑
        </Button>
      ]}
      width={600}
    >
      <div style={{ marginBottom: 24 }}>
        <Text type="secondary">
          请指出 AI 诊断中不合理或欠妥之处，并说明您的理由和建议的思考路径。
        </Text>
      </div>

      {/* 快捷质疑选项 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          {quickQuestions.map((question, index) => (
            <Card
              key={index}
              size="small"
              hoverable
              style={{ cursor: 'pointer' }}
              onClick={() => setQuestionInput(question.content)}
            >
              <div>
                <Text strong>{question.title}</Text>
                <div style={{ marginTop: 4 }}>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {question.content}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 质疑内容输入框 */}
      <div>
        <Text strong>详细说明：</Text>
        <Input.TextArea
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          placeholder="请详细说明您对诊断结果的质疑，包括不合理之处和建议的思考路径..."
          rows={6}
          style={{ marginTop: 8 }}
        />
      </div>
    </Modal>
  );
};

export default DiagnosisQuestionModal; 