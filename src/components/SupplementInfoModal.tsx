import React from 'react';
import { Modal, Button, Upload, Typography, Mentions, message } from 'antd';
import { PlusCircleOutlined, InboxOutlined } from '@ant-design/icons';

const { Text } = Typography;

// 定义组件的Props类型
export interface SupplementInfoModalProps {
  isOpen: boolean;
  onCancel: () => void;
  uploadedFiles: Array<{
    uid: string;
    name: string;
    status: 'done' | 'uploading' | 'error';
    url?: string;
    type: 'image' | 'document';
  }>;
  setUploadedFiles: (files: Array<{
    uid: string;
    name: string;
    status: 'done' | 'uploading' | 'error';
    url?: string;
    type: 'image' | 'document';
  }>) => void;
  supplementInfo: string;
  setSupplementInfo: (info: string) => void;
  mentionOptions: Array<{ value: string }>;
  setMentionOptions: (options: Array<{ value: string }>) => void;
  onSubmitSuccess?: () => void; // 提交成功后的回调函数
}

/**
 * 补充检查信息对话框组件
 * 允许用户上传检查资料并提供补充说明
 */
const SupplementInfoModal: React.FC<SupplementInfoModalProps> = ({
  isOpen,
  onCancel,
  uploadedFiles,
  setUploadedFiles,
  supplementInfo,
  setSupplementInfo,
  mentionOptions,
  setMentionOptions,
  onSubmitSuccess,
}) => {
  // 处理文件上传
  const handleFileUpload = (info: any) => {
    let newFileList = [...info.fileList];
    
    // 限制文件列表最多显示 5 个文件
    newFileList = newFileList.slice(-5);
    
    // 更新文件状态
    newFileList = newFileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
        file.type = file.type.startsWith('image/') ? 'image' : 'document';
      }
      return file;
    });
    
    setUploadedFiles(newFileList);
    
    // 更新@提及选项
    const newMentionOptions = newFileList.map(file => ({
      value: file.name,
    }));
    setMentionOptions(newMentionOptions);

    // 添加上传状态提示
    if (info.file.status === 'uploading') {
      message.loading({
        content: `${info.file.name} 正在上传...`,
        key: info.file.uid
      });
    }
    if (info.file.status === 'done') {
      message.success({
        content: `${info.file.name} 上传成功`,
        key: info.file.uid,
        duration: 2
      });
    }
    if (info.file.status === 'error') {
      message.error({
        content: `${info.file.name} 上传失败`,
        key: info.file.uid,
        duration: 2
      });
    }
  };

  // 处理补充信息提交
  const handleSubmit = () => {
    message.loading({
      content: 'AI 正在处理新增内容...',
      duration: 2,
      onClose: () => {
        message.success({
          content: '补充信息已提交，AI 将基于新信息更新分析结果',
          duration: 3
        });
      }
    });
    
    // 重置状态
    setSupplementInfo('');
    setUploadedFiles([]);
    
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
          <PlusCircleOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <span>补充检查信息</span>
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
          disabled={uploadedFiles.length === 0 && !supplementInfo.trim()}
        >
          提交补充信息
        </Button>
      ]}
      width={700}
    >
      <div style={{ marginBottom: 24 }}>
        <Text type="secondary">
          请上传相关检查资料（支持图片或文档格式），并说明补充信息的内容和参考价值。
          您可以使用@符号引用上传的文件。
        </Text>
      </div>

      {/* 文件上传区域 */}
      <div style={{ marginBottom: 24 }}>
        <Text strong>上传资料：</Text>
        <div style={{ marginTop: 8 }}>
          <Upload.Dragger
            multiple
            listType="picture"
            onChange={handleFileUpload}
            fileList={uploadedFiles}
            beforeUpload={(file) => {
              // 这里可以添加文件类型和大小的验证
              const isAllowed = file.type.startsWith('image/') || 
                              file.type === 'application/pdf' ||
                              file.type === 'application/msword' ||
                              file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
              if (!isAllowed) {
                message.error('只支持图片、PDF和Word文档格式！');
              }
              return isAllowed || Upload.LIST_IGNORE;
            }}
            style={{ 
              padding: '20px',
              background: '#fafafa',
              border: '1px dashed #d9d9d9',
              borderRadius: '2px',
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              点击或拖拽文件到此区域上传
            </p>
            <p className="ant-upload-hint" style={{ color: '#666' }}>
              支持图片、PDF和Word文档格式，单个文件不超过10MB
            </p>
          </Upload.Dragger>
        </div>
      </div>

      {/* 补充说明输入框 */}
      <div>
        <Text strong>补充说明：</Text>
        <div style={{ marginTop: 8 }}>
          <Mentions
            value={supplementInfo}
            onChange={setSupplementInfo}
            placeholder="请详细说明补充信息的内容和参考价值，可使用@引用上传的文件..."
            options={mentionOptions}
            autoSize={{ minRows: 4, maxRows: 6 }}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            提示：输入@可引用已上传的文件
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default SupplementInfoModal; 