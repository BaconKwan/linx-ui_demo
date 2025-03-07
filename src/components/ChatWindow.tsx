'use client';

import { useState, useRef, useEffect } from 'react';
import { Input, Button, Avatar, List, Spin, Card } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  open: boolean;
  onClose: () => void;
  patientInfo?: {
    name: string;
    age: number;
    gender: string;
    mainDiagnosis: string[];
    riskLevel: string;
  };
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  open, 
  onClose,
  patientInfo = {
    name: '张三',
    age: 45,
    gender: '男',
    mainDiagnosis: ['高血压', '2型糖尿病', '高脂血症'],
    riskLevel: '高危',
  }
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const isFirstOpen = useRef(true);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      const scrollHeight = messageListRef.current.scrollHeight;
      const height = messageListRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      
      messageListRef.current.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // 生成欢迎消息
  const generateWelcomeMessage = () => {
    const { name, age, gender } = patientInfo;
    return `您好，我是您的 AI 医疗助手。我已经对${name}（${age}岁，${gender}）的病情进行了分析：

主要诊断：新型冠状病毒感染（重度），疑似合并肺炎链球菌感染
当前风险等级：高危（进展风险高）

关键指标：
• 体温：38.5℃
• 呼吸频率：22次/分
• 血氧饱和度：93%
• 实验室检查：炎症指标明显升高
• 影像学：双肺多发磨玻璃密度影

我可以为您提供以下帮助：
1. 病情进展趋势分析
2. 并发症风险评估
3. 治疗方案建议
4. 检查结果解读
5. 预后预测分析

您可以直接询问，例如：
• "患者目前最需要警惕的并发症风险有哪些？"
• "基于目前的检查结果，建议增加哪些检查项目？"
• "如何调整治疗方案以降低疾病进展风险？"

请问您想进一步了解什么？`;
  };

  // 首次打开时显示欢迎消息
  useEffect(() => {
    if (open && isFirstOpen.current) {
      setMessages([{
        type: 'ai',
        content: generateWelcomeMessage(),
        timestamp: new Date()
      }]);
      isFirstOpen.current = false;
    }
  }, [open]);

  // 模拟 AI 响应
  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    let aiResponse = '';
    if (userMessage.includes('症状')) {
      aiResponse = `根据${patientInfo.name}的症状描述和检查结果，主要表现为：
1. 血压：135/85 mmHg，轻度升高
2. 血糖：空腹血糖 7.2 mmol/L，需要关注
3. 心血管症状：需要进一步评估

建议进行以下检查：
• 24小时动态血压监测
• 糖化血红蛋白检查
• 心电图检查`;
    } else if (userMessage.includes('风险')) {
      aiResponse = `基于当前检查结果，${patientInfo.name}存在以下风险：
1. 心血管疾病风险：${patientInfo.riskLevel}
• 需要严格控制血压
• 定期监测心功能

2. 糖尿病并发症风险：中等
• 注意血糖控制
• 预防糖尿病肾病

建议：加强监测和预防措施，适当增加运动量。`;
    } else {
      aiResponse = `基于${patientInfo.name}的整体情况，建议：
1. 继续当前的降压和降糖方案
2. 加强运动康复：每天步行30分钟
3. 定期复查：每月一次
4. 注意饮食控制：低盐低糖饮食

如果您需要更具体的建议，请告诉我您关注的具体方面。`;
    }

    setMessages(prev => [...prev, {
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    simulateAIResponse(inputValue);
  };

  if (!open) return null;

  return (
    <Card
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '32px',
        width: '720px',
        height: '800px',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
      }}
      bodyStyle={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden',
      }}
      title={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 16px'
        }}>
          <span style={{ fontSize: '16px' }}>AI 医疗助手</span>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={onClose}
            size="small"
          />
        </div>
      }
    >
      <div 
        ref={messageListRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '20px',
          marginBottom: '10px',
          scrollBehavior: 'smooth',
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <List.Item style={{
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              padding: '12px 0',
              border: 'none',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                maxWidth: '80%'
              }}>
                <Avatar
                  size={40}
                  icon={message.type === 'user' ? <UserOutlined /> : <RobotOutlined />}
                  style={{
                    backgroundColor: message.type === 'user' ? '#1890ff' : '#52c41a',
                    marginRight: message.type === 'user' ? '0' : '12px',
                    marginLeft: message.type === 'user' ? '12px' : '0',
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    background: message.type === 'user' ? '#1890ff' : '#f0f2f5',
                    color: message.type === 'user' ? 'white' : 'black',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    whiteSpace: 'pre-wrap',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                  }}
                >
                  {message.content}
                </div>
              </div>
            </List.Item>
          )}
        />
        {isTyping && (
          <div style={{ padding: '12px 0', display: 'flex', alignItems: 'center' }}>
            <Avatar 
              size={40}
              icon={<RobotOutlined />} 
              style={{ backgroundColor: '#52c41a', marginRight: '12px' }} 
            />
            <Spin size="small" />
          </div>
        )}
      </div>
      <div style={{ 
        padding: '20px',
        borderTop: '1px solid #f0f0f0',
        backgroundColor: '#fff',
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Input
            size="large"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            placeholder="输入您的问题..."
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={handleSend}
            size="large"
          />
        </div>
      </div>
    </Card>
  );
};

export default ChatWindow; 