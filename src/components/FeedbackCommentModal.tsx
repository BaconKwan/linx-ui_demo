import React from 'react';
import { Modal, Input, Typography, message } from 'antd';

const { Text } = Typography;

// 定义组件的Props类型
export interface FeedbackCommentModalProps {
  isOpen: boolean;
  onCancel: () => void;
  actionType: 'like' | 'dislike';
  commentText: string;
  setCommentText: (text: string) => void;
  currentSection: string;
  onFeedbackUpdate: (section: string, type: 'like' | 'dislike' | null) => void;
}

/**
 * 反馈评论对话框组件
 * 允许用户对诊断结果的各个部分进行反馈并添加评论
 */
const FeedbackCommentModal: React.FC<FeedbackCommentModalProps> = ({
  isOpen,
  onCancel,
  actionType,
  commentText,
  setCommentText,
  currentSection,
  onFeedbackUpdate,
}) => {
  // 处理评论提交
  const handleSubmit = () => {
    // 更新反馈状态
    onFeedbackUpdate(currentSection, actionType);
    
    // 显示成功消息
    message.success('反馈提交成功');
    
    // 重置状态
    setCommentText('');
    
    // 关闭对话框
    onCancel();
  };

  return (
    <Modal
      title={`${actionType === 'like' ? '点赞' : '点踩'}反馈`}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => {
        onCancel();
        setCommentText('');
      }}
      okText="提交"
      cancelText="取消"
    >
      <div style={{ marginBottom: 16 }}>
        <Text>请输入您的评论意见：</Text>
      </div>
      <Input.TextArea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="请输入您对该分析结果的具体意见..."
        rows={4}
      />
    </Modal>
  );
};

export default FeedbackCommentModal; 