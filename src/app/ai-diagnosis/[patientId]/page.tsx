'use client';

import React, { useState } from 'react';
import { Row, Col, Typography, Tabs, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

// 导入Mock数据
import { patientDetail, mockData } from '@/mocks';

// 导入组件
import ChatWindow from '@/components/ChatWindow';
import DiagnosisQuestionModal from '@/components/DiagnosisQuestionModal';
import SupplementInfoModal from '@/components/SupplementInfoModal';
import KnowledgeLevelModal from '@/components/KnowledgeLevelModal';
import FeedbackCommentModal from '@/components/FeedbackCommentModal';
import PatientInfoSidebar from '@/components/PatientInfoSidebar';

// 导入Tab页面
import LabResultsTab from './tabs/LabResultsTab';
import ImagingTab from './tabs/ImagingTab';
import RiskAssessmentTab from './tabs/RiskAssessmentTab';
import MonitoringTab from './tabs/MonitoringTab';
import MedicalRecordTab from './tabs/MedicalRecordTab';
import OverviewTab from './tabs/OverviewTab';

const { Title, Text, Paragraph } = Typography;

const PatientDiagnosisPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [knowledgeLevel, setKnowledgeLevel] = useState(1);
  const [questionInput, setQuestionInput] = useState('');
  const [activeTabKey, setActiveTabKey] = useState('overview');
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

  // 处理反馈更新
  const handleFeedbackUpdate = (section: string, type: 'like' | 'dislike' | null) => {
    setFeedback(prev => ({
      ...prev,
      [section]: type
    }));
  };

  // 更新标签页配置
  const items = [
    {
      key: 'overview',
      label: '总览',
      children: (
        <OverviewTab 
          mockData={mockData}
          feedback={feedback}
          onFeedback={handleFeedback}
          onOpenQuestionModal={() => setIsQuestionModalOpen(true)}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onOpenKnowledgeModal={() => setIsKnowledgeModalOpen(true)}
        />
      ),
    },
    {
      key: 'medical_record',
      label: '病历记录',
      children: <MedicalRecordTab />,
    },
    {
      key: 'monitoring',
      label: '健康监测',
      children: <MonitoringTab />,
    },
    {
      key: 'risk_assessment',
      label: '风险评估',
      children: <RiskAssessmentTab />,
    },
    {
      key: 'imaging',
      label: '医学影像',
      children: <ImagingTab />,
    },
    {
      key: 'lab_results',
      label: '检验结果',
      children: <LabResultsTab />,
    },
  ];

  return (
    <>
      <Row>
        {/* 使用封装的左侧信息面板组件 */}
        <Col span={4} style={{ borderRight: '1px solid #f0f0f0' }}>
          <PatientInfoSidebar
            basicInfo={patientDetail.basicInfo}
            diseaseLabels={patientDetail.diseaseLabels}
            riskAssessment={patientDetail.riskAssessment}
            compliance={patientDetail.compliance}
            healthOverview={patientDetail.healthOverview}
            interventions={patientDetail.interventions}
          />
        </Col>

        {/* 右侧内容区域 */}
        <Col span={20}>
          <div style={{ paddingLeft: '20px' }}>
            <Tabs
              items={items}
              activeKey={activeTabKey}
              onChange={setActiveTabKey}
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

      {/* 底部固定的AI聊天窗口 */}
      <ChatWindow
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        patientInfo={chatPatientInfo}
      />

      {/* 使用封装的对话框组件 */}
      <DiagnosisQuestionModal
        isOpen={isQuestionModalOpen}
        onCancel={() => setIsQuestionModalOpen(false)}
        questionInput={questionInput}
        setQuestionInput={setQuestionInput}
        onSubmitSuccess={() => setIsQuestionModalOpen(false)}
      />

      <SupplementInfoModal
        isOpen={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        supplementInfo={supplementInfo}
        setSupplementInfo={setSupplementInfo}
        mentionOptions={mentionOptions}
        setMentionOptions={setMentionOptions}
        onSubmitSuccess={() => setIsUploadModalOpen(false)}
      />

      <KnowledgeLevelModal
        isOpen={isKnowledgeModalOpen}
        onCancel={() => setIsKnowledgeModalOpen(false)}
        knowledgeLevel={knowledgeLevel}
        setKnowledgeLevel={setKnowledgeLevel}
      />

      <FeedbackCommentModal
        isOpen={commentModalVisible}
        onCancel={() => {
          setCommentModalVisible(false);
          setCommentText('');
        }}
        actionType={actionType}
        commentText={commentText}
        setCommentText={setCommentText}
        currentSection={currentSection}
        onFeedbackUpdate={handleFeedbackUpdate}
      />
    </>
  );
};

export default PatientDiagnosisPage; 