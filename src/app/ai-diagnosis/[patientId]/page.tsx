'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, Descriptions, Tag, Progress, Row, Col, Typography, Divider, Tabs, Button, Statistic, Timeline, List, Collapse, Space, Alert, Tooltip, Steps, message, Modal, Input, Upload, Mentions, Slider, Table, Empty } from 'antd';
import { 
  UploadOutlined, 
  ExclamationCircleOutlined, 
  LikeOutlined, 
  DislikeOutlined, 
  SendOutlined, 
  FileImageOutlined, 
  BranchesOutlined, 
  PrinterOutlined,
  UserOutlined, 
  HeartOutlined, 
  AlertOutlined, 
  CheckCircleOutlined,
  MedicineBoxOutlined,
  ScheduleOutlined,
  MessageOutlined,
  RobotOutlined,
  ExperimentOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  LineChartOutlined,
  ReadOutlined,
  QuestionCircleOutlined,
  PlusCircleOutlined,
  DatabaseOutlined,
  InboxOutlined,
  CalendarOutlined,
  MedicineBoxTwoTone,
  HeartTwoTone,
  AlertTwoTone,
  LikeFilled,
  DislikeFilled,
  DragOutlined,
  ZoomInOutlined,
  ControlOutlined,
  BorderOutlined,
  LineOutlined,
  RetweetOutlined,
  CameraOutlined,
  UndoOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import ChatWindow from '@/components/ChatWindow';
import cornerstone from 'cornerstone-core';
import { patientDetail, mockData, monitoringData, medicalRecordData, riskAssessmentData, Risk, AdmissionRecord, ProgressRecord, dicomStudies, labData } from '@/mocks';

const { Title, Text, Paragraph } = Typography;

const PatientDiagnosisPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [knowledgeLevel, setKnowledgeLevel] = useState(1);
  const [questionInput, setQuestionInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    uid: string;
    name: string;
    status: 'done' | 'uploading' | 'error';
    url?: string;
    type: 'image' | 'document';
  }>>([]);
  const [supplementInfo, setSupplementInfo] = useState('');
  const [mentionOptions, setMentionOptions] = useState<Array<{value: string}>>([]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('');
  const [commentText, setCommentText] = useState('');
  const [actionType, setActionType] = useState<'like' | 'dislike'>('like');
  const [feedback, setFeedback] = useState({
    etiology: null as 'like' | 'dislike' | null,
    severity: null as 'like' | 'dislike' | null,
    progression: null as 'like' | 'dislike' | null,
    antiviral: null as 'like' | 'dislike' | null,
    antibiotic: null as 'like' | 'dislike' | null,
    supportive: null as 'like' | 'dislike' | null,
    management: null as 'like' | 'dislike' | null,
    monitoring: null as 'like' | 'dislike' | null,
    reasoning_symptoms: null as 'like' | 'dislike' | null,
    reasoning_labs: null as 'like' | 'dislike' | null,
    reasoning_imaging: null as 'like' | 'dislike' | null,
    reasoning_pathogen: null as 'like' | 'dislike' | null,
  });

  // 快捷质疑选项
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
  const handleQuestionSubmit = () => {
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
    setIsQuestionModalOpen(false);
    setQuestionInput('');
  };

  // 处理补充信息提交
  const handleSupplementSubmit = () => {
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
    setIsUploadModalOpen(false);
    setSupplementInfo('');
    setUploadedFiles([]);
  };

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

  // 准备传递给聊天窗口的患者信息
  const chatPatientInfo = {
    name: patientDetail.basicInfo.name,
    age: patientDetail.basicInfo.age,
    gender: patientDetail.basicInfo.gender,
    mainDiagnosis: patientDetail.diseaseLabels.map(d => d.name),
    riskLevel: patientDetail.riskAssessment.cardiovascular.level,
  };

  const handleFeedback = (section: string, type: 'like' | 'dislike') => {
    // 如果点击的是当前已选中的按钮，则取消选择
    if (feedback[section as keyof typeof feedback] === type) {
      setFeedback(prev => ({
        ...prev,
        [section]: null
      }));
      return;
    }
    
    setCurrentSection(section);
    setActionType(type);
    setCommentModalVisible(true);
  };

  const handleCommentSubmit = () => {
    // 更新反馈状态
    setFeedback(prev => ({
      ...prev,
      [currentSection]: actionType
    }));
    
    // 显示成功消息
    message.success('反馈提交成功');
    
    // 重置状态
    setCommentModalVisible(false);
    setCommentText('');
  };

  // 总览标签页内容
  const OverviewTab = () => (
    <div>
      {/* AI 智能体执行状态面板 */}
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
                onClick={() => setIsQuestionModalOpen(true)}
              >
                质疑诊断结果
              </Button>
              <Button 
                icon={<PlusCircleOutlined />}
                onClick={() => setIsUploadModalOpen(true)}
              >
                补充检查信息
              </Button>
              <Tooltip title="要求 AI 引用更高层级的知识库重新分析">
                <Button 
                  icon={<DatabaseOutlined />}
                  onClick={() => setIsKnowledgeModalOpen(true)}
                >
                  调整知识储备
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {/* 左侧 AI 诊断内容 */}
        <Col span={18}>
          {/* AI 诊断结论 */}
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
              {mockData.aiConclusion}
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
                          onClick={() => handleFeedback('etiology', 'like')}
                        />
                        <Button
                          type="text"
                          icon={feedback.etiology === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                          onClick={() => handleFeedback('etiology', 'dislike')}
                        />
                      </Space>
                    </div>
                  }
                  styles={{ body: { padding: '12px' } }}
                >
                  <Alert
                    message="主要病因"
                    description={mockData.aiDiagnosis.etiology.primary}
                    type="error"
                    showIcon
                    style={{ marginBottom: 8 }}
                  />
                  <Alert
                    message="次要病因"
                    description={mockData.aiDiagnosis.etiology.secondary}
                    type="warning"
                    showIcon
                    style={{ marginBottom: 8 }}
                  />
                  <div>
                    <Text type="secondary">诊断依据：</Text>
                    <div style={{ marginTop: 4 }}>
                      {mockData.aiDiagnosis.etiology.evidence.map((evidence, index) => (
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
                          onClick={() => handleFeedback('severity', 'like')}
                        />
                        <Button
                          type="text"
                          icon={feedback.severity === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                          onClick={() => handleFeedback('severity', 'dislike')}
                        />
                      </Space>
                    </div>
                  }
                  styles={{ body: { padding: '12px' } }}
                >
                  <div style={{ marginBottom: 8 }}>
                    <Text>严重程度评级：</Text>
                    <Tag color="red" style={{ marginLeft: 8 }}>{mockData.aiDiagnosis.severity.level}</Tag>
                  </div>
                  <div>
                    <Text type="secondary">判断依据：</Text>
                    <div style={{ marginTop: 4 }}>
                      {mockData.aiDiagnosis.severity.criteria.map((criterion, index) => (
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
                          onClick={() => handleFeedback('progression', 'like')}
                        />
                        <Button
                          type="text"
                          icon={feedback.progression === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                          onClick={() => handleFeedback('progression', 'dislike')}
                        />
                      </Space>
                    </div>
                  }
                  styles={{ body: { padding: '12px' } }}
                >
                  <Alert
                    message={mockData.aiDiagnosis.progression.trend}
                    description={mockData.aiDiagnosis.progression.prediction}
                    type="error"
                    showIcon
                    style={{ marginBottom: 8 }}
                  />
                  
                  <div style={{ marginBottom: 8 }}>
                    <Text type="secondary">影响因素：</Text>
                    <div style={{ marginTop: 4 }}>
                      {mockData.aiDiagnosis.progression.factors.map((factor, index) => (
                        <Tag key={index} color="orange" style={{ marginBottom: 4 }}>{factor}</Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Text type="secondary">主要风险：</Text>
                    <List
                      size="small"
                      dataSource={mockData.aiDiagnosis.risks}
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

          {/* AI 干预措施推荐 */}
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
                      {mockData.aiTreatmentPlan.antiviral.guide.name}
                      <Tooltip 
                        title={
                          <div>
                            <p>参考指南：</p>
                            <ul style={{ paddingLeft: 16, margin: 0 }}>
                              {mockData.aiTreatmentPlan.antiviral.guide.references.map((ref, index) => (
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
                        onClick={() => handleFeedback('antiviral', 'like')}
                      />
                      <Button
                        type="text"
                        icon={feedback.antiviral === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                        onClick={() => handleFeedback('antiviral', 'dislike')}
                      />
                    </Space>
                  </div>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                  {mockData.aiTreatmentPlan.antiviral.recommendations.content.map((item, index) => (
                    <li key={index}>
                      {item}
                      {index === 0 && mockData.aiTreatmentPlan.antiviral.recommendations.drugs && (
                        <>
                          {mockData.aiTreatmentPlan.antiviral.recommendations.drugs.map(drug => (
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
                      {mockData.aiTreatmentPlan.antibiotic.guide.name}
                      <Tooltip 
                        title={
                          <div>
                            <p>参考指南：</p>
                            <ul style={{ paddingLeft: 16, margin: 0 }}>
                              {mockData.aiTreatmentPlan.antibiotic.guide.references.map((ref, index) => (
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
                        onClick={() => handleFeedback('antibiotic', 'like')}
                      />
                      <Button
                        type="text"
                        icon={feedback.antibiotic === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                        onClick={() => handleFeedback('antibiotic', 'dislike')}
                      />
                    </Space>
                  </div>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                  {mockData.aiTreatmentPlan.antibiotic.recommendations.content.map((item, index) => (
                    <li key={index}>
                      {item}
                      {index === 0 && mockData.aiTreatmentPlan.antibiotic.recommendations.drugs && (
                        <>
                          {mockData.aiTreatmentPlan.antibiotic.recommendations.drugs.map(drug => (
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
                      {mockData.aiTreatmentPlan.supportive.guide.name}
                      <Tooltip 
                        title={
                          <div>
                            <p>参考指南：</p>
                            <ul style={{ paddingLeft: 16, margin: 0 }}>
                              {mockData.aiTreatmentPlan.supportive.guide.references.map((ref, index) => (
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
                        onClick={() => handleFeedback('supportive', 'like')}
                      />
                      <Button
                        type="text"
                        icon={feedback.supportive === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                        onClick={() => handleFeedback('supportive', 'dislike')}
                      />
                    </Space>
                  </div>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                  {mockData.aiTreatmentPlan.supportive.recommendations.content.map((item, index) => (
                    <li key={index}>
                      {item}
                      {index === 2 && mockData.aiTreatmentPlan.supportive.recommendations.drugs && (
                        <>
                          {mockData.aiTreatmentPlan.supportive.recommendations.drugs.map(drug => (
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
                      {mockData.aiTreatmentPlan.management.guide.name}
                      <Tooltip 
                        title={
                          <div>
                            <p>参考指南：</p>
                            <ul style={{ paddingLeft: 16, margin: 0 }}>
                              {mockData.aiTreatmentPlan.management.guide.references.map((ref, index) => (
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
                        onClick={() => handleFeedback('management', 'like')}
                      />
                      <Button
                        type="text"
                        icon={feedback.management === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                        onClick={() => handleFeedback('management', 'dislike')}
                      />
                    </Space>
                  </div>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                  {mockData.aiTreatmentPlan.management.recommendations.content.map((item, index) => (
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
                      {mockData.aiTreatmentPlan.monitoring.guide.name}
                      <Tooltip 
                        title={
                          <div>
                            <p>参考指南：</p>
                            <ul style={{ paddingLeft: 16, margin: 0 }}>
                              {mockData.aiTreatmentPlan.monitoring.guide.references.map((ref, index) => (
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
                        onClick={() => handleFeedback('monitoring', 'like')}
                      />
                      <Button
                        type="text"
                        icon={feedback.monitoring === 'dislike' ? <DislikeFilled style={{ color: '#ff4d4f' }} /> : <DislikeOutlined />}
                        onClick={() => handleFeedback('monitoring', 'dislike')}
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
                      {mockData.aiTreatmentPlan.monitoring.routine.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Col>
                  <Col span={12}>
                    <Title level={5}>警戒指标</Title>
                    <ul style={{ paddingLeft: 20 }}>
                      {mockData.aiTreatmentPlan.monitoring.warning.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </Card>
            </Space>
          </Card>

          {/* AI 推理过程 */}
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>AI 诊断推理过程</span>
                <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
                  以下内容由 AI 系统自动生成，仅供医生参考
                </Typography.Text>
              </div>
            }
            variant="outlined"
          >
            <Timeline 
              mode="left"
              items={mockData.aiReasoning.map((item, index) => ({
                children: (
                  <Card size="small" style={{ marginBottom: 8 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: 8 
                    }}>
                      <Space>
                        <Text strong>{item.title}</Text>
                        <Tag color={item.confidence > 0.8 ? 'green' : 'orange'}>
                          置信度: {(item.confidence * 100).toFixed(0)}%
                        </Tag>
                      </Space>
                      <Space>
                        <Button
                          type="text"
                          icon={feedback[`reasoning_${item.title.toLowerCase().split('分析')[0]}` as keyof typeof feedback] === 'like' 
                            ? <LikeFilled style={{ color: '#1890ff' }} /> 
                            : <LikeOutlined />
                          }
                          onClick={() => handleFeedback(`reasoning_${item.title.toLowerCase().split('分析')[0]}`, 'like')}
                        />
                        <Button
                          type="text"
                          icon={feedback[`reasoning_${item.title.toLowerCase().split('分析')[0]}` as keyof typeof feedback] === 'dislike' 
                            ? <DislikeFilled style={{ color: '#ff4d4f' }} /> 
                            : <DislikeOutlined />
                          }
                          onClick={() => handleFeedback(`reasoning_${item.title.toLowerCase().split('分析')[0]}`, 'dislike')}
                        />
                      </Space>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      marginBottom: 8 
                    }}>
                      <Text>{item.content}</Text>
                    </div>

                    <div>
                      <Text type="secondary">证据支持：</Text>
                      <div style={{ marginTop: 4 }}>
                        {item.evidence.map((evidence, i) => (
                          <Tag key={i} style={{ marginBottom: 4 }}>{evidence}</Tag>
                        ))}
                      </div>
                    </div>

                    <div style={{ 
                      background: '#f5f5f5', 
                      padding: '12px', 
                      borderRadius: '4px',
                      marginTop: 8
                    }}>
                      <Text type="secondary">详细分析：</Text>
                      <ul style={{ 
                        paddingLeft: 20, 
                        margin: '8px 0 0 0',
                        listStyle: 'circle'
                      }}>
                        {item.details.map((detail, i) => (
                          <li key={i} style={{ marginBottom: 4 }}>
                            <Text>{detail}</Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                )
              }))}
            />
          </Card>
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
                {mockData.vitalSigns.bloodPressure} mmHg
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
              {mockData.imaging.findings.map((finding, index) => (
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

          {/* 异常检验结果 */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertOutlined style={{ marginRight: 8 }} />
                异常检验结果
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            <List
              size="small"
              dataSource={mockData.labResults.abnormal}
              renderItem={item => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              renderItem={item => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              renderItem={item => (
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

  // 病历记录标签页组件
  const MedicalRecordTab = () => {
    const { medicalRecords, similarCases } = medicalRecordData;

    const SimilarCaseCard = ({ patient }: { patient: typeof similarCases[0] }) => (
      <Card
        key={patient.id}
        size="small"
        styles={{ body: { padding: '12px' } }}
        hoverable
      >
        {/* 患者基本信息和相似度 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 8
        }}>
          <Space size={4}>
            <Text strong>{patient.name}</Text>
            <Text type="secondary">
              {patient.age}岁 {patient.gender}
            </Text>
          </Space>
          <Tag color="blue" style={{ margin: 0 }}>
            相似度: {patient.similarity}%
          </Tag>
        </div>

        {/* 主要症状 */}
        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
          <Text type="secondary" style={{ flexShrink: 0, marginRight: 4 }}>主要症状：</Text>
          <div style={{ display: 'flex', gap: 4, overflow: 'hidden' }}>
            {patient.mainSymptoms.map((symptom, index) => (
              <Tag 
                key={index} 
                style={{ margin: 0 }}
              >
                {symptom}
              </Tag>
            ))}
          </div>
        </div>

        {/* 诊断和基础疾病 */}
        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center' }}>
          <Text type="secondary" style={{ flexShrink: 0, marginRight: 4 }}>诊断：</Text>
          <Tag color="red" style={{ margin: 0 }}>{patient.diagnosis}</Tag>
        </div>

        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
          <Text type="secondary" style={{ flexShrink: 0, marginRight: 4 }}>基础疾病：</Text>
          <div style={{ display: 'flex', gap: 4, overflow: 'hidden' }}>
            {patient.comorbidities.map((disease, index) => (
              <Tag 
                key={index} 
                color="orange" 
                style={{ margin: 0 }}
              >
                {disease}
              </Tag>
            ))}
          </div>
        </div>

        {/* 治疗结果 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text type="secondary" style={{ flexShrink: 0, marginRight: 4 }}>治疗结果：</Text>
          <Tag color="green" style={{ margin: 0 }}>{patient.outcome}</Tag>
        </div>
      </Card>
    );

    return (
      <div>
        <Row gutter={[24, 24]}>
          {/* 左侧病历记录 */}
          <Col span={16}>
            <Card title="病历记录" variant="borderless">
              <Timeline
                items={medicalRecords.map(record => ({
                  children: (
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>{record.date} {record.title}</Text>
                      <div style={{ marginTop: 8 }}>
                        {record.title === '入院记录' ? (
                          <>
                            <Text>主诉：{(record.content as AdmissionRecord).mainComplaint}</Text>
                            <div style={{ margin: '8px 0' }}>
                              <Text type="secondary">现病史：</Text>
                              <p>{(record.content as AdmissionRecord).presentIllness}</p>
                            </div>
                            <div style={{ margin: '8px 0' }}>
                              <Text type="secondary">既往史：</Text>
                              <p>{(record.content as AdmissionRecord).pastHistory}</p>
                            </div>
                            <div style={{ margin: '8px 0' }}>
                              <Text type="secondary">体格检查：</Text>
                              <p>{(record.content as AdmissionRecord).physicalExam}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <p>{(record.content as ProgressRecord).description}</p>
                            {(record.content as ProgressRecord).treatment && (
                              <div style={{ margin: '8px 0' }}>
                                <Text type="secondary">治疗方案：</Text>
                                <ul style={{ marginLeft: 24 }}>
                                  {(record.content as ProgressRecord).treatment?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )
                }))}
              />
            </Card>
          </Col>

          {/* 右侧相似病例 */}
          <Col span={8}>
            <Card 
              title={
                <Space>
                  <BranchesOutlined />
                  <span>相似病例</span>
                  <Tag color="blue">已匹配 {similarCases.length} 个相似病例</Tag>
                </Space>
              }
            >
              <Space direction="vertical" style={{ width: '100%' }} size={16}>
                {similarCases.map(patient => (
                  <SimilarCaseCard key={patient.id} patient={patient} />
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // 健康监测标签页组件
  const MonitoringTab = () => {
    const [selectedDate, setSelectedDate] = useState(monitoringData.vitalSigns[0].date);

    return (
      <div>
        {/* 顶部日期选择和护理等级 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={16}>
            <Card size="small">
              <Space size={16}>
                <CalendarOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                {monitoringData.vitalSigns.map(day => (
                  <Tag
                    key={day.date}
                    color={selectedDate === day.date ? 'blue' : 'default'}
                    style={{ cursor: 'pointer', padding: '4px 8px' }}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    {day.date}
                  </Tag>
                ))}
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Space>
                <MedicineBoxTwoTone twoToneColor="#52c41a" />
                <Text strong>当前护理等级：</Text>
                <Tag color="green">
                  {monitoringData.nursingLevel.find(n => n.date === selectedDate)?.level}
                </Tag>
              </Space>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* 左侧生命体征和用药记录 */}
          <Col span={16}>
            {/* 生命体征监测 */}
            <Card
              title={
                <Space>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <span>生命体征监测</span>
                </Space>
              }
              style={{ marginBottom: 16 }}
            >
              <Table
                size="small"
                dataSource={monitoringData.vitalSigns
                  .find(day => day.date === selectedDate)
                  ?.records.map((record, index) => ({ key: index, ...record }))}
                columns={[
                  { title: '时间', dataIndex: 'time', width: 100 },
                  { 
                    title: '体温(℃)', 
                    dataIndex: 'temperature',
                    render: (temp) => (
                      <Text type={temp >= 38.5 ? 'danger' : temp >= 37.3 ? 'warning' : 'success'}>
                        {temp}
                      </Text>
                    )
                  },
                  { 
                    title: '心率(次/分)', 
                    dataIndex: 'heartRate',
                    render: (rate) => (
                      <Text type={rate >= 100 ? 'danger' : rate >= 90 ? 'warning' : 'success'}>
                        {rate}
                      </Text>
                    )
                  },
                  { 
                    title: '血压(mmHg)', 
                    dataIndex: 'bloodPressure',
                    render: (bp) => {
                      const [systolic] = bp.split('/').map(Number);
                      return (
                        <Text type={systolic >= 140 ? 'danger' : systolic >= 130 ? 'warning' : 'success'}>
                          {bp}
                        </Text>
                      );
                    }
                  },
                  { 
                    title: '呼吸(次/分)', 
                    dataIndex: 'respiratoryRate',
                    render: (rate) => (
                      <Text type={rate >= 24 ? 'danger' : rate >= 20 ? 'warning' : 'success'}>
                        {rate}
                      </Text>
                    )
                  },
                  { 
                    title: '血氧(%)', 
                    dataIndex: 'oxygenSaturation',
                    render: (spo2) => (
                      <Text type={spo2 <= 93 ? 'danger' : spo2 <= 95 ? 'warning' : 'success'}>
                        {spo2}
                      </Text>
                    )
                  },
                ]}
                pagination={false}
              />
            </Card>

            {/* 用药记录 */}
            <Card
              title={
                <Space>
                  <MedicineBoxTwoTone twoToneColor="#1890ff" />
                  <span>用药记录</span>
                </Space>
              }
              style={{ marginBottom: 16 }}
            >
              <Timeline
                items={monitoringData.medications
                  .find(day => day.date === selectedDate)
                  ?.items.map(med => ({
                    color: med.status === 'completed' ? 'green' : 'blue',
                    children: (
                      <div>
                        <Text strong>{med.name}</Text>
                        <div>
                          <Text type="secondary">用药时间：</Text>
                          {med.time.map(t => (
                            <Tag key={t} color="blue" style={{ marginRight: 4 }}>{t}</Tag>
                          ))}
                        </div>
                        {med.note && (
                          <div>
                            <Text type="secondary">备注：</Text>
                            <Text>{med.note}</Text>
                          </div>
                        )}
                      </div>
                    )
                  }))}
              />
            </Card>

            {/* 护理记录 */}
            <Card
              title={
                <Space>
                  <HeartTwoTone twoToneColor="#52c41a" />
                  <span>护理记录</span>
                </Space>
              }
            >
              <Timeline
                items={monitoringData.nursingRecords
                  .find(day => day.date === selectedDate)
                  ?.records.map(record => ({
                    children: (
                      <div>
                        <Text type="secondary">{record.time}</Text>
                        <div style={{ marginTop: 4 }}>{record.content}</div>
                      </div>
                    )
                  }))}
              />
            </Card>
          </Col>

          {/* 右侧健康标签和预警事件 */}
          <Col span={8}>
            {/* 健康标签 */}
            <Card
              title={
                <Space>
                  <AlertTwoTone twoToneColor="#faad14" />
                  <span>健康标签</span>
                </Space>
              }
              style={{ marginBottom: 16 }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size={16}>
                {monitoringData.healthTags.map((category, index) => (
                  <div key={index}>
                    <Text type="secondary">{category.category}：</Text>
                    <div style={{ marginTop: 8 }}>
                      {category.tags.map((tag, i) => (
                        <Tag key={i} style={{ marginBottom: 8 }}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </Space>
            </Card>

            {/* 预警事件 */}
            <Card
              title={
                <Space>
                  <AlertTwoTone twoToneColor="#ff4d4f" />
                  <span>预警事件</span>
                </Space>
              }
            >
              <Timeline
                items={monitoringData.warningEvents
                  .filter(event => event.time.startsWith(selectedDate))
                  .map(event => ({
                    color: event.type === 'error' ? 'red' : 'orange',
                    dot: <AlertOutlined style={{ fontSize: '16px' }} />,
                    children: (
                      <div>
                        <Text type="secondary">{event.time.split(' ')[1]}</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text type={event.type === 'error' ? 'danger' : 'warning'}>
                            {event.content}
                          </Text>
                        </div>
                      </div>
                    )
                  }))}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // 风险评估标签页组件
  const RiskAssessmentTab = () => {
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

  // 影像资料标签页组件
  const ImagingTab = () => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [selectedTool, setSelectedTool] = useState('Wwwc');
    const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [viewport, setViewport] = useState({
      scale: 1,
      translation: { x: 0, y: 0 },
      voi: { windowWidth: 400, windowCenter: 40 },
      rotation: 0,
    });

    // 初始化 Cornerstone
    useEffect(() => {
      // 确保代码只在客户端运行
      if (typeof window === 'undefined') return;
      if (!viewerRef.current) return;

      const initCornerstone = async () => {
        try {
          // 动态导入 Cornerstone 相关库
          const [
            cs,
            csTools,
            csWadoImageLoader,
            dicomParser,
            Hammer
          ] = await Promise.all([
            import('cornerstone-core'),
            import('cornerstone-tools'),
            import('cornerstone-wado-image-loader'),
            import('dicom-parser'),
            import('hammerjs')
          ]);
          
          const element = viewerRef.current;
          if (!element) return;
          
          cs.default.enable(element);
          
          csWadoImageLoader.default.external.cornerstone = cs.default;
          csWadoImageLoader.default.external.dicomParser = dicomParser.default;
          csWadoImageLoader.default.configure({
            beforeSend: (xhr: XMLHttpRequest) => {
              xhr.responseType = 'arraybuffer';
            }
          });

          csTools.default.external.cornerstone = cs.default;
          csTools.default.external.Hammer = Hammer.default;
          csTools.default.init({
            mouseEnabled: true,
            touchEnabled: true,
            globalToolSyncEnabled: false,
            showSVGCursors: true
          });

          // 注册所需的工具
          csTools.default.addTool(csTools.default.PanTool);
          csTools.default.addTool(csTools.default.ZoomTool);
          csTools.default.addTool(csTools.default.WwwcTool);
          csTools.default.addTool(csTools.default.RectangleRoiTool);
          csTools.default.addTool(csTools.default.LengthTool);
          csTools.default.addTool(csTools.default.RotateTool);
          csTools.default.addTool(csTools.default.StackScrollTool);

          // 设置默认工具
          csTools.default.setToolActive('Pan', { mouseButtonMask: 1 });
          csTools.default.setToolActive('Zoom', { mouseButtonMask: 2 });

          // 添加事件监听器
          element.addEventListener('cornerstoneimagerendered', (evt: Event) => {
            try {
              const eventData = (evt as any).detail;
              const viewport = eventData.viewport;
              setViewport({
                scale: viewport.scale,
                translation: { x: viewport.translation.x, y: viewport.translation.y },
                voi: { windowWidth: viewport.voi.windowWidth, windowCenter: viewport.voi.windowCenter },
                rotation: viewport.rotation,
              });
            } catch (error) {
              console.error('处理视口事件时出错:', error);
            }
          });

          // 启用触摸事件
          element.addEventListener('touchstart', (e) => {
            e.preventDefault();
          });
        } catch (error) {
          console.error('Failed to initialize Cornerstone:', error);
          message.error('初始化影像查看器失败');
        }
      };

      initCornerstone();

      return () => {
        if (typeof window !== 'undefined' && viewerRef.current) {
          import('cornerstone-core').then((cs) => {
            cs.default.disable(viewerRef.current!);
          });
        }
      };
    }, []);

    // 重置视图
    const handleReset = async () => {
      if (!viewerRef.current) return;
      
      try {
        const cs = await import('cornerstone-core');
        const element = viewerRef.current;
        
        // 重置视口参数
        const viewport = (cs.default as any).getDefaultViewport(element);
        (cs.default as any).setViewport(element, viewport);
        (cs.default as any).updateImage(element);
        
        // 重置状态
        setViewport({
          scale: 1,
          translation: { x: 0, y: 0 },
          voi: { windowWidth: 400, windowCenter: 40 },
          rotation: 0,
        });
        
        message.success('视图已重置');
      } catch (error) {
        console.error('Reset error:', error);
        message.error('重置视图失败');
      }
    };

    // 截图功能
    const handleScreenshot = async () => {
      if (!viewerRef.current) return;
      
      try {
        const cs = await import('cornerstone-core');
        const element = viewerRef.current;
        const enabledElement = cs.default.getEnabledElement(element);
        if (!enabledElement || !enabledElement.canvas) {
          message.error('未找到可用的图像');
          return;
        }

        // 获取当前显示的 canvas
        const canvas = enabledElement.canvas;

        // 创建临时 canvas 来包含所有标注
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const ctx = tempCanvas.getContext('2d');
        
        if (!ctx) {
          message.error('创建截图失败');
          return;
        }

        // 绘制原始图像和标注
        ctx.drawImage(canvas, 0, 0);

        // 转换为图片并下载
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const link = document.createElement('a');
        link.download = `dicom-image-${timestamp}.png`;
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
        
        message.success('截图已保存');
      } catch (error) {
        console.error('Screenshot error:', error);
        message.error('截图失败');
      }
    };

    // 加载 DICOM 序列
    const loadDicomSeries = async (seriesPath: string) => {
      try {
        // 获取目录下的所有 DICOM 文件
        const response = await fetch(`/api/dicom-files?path=${seriesPath}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || '加载 DICOM 文件失败');
        }

        if (!Array.isArray(data)) {
          console.error('Invalid response data:', data);
          throw new Error('服务器返回数据格式错误');
        }

        if (data.length === 0) {
          message.warning('未找到 DICOM 文件');
          return;
        }

        // 创建 imageIds
        const newImageIds = data.map(file => `wadouri:${seriesPath}/${file}`);
        setImageIds(newImageIds);
        setCurrentImageIndex(0);

        // 加载第一张图像
        if (!viewerRef.current) {
          throw new Error('影像查看器未初始化');
        }

        const cs = await import('cornerstone-core');
        const image = await cs.default.loadAndCacheImage(newImageIds[0]);
        cs.default.displayImage(viewerRef.current, image);
        
        message.success(`成功加载 ${newImageIds.length} 张影像`);
      } catch (error) {
        console.error('Failed to load DICOM series:', error);
        message.error(error instanceof Error ? error.message : '加载影像数据失败');
      }
    };

    // 处理工具切换
    const handleToolChange = async (tool: string) => {
      if (typeof window === 'undefined' || !viewerRef.current) return;
      
      try {
        const csTools = await import('cornerstone-tools');
        
        // 停用所有工具
        ['Pan', 'Zoom', 'Wwwc', 'RectangleRoi', 'Length', 'Rotate'].forEach(toolName => {
          try {
            csTools.default.setToolPassive(toolName);
          } catch (error) {
            console.warn(`Failed to deactivate tool ${toolName}:`, error);
          }
        });
        
        // 启用选中的工具
        csTools.default.setToolActive(tool, { mouseButtonMask: 1 });
        // 保持滚动工具激活
        csTools.default.setToolActive('StackScroll', { mouseButtonMask: 2 });
        setSelectedTool(tool);
        
        // 显示工具提示
        const toolTips: { [key: string]: string } = {
          Pan: '使用鼠标左键拖动图像',
          Zoom: '使用鼠标左键上下拖动进行缩放',
          Wwwc: '使用鼠标左键调整窗宽窗位',
          RectangleRoi: '使用鼠标左键绘制矩形区域',
          Length: '使用鼠标左键测量距离',
          Rotate: '使用鼠标左键旋转图像'
        };
        
        message.info(toolTips[tool] || '工具已切换');
      } catch (error) {
        console.error(`Failed to change tool to ${tool}:`, error);
        message.error(`无法切换到${tool}工具`);
      }
    };

    // 处理序列选择
    const handleSeriesSelect = (seriesId: string) => {
      setSelectedSeries(seriesId);
      const series = dicomStudies.studies
        .flatMap(study => study.series)
        .find(s => s.id === seriesId);
      
      if (series) {
        loadDicomSeries(series.path);
      }
    };

    // 处理图像切换
    const handleImageScroll = async (delta: number) => {
      if (imageIds.length === 0) return;

      const newIndex = Math.max(0, Math.min(currentImageIndex + delta, imageIds.length - 1));
      if (newIndex !== currentImageIndex && viewerRef.current) {
        setCurrentImageIndex(newIndex);
        const cs = await import('cornerstone-core');
        const image = await cs.default.loadAndCacheImage(imageIds[newIndex]);
        cs.default.displayImage(viewerRef.current, image);
      }
    };

    return (
      <div>
        <Row gutter={[16, 16]}>
          {/* 左侧检查列表 */}
          <Col span={6}>
            <Card title="检查列表">
              <List
                dataSource={dicomStudies.studies}
                renderItem={(study, index) => (
                  <List.Item>
                    <Card size="small" style={{ width: '100%' }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          width: '100%' 
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Text strong style={{ color: '#1890ff', minWidth: '24px' }}>#{index + 1}</Text>
                            <Tag color="blue">{study.type}</Tag>
                            <Text strong>{study.description}</Text>
                          </div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {study.date}
                          </Text>
                        </div>
                        <List
                          size="small"
                          dataSource={study.series}
                          renderItem={series => (
                            <List.Item
                              onClick={() => handleSeriesSelect(series.id)}
                              style={{ 
                                cursor: 'pointer',
                                backgroundColor: selectedSeries === series.id ? '#e6f7ff' : 'transparent',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                marginLeft: '32px',
                                borderLeft: '2px solid #e8e8e8'
                              }}
                            >
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                width: '100%'
                              }}>
                                <FileImageOutlined style={{ color: '#1890ff' }} />
                                <div>{series.description}</div>
                                {study.report.hasAbnormal && (
                                  <WarningOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
                                )}
                                {selectedSeries === series.id && (
                                  <Tag color="blue" style={{ marginLeft: 'auto' }}>当前</Tag>
                                )}
                              </div>
                            </List.Item>
                          )}
                        />
                      </Space>
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* 右侧影像查看器和报告 */}
          <Col span={18}>
            <Space direction="vertical" style={{ width: '100%' }} size={16}>
              {/* 检查报告 */}
              {selectedSeries && (
                <Card
                  title={
                    <Space>
                      <FileTextOutlined />
                      <span>检查报告</span>
                      {dicomStudies.studies.find(study => 
                        study.series.some(s => s.id === selectedSeries)
                      )?.report.hasAbnormal && (
                        <Tag color="error">异常</Tag>
                      )}
                    </Space>
                  }
                >
                  {dicomStudies.studies.map(study => (
                    study.series.some(s => s.id === selectedSeries) && (
                      <Row key={study.id} gutter={16}>
                        <Col span={12}>
                          <div style={{ 
                            backgroundColor: '#fafafa', 
                            padding: '16px', 
                            borderRadius: '8px',
                            height: '100%'
                          }}>
                            <Title level={5}>检查所见</Title>
                            <List
                              size="small"
                              dataSource={study.report.findings}
                              renderItem={(item, index) => (
                                <List.Item style={{ padding: '4px 0' }}>
                                  <Text>{index + 1}. {item}</Text>
                                </List.Item>
                              )}
                            />
                          </div>
                        </Col>
                        <Col span={12}>
                          <div style={{ 
                            backgroundColor: '#fafafa', 
                            padding: '16px', 
                            borderRadius: '8px',
                            height: '100%'
                          }}>
                            <Title level={5}>印象</Title>
                            <List
                              size="small"
                              dataSource={study.report.impression}
                              renderItem={(item, index) => (
                                <List.Item style={{ padding: '4px 0' }}>
                                  <Text strong>{index + 1}. {item}</Text>
                                </List.Item>
                              )}
                            />
                          </div>
                        </Col>
                      </Row>
                    )
                  ))}
                </Card>
              )}

              {/* 影像查看器 */}
              <Card
                title={
                  <Space>
                    <span>影像查看器</span>
                    {imageIds.length > 0 && (
                      <Tag color="blue">
                        {currentImageIndex + 1} / {imageIds.length}
                      </Tag>
                    )}
                  </Space>
                }
                extra={
                  <Space>
                    <Button
                      icon={<DragOutlined />}
                      type={selectedTool === 'Pan' ? 'primary' : 'default'}
                      onClick={() => handleToolChange('Pan')}
                    >
                      平移
                    </Button>
                    <Button
                      icon={<ZoomInOutlined />}
                      type={selectedTool === 'Zoom' ? 'primary' : 'default'}
                      onClick={() => handleToolChange('Zoom')}
                    >
                      缩放
                    </Button>
                    <Button
                      icon={<ControlOutlined />}
                      type={selectedTool === 'Wwwc' ? 'primary' : 'default'}
                      onClick={() => handleToolChange('Wwwc')}
                    >
                      窗宽窗位
                    </Button>
                    <Button
                      icon={<BorderOutlined />}
                      type={selectedTool === 'RectangleRoi' ? 'primary' : 'default'}
                      onClick={() => handleToolChange('RectangleRoi')}
                    >
                      矩形标注
                    </Button>
                    <Button
                      icon={<LineOutlined />}
                      type={selectedTool === 'Length' ? 'primary' : 'default'}
                      onClick={() => handleToolChange('Length')}
                    >
                      测量
                    </Button>
                    <Button
                      icon={<RetweetOutlined />}
                      type={selectedTool === 'Rotate' ? 'primary' : 'default'}
                      onClick={() => handleToolChange('Rotate')}
                    >
                      旋转
                    </Button>
                    <Button
                      icon={<UndoOutlined />}
                      onClick={handleReset}
                    >
                      重置
                    </Button>
                    <Button
                      icon={<CameraOutlined />}
                      onClick={handleScreenshot}
                    >
                      截图
                    </Button>
                  </Space>
                }
              >
                <div
                  ref={viewerRef}
                  style={{
                    width: '100%',
                    height: 'calc(100vh - 500px)',
                    backgroundColor: '#000',
                    position: 'relative'
                  }}
                  onWheel={(e) => {
                    e.preventDefault();
                    handleImageScroll(e.deltaY > 0 ? 1 : -1);
                  }}
                />
                {/* 显示当前视口信息 */}
                {imageIds.length > 0 && (
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 24, 
                    left: 24, 
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontSize: 12
                  }}>
                    缩放: {viewport.scale.toFixed(2)}x | 
                    窗宽: {viewport.voi.windowWidth.toFixed(0)} | 
                    窗位: {viewport.voi.windowCenter.toFixed(0)} | 
                    旋转: {viewport.rotation}°
                  </div>
                )}
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    );
  };

  // 检验结果标签页组件
  const LabResultsTab = () => {
    const [selectedTest, setSelectedTest] = useState<string | null>(null);
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    const { Text } = Typography;
    
    // 定义检验分类
    const categories = labData.categories;
    
    // 模拟检验数据
    const labTests = labData.labTests;
    
    // 模拟检验结果数据
    const testResults = labData.testResults;

    // 根据分类获取检验列表
    const getTestsByCategory = (categoryId: string | null) => {
      if (!categoryId) return labTests;
      return labTests.filter(test => test.category === categoryId);
    };

    // 自动选择第一个检验
    useEffect(() => {
      if (labTests.length > 0 && !selectedTest) {
        setSelectedTest(labTests[0].id);
        setCurrentCategory(null);
      }
    }, []);

    // 渲染趋势指示器
    const renderTrendIndicator = (trend: string) => {
      if (trend === 'up') {
        return <span style={{ color: 'red' }}>↑</span>;
      } else if (trend === 'down') {
        return <span style={{ color: 'blue' }}>↓</span>;
      }
      return null;
    };

    return (
      <div style={{ display: 'flex', height: 'calc(100vh - 250px)' }}>
        {/* 左侧检验列表 */}
        <div style={{ width: 300, marginRight: '16px', display: 'flex', flexDirection: 'column' }}>
          {/* 分类选择 */}
          <Card 
            style={{ marginBottom: '8px' }} 
            styles={{ body: { padding: '8px' } }}
          >
            <Space wrap>
              <Button 
                type={!currentCategory ? 'primary' : 'default'}
                onClick={() => setCurrentCategory(null)}
              >
                全部检验
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  type={currentCategory === category.id ? 'primary' : 'default'}
                  onClick={() => setCurrentCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </Space>
          </Card>
          
          {/* 检验列表 */}
          <Card 
            style={{ 
              flex: 1,
              height: 0,
              overflow: 'auto'
            }}
            title={
              <Space>
                检验列表
                <Tag>{getTestsByCategory(currentCategory).length}</Tag>
              </Space>
            }
            styles={{ body: { padding: '8px' } }}
          >
            <List
              dataSource={getTestsByCategory(currentCategory)}
              renderItem={(test, index) => (
                <List.Item
                  key={test.id}
                  onClick={() => setSelectedTest(test.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedTest === test.id ? '#e6f7ff' : 'transparent',
                    padding: '12px',
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <div style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '50%', 
                        background: test.urgent ? '#ff4d4f' : (test.abnormal ? '#faad14' : '#52c41a'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </div>
                    }
                    title={
                      <Space>
                        {test.name}
                        {test.abnormal && <Tag color="red">异常</Tag>}
                        {test.status === 'processing' && <Tag color="processing">处理中</Tag>}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">{categories.find(c => c.id === test.category)?.name}</Text>
                        <Text type="secondary">采样: {test.date}</Text>
                        {test.reportTime && <Text type="secondary">报告: {test.reportTime}</Text>}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>

        {/* 右侧检验结果详情 */}
        <Card 
          style={{ 
            flex: 1,
            height: '100%',
            overflow: 'auto'
          }}
          styles={{
            body: { padding: '16px' }
          }}
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Space>
                检验结果详情
                {selectedTest && labTests.find(t => t.id === selectedTest)?.abnormal && 
                  <Tag color="red">异常</Tag>
                }
                {selectedTest && labTests.find(t => t.id === selectedTest)?.urgent && 
                  <Tag color="red">急诊</Tag>
                }
              </Space>
              {selectedTest && 
                <Button 
                  type="text" 
                  icon={<PrinterOutlined />} 
                  size="small"
                >
                  打印报告
                </Button>
              }
            </div>
          }
        >
          {selectedTest && testResults[selectedTest as keyof typeof testResults] ? (
            <>
              {/* 检验基本信息 */}
              <Descriptions size="small" bordered column={2}>
                <Descriptions.Item label="检验项目">
                  {labTests.find(t => t.id === selectedTest)?.name}
                </Descriptions.Item>
                <Descriptions.Item label="检验类别">
                  {categories.find(c => c.id === labTests.find(t => t.id === selectedTest)?.category)?.name}
                </Descriptions.Item>
                <Descriptions.Item label="采样时间">
                  {testResults[selectedTest as keyof typeof testResults].samplingTime}
                </Descriptions.Item>
                <Descriptions.Item label="报告时间">
                  {testResults[selectedTest as keyof typeof testResults].reportTime}
                </Descriptions.Item>
                <Descriptions.Item label="检验医师">
                  {testResults[selectedTest as keyof typeof testResults].doctor}
                </Descriptions.Item>
                <Descriptions.Item label="审核医师">
                  {testResults[selectedTest as keyof typeof testResults].reviewDoctor}
                </Descriptions.Item>
              </Descriptions>

              {/* 危急值提示 */}
              {testResults[selectedTest as keyof typeof testResults].criticalValues.length > 0 && (
                <Alert
                  message="危急值提示"
                  description={
                    <div>
                      以下检验项目达到危急值标准，已通知临床医生：
                      <ul>
                        {testResults[selectedTest as keyof typeof testResults].criticalValues.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  }
                  type="error"
                  showIcon
                  style={{ margin: '16px 0' }}
                />
              )}

              {/* 检验项目表格 */}
              <div style={{ margin: '16px 0' }}>
                <Table
                  dataSource={testResults[selectedTest as keyof typeof testResults].items.map((item, index) => ({
                    ...item,
                    key: `${selectedTest}-${index}`
                  }))}
                  columns={[
                    { title: '检验项目', dataIndex: 'name', key: 'name', width: '35%' },
                    { 
                      title: '结果', 
                      dataIndex: 'value', 
                      key: 'value',
                      width: '25%',
                      render: (text, record) => (
                        <span style={{ 
                          color: record.abnormal ? '#ff4d4f' : 'inherit'
                        }}>
                          {text} {renderTrendIndicator(record.trend)}
                        </span>
                      )
                    },
                    { title: '单位', dataIndex: 'unit', key: 'unit', width: '15%' },
                    { title: '参考范围', dataIndex: 'reference', key: 'reference', width: '25%' }
                  ]}
                  pagination={false}
                  size="small"
                  rowClassName={(record) => record.abnormal ? 'ant-table-row-abnormal' : ''}
                />
              </div>

              {/* 检验结论 */}
              <Divider orientation="left">检验结论</Divider>
              <Alert
                message={testResults[selectedTest as keyof typeof testResults].conclusion}
                type="info"
                showIcon
              />
            </>
          ) : (
            <Empty description="暂无检验结果" />
          )}
        </Card>
      </div>
    );
  };

  // 更新标签页配置
  const items = [
    {
      key: 'overview',
      label: '总览',
      children: <OverviewTab />,
    },
    {
      key: 'medical-records',
      label: '病历记录',
      children: <MedicalRecordTab />,
    },
    {
      key: 'monitoring',
      label: '健康监测',
      children: <MonitoringTab />,
    },
    {
      key: 'risk',
      label: '风险评估',
      children: <RiskAssessmentTab />,
    },
    {
      key: 'imaging',
      label: '影像资料',
      children: <ImagingTab />
    },
    {
      key: 'lab',
      label: '检验结果',
      children: <LabResultsTab />,
    },
  ];

  return (
    <>
      <Row>
        {/* 左侧信息面板 - 占据1/6宽度 */}
        <Col span={4} style={{ borderRight: '1px solid #f0f0f0' }}>
          <div>
            {/* 基本信息 */}
            <Card 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Space>
                    <UserOutlined />
                    <span>基本信息</span>
                  </Space>
                  <Tag color="orange">一级护理</Tag>
                </div>
              }
              size="small"
              style={{ marginBottom: '16px' }}
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="姓名">{patientDetail.basicInfo.name}</Descriptions.Item>
                <Descriptions.Item label="年龄">{patientDetail.basicInfo.age}岁</Descriptions.Item>
                <Descriptions.Item label="性别">{patientDetail.basicInfo.gender}</Descriptions.Item>
                <Descriptions.Item label="血型">{patientDetail.basicInfo.bloodType}</Descriptions.Item>
                <Descriptions.Item label="职业">{patientDetail.basicInfo.occupation}</Descriptions.Item>
              </Descriptions>
            </Card>

            {/* 疾病标签 */}
            <Card 
              title={<><HeartOutlined /> 疾病标签</>}
              size="small"
              style={{ marginBottom: '16px' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {patientDetail.diseaseLabels.map((disease, index) => (
                  <Tag key={index} color={disease.severity === 'error' ? 'red' : 'orange'}>
                    {disease.name}
                  </Tag>
                ))}
              </div>
            </Card>

            {/* 风险评估 */}
            <Card 
              title={<><AlertOutlined /> 风险评估</>}
              size="small"
              style={{ marginBottom: '16px' }}
            >
              <div style={{ marginBottom: '8px' }}>
                <div>心血管风险</div>
                <Progress percent={patientDetail.riskAssessment.cardiovascular.score} status="exception" />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <div>糖尿病风险</div>
                <Progress percent={patientDetail.riskAssessment.diabetes.score} status="normal" strokeColor="#faad14" />
              </div>
              <Divider style={{ margin: '8px 0' }}>并发症风险</Divider>
              {patientDetail.riskAssessment.complications.map((comp, index) => (
                <Tag key={index} color={comp.risk === 'high' ? 'red' : 'orange'}>
                  {comp.name}
                </Tag>
              ))}
            </Card>

            {/* 患者依从性 */}
            <Card 
              title={<><CheckCircleOutlined /> 患者依从性</>}
              size="small"
              style={{ marginBottom: '16px' }}
            >
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>服药依从性</span>
                  <Text type={patientDetail.compliance.medicationAdherence >= 85 ? 'success' : 
                          patientDetail.compliance.medicationAdherence >= 70 ? 'warning' : 'danger'}>
                    {patientDetail.compliance.medicationAdherence >= 85 ? '优' :
                     patientDetail.compliance.medicationAdherence >= 70 ? '良' :
                     patientDetail.compliance.medicationAdherence >= 60 ? '中' : '差'}
                  </Text>
                </div>
                <Progress percent={patientDetail.compliance.medicationAdherence} showInfo={false} />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>随访依从性</span>
                  <Text type={patientDetail.compliance.followUpRate >= 85 ? 'success' : 
                          patientDetail.compliance.followUpRate >= 70 ? 'warning' : 'danger'}>
                    {patientDetail.compliance.followUpRate >= 85 ? '优' :
                     patientDetail.compliance.followUpRate >= 70 ? '良' :
                     patientDetail.compliance.followUpRate >= 60 ? '中' : '差'}
                  </Text>
                </div>
                <Progress percent={patientDetail.compliance.followUpRate} showInfo={false} />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>饮食依从性</span>
                  <Text type={patientDetail.compliance.dietaryCompliance >= 85 ? 'success' : 
                          patientDetail.compliance.dietaryCompliance >= 70 ? 'warning' : 'danger'}>
                    {patientDetail.compliance.dietaryCompliance >= 85 ? '优' :
                     patientDetail.compliance.dietaryCompliance >= 70 ? '良' :
                     patientDetail.compliance.dietaryCompliance >= 60 ? '中' : '差'}
                  </Text>
                </div>
                <Progress percent={patientDetail.compliance.dietaryCompliance} status="normal" strokeColor="#faad14" showInfo={false} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>运动依从性</span>
                  <Text type={patientDetail.compliance.exerciseAdherence >= 85 ? 'success' : 
                          patientDetail.compliance.exerciseAdherence >= 70 ? 'warning' : 'danger'}>
                    {patientDetail.compliance.exerciseAdherence >= 85 ? '优' :
                     patientDetail.compliance.exerciseAdherence >= 70 ? '良' :
                     patientDetail.compliance.exerciseAdherence >= 60 ? '中' : '差'}
                  </Text>
                </div>
                <Progress percent={patientDetail.compliance.exerciseAdherence} status="normal" strokeColor="#faad14" showInfo={false} />
              </div>
            </Card>

            {/* 健康概况 */}
            <Card 
              title={<><MedicineBoxOutlined /> 健康概况</>}
              size="small"
              style={{ marginBottom: '16px' }}
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="身高">{patientDetail.healthOverview.height} cm</Descriptions.Item>
                <Descriptions.Item label="体重">{patientDetail.healthOverview.weight} kg</Descriptions.Item>
                <Descriptions.Item label="BMI">{patientDetail.healthOverview.bmi}</Descriptions.Item>
                <Descriptions.Item label="血压">{patientDetail.healthOverview.bloodPressure}</Descriptions.Item>
                <Descriptions.Item label="血糖">{patientDetail.healthOverview.bloodSugar}</Descriptions.Item>
                <Descriptions.Item label="吸烟">{patientDetail.healthOverview.habits.smoking}</Descriptions.Item>
                <Descriptions.Item label="饮酒">{patientDetail.healthOverview.habits.drinking}</Descriptions.Item>
                <Descriptions.Item label="运动">{patientDetail.healthOverview.habits.exercise}</Descriptions.Item>
              </Descriptions>
            </Card>

            {/* 干预概况 */}
            <Card 
              title={<><ScheduleOutlined /> 干预概况</>}
              size="small"
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="入院日期">{patientDetail.interventions.admissionDate}</Descriptions.Item>
                <Descriptions.Item label="呼吸支持">{patientDetail.interventions.respiratorySupport}</Descriptions.Item>
              </Descriptions>
              <Divider style={{ margin: '8px 0' }}>当前用药</Divider>
              {patientDetail.interventions.medications.map((med, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                  <Tag color="blue">{med.name}</Tag>
                  <span style={{ fontSize: '12px' }}>{med.dosage} {med.frequency}</span>
                </div>
              ))}
              <Divider style={{ margin: '8px 0' }}>治疗方案</Divider>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {patientDetail.interventions.treatments.map((treatment, index) => (
                  <Tag key={index} color="cyan">{treatment}</Tag>
                ))}
              </div>
            </Card>
          </div>
        </Col>

        {/* 右侧内容区域 */}
        <Col span={20}>
          <div style={{ paddingLeft: '20px' }}>
            <Tabs
              items={items}
              defaultActiveKey="overview"
              type="card"
              style={{ marginBottom: '16px' }}
            />
          </div>
        </Col>
      </Row>

      {/* 固定的聊天按钮 */}
      <Button
        type="primary"
        icon={<MessageOutlined />}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          height: '48px',
          width: '48px',
          borderRadius: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
        onClick={() => setIsChatOpen(true)}
      />

      {/* 聊天窗口 */}
      <ChatWindow
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        patientInfo={chatPatientInfo}
      />

      {/* 质疑诊断对话框 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <QuestionCircleOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            <span>质疑诊断结果</span>
          </div>
        }
        open={isQuestionModalOpen}
        onCancel={() => setIsQuestionModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsQuestionModalOpen(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleQuestionSubmit}>
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

      {/* 补充检查信息对话框 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PlusCircleOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            <span>补充检查信息</span>
          </div>
        }
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsUploadModalOpen(false)}>
            取消
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleSupplementSubmit}
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

      {/* 调整知识储备对话框 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DatabaseOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            <span>调整 AI 知识储备层级</span>
          </div>
        }
        open={isKnowledgeModalOpen}
        onCancel={() => setIsKnowledgeModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsKnowledgeModalOpen(false)}>
            取消
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => {
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
              setIsKnowledgeModalOpen(false);
            }}
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

      {/* 评论对话框 */}
      <Modal
        title={`${actionType === 'like' ? '点赞' : '点踩'}反馈`}
        open={commentModalVisible}
        onOk={handleCommentSubmit}
        onCancel={() => {
          setCommentModalVisible(false);
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
    </>
  );
};

export default PatientDiagnosisPage; 