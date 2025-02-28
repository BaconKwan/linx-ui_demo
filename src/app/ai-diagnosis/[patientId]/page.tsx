'use client';

import { useState } from 'react';
import { Card, Descriptions, Tag, Progress, Row, Col, Typography, Divider, Tabs, Button, Statistic, Timeline, List, Collapse, Space, Alert, Tooltip, Steps, message, Modal, Input, Upload, Mentions, Slider, Table } from 'antd';
import { 
  UserOutlined, 
  HeartOutlined, 
  AlertOutlined, 
  CheckCircleOutlined,
  MedicineBoxOutlined,
  ScheduleOutlined,
  MessageOutlined,
  RiseOutlined,
  FallOutlined,
  RobotOutlined,
  FileImageOutlined,
  ExperimentOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  NodeIndexOutlined,
  WarningOutlined,
  LineChartOutlined,
  BranchesOutlined,
  ReadOutlined,
  QuestionCircleOutlined,
  PlusCircleOutlined,
  DatabaseOutlined,
  InboxOutlined,
  CalendarOutlined,
  MedicineBoxTwoTone,
  HeartTwoTone,
  AlertTwoTone,
  PushpinOutlined,
} from '@ant-design/icons';
import ChatWindow from '@/components/ChatWindow';

const { Title, Text } = Typography;

// 模拟的患者详细信息数据
const patientDetail = {
  basicInfo: {
    name: '张三',
    age: 45,
    gender: '男',
    idCard: '310********1234',
    phone: '138****5678',
    address: '上海市浦东新区****',
    bloodType: 'A型',
    occupation: '工程师',
  },
  diseaseLabels: [
    { name: '高血压', severity: 'warning' },
    { name: '2型糖尿病', severity: 'error' },
    { name: '高脂血症', severity: 'warning' },
  ],
  riskAssessment: {
    cardiovascular: { level: '高危', score: 85 },
    diabetes: { level: '中危', score: 65 },
    complications: [
      { name: '糖尿病肾病', risk: 'high' },
      { name: '心血管疾病', risk: 'medium' },
    ],
  },
  compliance: {
    medicationAdherence: 85,
    followUpRate: 90,
    dietaryCompliance: 75,
    exerciseAdherence: 60,
  },
  healthOverview: {
    height: 175,
    weight: 75,
    bmi: 24.5,
    bloodPressure: '135/85',
    bloodSugar: '7.2',
    habits: {
      smoking: '已戒烟',
      drinking: '偶尔饮酒',
      exercise: '每周3次',
    },
  },
  interventions: {
    admissionDate: '2024-03-10',
    medications: [
      { name: '缬沙坦', dosage: '80mg', frequency: '每日一次' },
      { name: '二甲双胍', dosage: '500mg', frequency: '每日两次' },
    ],
    respiratorySupport: '无需支持',
    treatments: ['降压治疗', '血糖控制', '生活方式干预'],
  },
};

// 添加新的模拟数据
const mockData = {
  // ... 保持现有的 patientDetail 数据 ...
  
  aiReasoning: [
    {
      timestamp: '2024-03-20 14:30:00',
      title: '症状分析',
      content: '基于患者的症状和体征，初步判断为重症肺炎',
      confidence: 0.85,
      evidence: ['持续发热', '血氧饱和度下降', 'PCT升高'],
      details: [
        '患者主要症状：发热（38.5℃）、呼吸频率增快（22次/分）、血氧饱和度降低（93%）',
        '症状持续时间：3天',
        '症状进展：逐渐加重'
      ]
    },
    {
      timestamp: '2024-03-20 14:30:30',
      title: '实验室检查分析',
      content: '结合实验室检查结果，提示存在严重炎症反应',
      confidence: 0.88,
      evidence: ['WBC升高', 'CRP显著升高', 'PCT升高', 'D-二聚体升高'],
      details: [
        'WBC升高（12.5×10^9/L）提示存在炎症反应',
        'CRP（65.8mg/L）和PCT（0.8ng/mL）显著升高提示可能存在细菌感染',
        'D-二聚体升高（1.2mg/L）提示需要关注血栓风险'
      ]
    },
    {
      timestamp: '2024-03-20 14:31:00',
      title: '影像学分析',
      content: '结合影像学表现，考虑为病毒性肺炎',
      confidence: 0.78,
      evidence: ['双肺磨玻璃密度影', '病灶分布弥漫'],
      details: [
        'CT显示双肺多发磨玻璃密度影',
        '病变呈周围分布',
        '符合病毒性肺炎影像学特征'
      ]
    },
    {
      timestamp: '2024-03-20 14:31:30',
      title: '病原学结果分析',
      content: '病原学结果提示新型冠状病毒感染',
      confidence: 0.92,
      evidence: ['核酸检测阳性', '病原宏基因组检出新冠病毒'],
      details: [
        'PCR检测新冠病毒阳性',
        '宏基因组测序显示新冠病毒reads数15680（86.5%）',
        '合并肺炎链球菌低水平感染（reads数420，2.3%）'
      ]
    }
  ],
  
  vitalSigns: {
    temperature: 38.5,
    heartRate: 95,
    bloodPressure: '135/85',
    respiratoryRate: 22,
    oxygenSaturation: 93,
    consciousness: 'Clear'
  },
  
  imaging: {
    type: 'CT',
    date: '2024-03-20',
    findings: [
      '双肺多发磨玻璃密度影',
      '双肺病变呈周围分布',
      '未见胸腔积液',
      '纵隔淋巴结未见明显肿大'
    ],
    conclusion: '病毒性肺炎表现，建议结合临床'
  },
  
  labResults: {
    abnormal: [
      { item: 'WBC', value: '12.5', unit: '×10^9/L', reference: '4-10', status: 'high' },
      { item: 'CRP', value: '65.8', unit: 'mg/L', reference: '0-8', status: 'high' },
      { item: 'PCT', value: '0.8', unit: 'ng/mL', reference: '0-0.5', status: 'high' },
      { item: 'D-dimer', value: '1.2', unit: 'mg/L', reference: '0-0.5', status: 'high' }
    ]
  },
  
  pathogenTest: {
    method: '常规病原学检测',
    date: '2024-03-20',
    results: [
      { pathogen: '新型冠状病毒', result: '阳性', method: 'PCR' }
    ]
  },
  
  metagenomics: {
    method: '病原宏基因组测序',
    date: '2024-03-20',
    results: [
      { pathogen: '新型冠状病毒', reads: 15680, percentage: '86.5%', confidence: 'high' },
      { pathogen: '肺炎链球菌', reads: 420, percentage: '2.3%', confidence: 'low' }
    ]
  },

  // 添加 AI 思维链和诊断内容
  aiThinkingChain: [
    {
      step: 1,
      title: '症状分析',
      content: [
        '患者主要症状：发热（38.5℃）、呼吸频率增快（22次/分）、血氧饱和度降低（93%）',
        '症状持续时间：3天',
        '症状进展：逐渐加重'
      ]
    },
    {
      step: 2,
      title: '实验室检查分析',
      content: [
        'WBC升高（12.5×10^9/L）提示存在炎症反应',
        'CRP（65.8mg/L）和PCT（0.8ng/mL）显著升高提示可能存在细菌感染',
        'D-二聚体升高（1.2mg/L）提示需要关注血栓风险'
      ]
    },
    {
      step: 3,
      title: '影像学分析',
      content: [
        'CT显示双肺多发磨玻璃密度影',
        '病变呈周围分布',
        '符合病毒性肺炎影像学特征'
      ]
    },
    {
      step: 4,
      title: '病原学结果分析',
      content: [
        'PCR检测新冠病毒阳性',
        '宏基因组测序显示新冠病毒reads数15680（86.5%）',
        '合并肺炎链球菌低水平感染（reads数420，2.3%）'
      ]
    }
  ],

  aiDiagnosis: {
    etiology: {
      primary: '新型冠状病毒感染',
      secondary: '疑似合并肺炎链球菌感染',
      evidence: [
        'PCR检测阳性',
        '宏基因组测序确证',
        '典型的影像学表现',
        '炎症指标升高'
      ]
    },
    severity: {
      level: '重度',
      score: 85,
      criteria: [
        '血氧饱和度降低（93%）',
        '呼吸频率增快（22次/分）',
        'PCT显著升高',
        '影像学显示病变范围广泛'
      ]
    },
    progression: {
      trend: '进展风险高',
      factors: [
        '高龄（65岁）',
        '基础疾病（高血压、糖尿病）',
        '炎症指标持续升高',
        '氧合指数下降'
      ],
      prediction: '未来48-72小时是关键观察期，需警惕进展为危重型'
    },
    risks: [
      {
        type: '呼吸衰竭',
        probability: 'high',
        timeWindow: '24-48小时',
        indicators: ['血氧持续下降', '呼吸频率增快']
      },
      {
        type: '血栓形成',
        probability: 'medium',
        timeWindow: '48-72小时',
        indicators: ['D-二聚体升高', '活动受限']
      },
      {
        type: '基础疾病加重',
        probability: 'medium',
        timeWindow: '72小时内',
        indicators: ['血压波动', '血糖控制不佳']
      }
    ]
  }
};

// 添加模拟的监测数据
const monitoringData = {
  vitalSigns: [
    {
      date: '2024-03-20',
      records: [
        { time: '08:00', temperature: 38.5, heartRate: 95, bloodPressure: '135/85', respiratoryRate: 22, oxygenSaturation: 93 },
        { time: '12:00', temperature: 38.3, heartRate: 92, bloodPressure: '132/82', respiratoryRate: 20, oxygenSaturation: 94 },
        { time: '16:00', temperature: 38.7, heartRate: 98, bloodPressure: '138/88', respiratoryRate: 23, oxygenSaturation: 92 },
        { time: '20:00', temperature: 38.2, heartRate: 90, bloodPressure: '130/80', respiratoryRate: 21, oxygenSaturation: 93 },
      ]
    },
    {
      date: '2024-03-21',
      records: [
        { time: '08:00', temperature: 38.2, heartRate: 92, bloodPressure: '132/82', respiratoryRate: 21, oxygenSaturation: 94 },
        { time: '12:00', temperature: 38.0, heartRate: 88, bloodPressure: '130/80', respiratoryRate: 20, oxygenSaturation: 95 },
        { time: '16:00', temperature: 38.4, heartRate: 94, bloodPressure: '134/84', respiratoryRate: 22, oxygenSaturation: 93 },
        { time: '20:00', temperature: 38.1, heartRate: 90, bloodPressure: '131/81', respiratoryRate: 20, oxygenSaturation: 94 },
      ]
    },
    {
      date: '2024-03-22',
      records: [
        { time: '08:00', temperature: 37.9, heartRate: 88, bloodPressure: '130/80', respiratoryRate: 20, oxygenSaturation: 95 },
        { time: '12:00', temperature: 37.8, heartRate: 86, bloodPressure: '128/78', respiratoryRate: 19, oxygenSaturation: 96 },
        { time: '16:00', temperature: 38.0, heartRate: 90, bloodPressure: '132/82', respiratoryRate: 20, oxygenSaturation: 95 },
        { time: '20:00', temperature: 37.9, heartRate: 88, bloodPressure: '130/80', respiratoryRate: 19, oxygenSaturation: 96 },
      ]
    }
  ],
  nursingLevel: [
    { date: '2024-03-20', level: 'III级', reason: '病情危重，需要密切监护' },
    { date: '2024-03-21', level: 'III级', reason: '持续发热，需要严密观察' },
    { date: '2024-03-22', level: 'II级', reason: '体温有所下降，病情趋于稳定' },
  ],
  medications: [
    {
      date: '2024-03-20',
      items: [
        { name: '奈玛特韦/利托那韦', time: ['08:00', '20:00'], status: 'completed' },
        { name: '头孢曲松', time: ['10:00', '22:00'], status: 'completed' },
        { name: '对乙酰氨基酚', time: ['14:00'], status: 'completed', note: '降温' },
      ]
    },
    {
      date: '2024-03-21',
      items: [
        { name: '奈玛特韦/利托那韦', time: ['08:00', '20:00'], status: 'completed' },
        { name: '头孢曲松', time: ['10:00', '22:00'], status: 'completed' },
      ]
    },
    {
      date: '2024-03-22',
      items: [
        { name: '奈玛特韦/利托那韦', time: ['08:00', '20:00'], status: 'completed' },
        { name: '头孢曲松', time: ['10:00', '22:00'], status: 'completed' },
      ]
    }
  ],
  nursingRecords: [
    {
      date: '2024-03-20',
      records: [
        { time: '08:30', content: '患者精神状态一般，发热明显，给予物理降温' },
        { time: '12:30', content: '协助患者翻身，指导呼吸功能锻炼' },
        { time: '16:30', content: '测量生命体征，体温仍有波动' },
        { time: '20:30', content: '夜间睡眠欠佳，予以心理安抚' },
      ]
    },
    {
      date: '2024-03-21',
      records: [
        { time: '08:30', content: '患者精神状态较前改善，发热持续' },
        { time: '12:30', content: '指导患者进行床上活动，监测血氧' },
        { time: '16:30', content: '患者诉胸闷气促症状减轻' },
        { time: '20:30', content: '夜间休息情况改善' },
      ]
    },
    {
      date: '2024-03-22',
      records: [
        { time: '08:30', content: '患者精神状态好转，体温有所下降' },
        { time: '12:30', content: '指导患者适当活动，监测各项指标' },
        { time: '16:30', content: '患者活动耐受良好，无不适' },
        { time: '20:30', content: '夜间休息良好' },
      ]
    }
  ],
  healthTags: [
    { category: '症状', tags: ['发热', '呼吸困难', '咳嗽', '乏力'] },
    { category: '体征', tags: ['体温升高', '呼吸频率增快', '血氧饱和度降低'] },
    { category: '并发症风险', tags: ['呼吸衰竭', '血栓形成'] },
    { category: '注意事项', tags: ['卧床休息', '监测血氧', '防止坠床'] },
  ],
  warningEvents: [
    { time: '2024-03-20 16:00', type: 'warning', content: '体温升至38.7℃，已采取降温措施' },
    { time: '2024-03-20 18:00', type: 'error', content: '血氧饱和度降至92%，已加强氧疗' },
    { time: '2024-03-21 10:00', type: 'warning', content: '患者出现轻度呼吸困难，已通知医生' },
  ]
};

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
                  { title: '数据推理', description: '完成' },
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
              患者为65岁男性，目前诊断为新型冠状病毒感染，疑似合并肺炎链球菌感染。主要表现为发热（38.5℃）、呼吸频率增快（22次/分）、血氧饱和度降低（93%），症状持续3天且呈进行性加重。实验室检查显示炎症指标明显升高，影像学表现为双肺多发磨玻璃密度影。病情评估为重度，存在进展为危重型的风险。基于患者年龄、基础疾病（高血压、糖尿病）、实验室指标和影像学表现，预计未来48-72小时是关键观察期。建议密切监测生命体征、血氧饱和度，警惕呼吸衰竭和血栓并发症风险，同时关注基础疾病变化。
            </div>

            <Row gutter={[16, 16]}>
              {/* 病因分析 */}
              <Col span={8}>
                <Card
                  type="inner"
                  title={
                    <Space>
                      <ExperimentOutlined />
                      <Text strong>病因分析</Text>
                    </Space>
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
                    <Space>
                      <WarningOutlined />
                      <Text strong>病情严重程度</Text>
                    </Space>
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
                    <Space>
                      <LineChartOutlined />
                      <Text strong>病情发展与风险预测</Text>
                    </Space>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MedicineBoxOutlined style={{ marginRight: 8 }} />
                AI 干预措施推荐
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
                  <Space>
                    抗病毒治疗
                    <Tooltip 
                      title={
                        <div>
                          <p>参考指南：</p>
                          <ul style={{ paddingLeft: 16, margin: 0 }}>
                            <li>《新型冠状病毒感染诊疗方案（第十版）》</li>
                            <li>《重症新型冠状病毒感染诊治指南（第四版）》</li>
                          </ul>
                        </div>
                      }
                    >
                      <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                  <li>建议使用小分子抗病毒药物，可选择：
                    <Tag color="blue" style={{ marginLeft: 8 }}>奈玛特韦/利托那韦</Tag>
                    <Tag color="blue">莫诺拉韦</Tag>
                  </li>
                  <li>用药时注意相互作用，特别是与降压、降糖药物的相互作用</li>
                </ul>
              </Card>

              {/* 抗菌治疗 */}
              <Card 
                type="inner" 
                title={
                  <Space>
                    抗菌治疗
                    <Tooltip 
                      title={
                        <div>
                          <p>参考指南：</p>
                          <ul style={{ paddingLeft: 16, margin: 0 }}>
                            <li>《中国成人社区获得性肺炎诊断和治疗指南（2016年版）》</li>
                            <li>《抗菌药物临床应用指导原则（2015年版）》</li>
                          </ul>
                        </div>
                      }
                    >
                      <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                  <li>考虑存在肺炎链球菌合并感染，建议使用：
                    <Tag color="blue" style={{ marginLeft: 8 }}>头孢曲松</Tag>
                    <Tag color="blue">莫西沙星</Tag>
                  </li>
                  <li>建议治疗疗程7-14天，根据临床反应调整</li>
                </ul>
              </Card>

              {/* 对症支持治疗 */}
              <Card 
                type="inner" 
                title={
                  <Space>
                    对症支持治疗
                    <Tooltip 
                      title={
                        <div>
                          <p>参考指南：</p>
                          <ul style={{ paddingLeft: 16, margin: 0 }}>
                            <li>《重症医学专家共识》</li>
                            <li>《发热患者诊疗专家共识（2017版）》</li>
                          </ul>
                        </div>
                      }
                    >
                      <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                  <li>氧疗：建议开始低流量氧疗（2-3L/min），根据血氧饱和度调整</li>
                  <li>解热：体温{'>'} 38.5℃时使用对乙酰氨基酚</li>
                  <li>化痰：建议使用
                    <Tag color="blue" style={{ marginLeft: 8 }}>乙酰半胱氨酸</Tag>
                  </li>
                </ul>
              </Card>

              {/* 基础疾病管理 */}
              <Card 
                type="inner" 
                title={
                  <Space>
                    基础疾病管理
                    <Tooltip 
                      title={
                        <div>
                          <p>参考指南：</p>
                          <ul style={{ paddingLeft: 16, margin: 0 }}>
                            <li>《中国高血压防治指南（2018年修订版）》</li>
                            <li>《中国2型糖尿病防治指南（2020年版）》</li>
                          </ul>
                        </div>
                      }
                    >
                      <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                  <li>高血压：继续使用缬沙坦，密切监测血压</li>
                  <li>糖尿病：暂停二甲双胍，改用胰岛素控制血糖</li>
                  <li>目标：血压{'<'}140/90mmHg，空腹血糖6-10mmol/L</li>
                </ul>
              </Card>

              {/* 监测建议 */}
              <Card 
                type="inner" 
                title={
                  <Space>
                    监测建议
                    <Tooltip 
                      title={
                        <div>
                          <p>参考指南：</p>
                          <ul style={{ paddingLeft: 16, margin: 0 }}>
                            <li>《重症医学监护治疗专家共识》</li>
                            <li>《急性呼吸窘迫综合征诊治指南（2019版）》</li>
                          </ul>
                        </div>
                      }
                    >
                      <ReadOutlined style={{ color: '#1890ff', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                } 
                size="small"
                styles={{ body: { padding: '12px' } }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Title level={5}>常规监测</Title>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>生命体征：每4小时</li>
                      <li>血气分析：每日1次</li>
                      <li>血常规、CRP：每48小时</li>
                    </ul>
                  </Col>
                  <Col span={12}>
                    <Title level={5}>警戒指标</Title>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>血氧饱和度 {'<'} 92%</li>
                      <li>呼吸频率 {'>'} 30次/分</li>
                      <li>血压 {'<'} 90/60mmHg</li>
                    </ul>
                  </Col>
                </Row>
              </Card>
            </Space>
          </Card>

          {/* AI 推理过程 */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <NodeIndexOutlined style={{ marginRight: 8 }} />
                AI 诊断推理过程
              </div>
            }
            variant="outlined"
          >
            <Timeline 
              mode="left"
              items={mockData.aiReasoning.map((item, index) => ({
                key: index,
                dot: <BranchesOutlined style={{ fontSize: '16px' }} />,
                color: item.confidence > 0.8 ? 'green' : 'blue',
                children: (
                  <Card 
                    size="small" 
                    style={{ marginBottom: 16 }}
                    title={
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text strong>{item.title}</Text>
                        <Tag color="blue">
                          置信度: {(item.confidence * 100).toFixed(0)}%
                        </Tag>
                      </div>
                    }
                  >
                    <div style={{ marginBottom: 12 }}>
                      <Text>{item.content}</Text>
                    </div>
                    
                    <div style={{ 
                      background: '#f5f5f5', 
                      padding: '12px', 
                      borderRadius: '4px',
                      marginBottom: 8
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

  // 添加健康监测标签页组件
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
      children: (
        <div>
          <Row gutter={[24, 24]}>
            {/* 左侧病历记录 */}
            <Col span={16}>
              <Card title="病历记录" variant="borderless">
                <Timeline
                  items={[
                    {
                      children: (
                        <div style={{ marginBottom: 16 }}>
                          <Text strong>2024-03-20 入院记录</Text>
                          <div style={{ marginTop: 8 }}>
                            <Text>主诉：发热3天，呼吸困难2天</Text>
                            <div style={{ margin: '8px 0' }}>
                              <Text type="secondary">现病史：</Text>
                              <p>患者3天前无明显诱因出现发热，最高体温38.5℃，伴有咳嗽、咳痰，痰为白色粘痰。2天前出现呼吸困难，活动后明显，休息后可缓解。同时伴有乏力、食欲下降等症状。</p>
                            </div>
                            <div style={{ margin: '8px 0' }}>
                              <Text type="secondary">既往史：</Text>
                              <p>高血压病史5年，长期服用缬沙坦控制；2型糖尿病病史3年，规律服用二甲双胍治疗。</p>
                            </div>
                            <div style={{ margin: '8px 0' }}>
                              <Text type="secondary">体格检查：</Text>
                              <p>体温38.5℃，脉搏95次/分，呼吸22次/分，血压135/85mmHg，神志清楚，精神一般，双肺呼吸音粗，可闻及散在干湿性啰音。</p>
                            </div>
                          </div>
                        </div>
                      )
                    },
                    {
                      children: (
                        <div style={{ marginBottom: 16 }}>
                          <Text strong>2024-03-21 病程记录</Text>
                          <div style={{ marginTop: 8 }}>
                            <p>患者发热持续，最高体温38.3℃，呼吸困难较前加重，血氧饱和度下降至93%。完善新冠病毒核酸检测及病原学检测，影像学检查提示双肺感染性改变。</p>
                            <div style={{ margin: '8px 0' }}>
                              <Text type="secondary">治疗方案：</Text>
                              <ul style={{ marginLeft: 24 }}>
                                <li>抗病毒治疗</li>
                                <li>抗感染治疗</li>
                                <li>对症支持治疗</li>
                                <li>基础疾病用药维持</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    },
                    {
                      children: (
                        <div style={{ marginBottom: 16 }}>
                          <Text strong>2024-03-22 病程记录</Text>
                          <div style={{ marginTop: 8 }}>
                            <p>实验室检查结果回报，提示炎症指标升高，病原学检测提示新冠病毒核酸阳性。患者体温仍有波动，呼吸困难症状持续，建议继续强化治疗。</p>
                          </div>
                        </div>
                      )
                    }
                  ]}
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
                    <Tag color="blue">已匹配 3 个相似病例</Tag>
                  </Space>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }} size={16}>
                  {[
                    {
                      id: 'P003',
                      name: '王某',
                      age: 62,
                      gender: '男',
                      mainSymptoms: ['发热', '呼吸困难', '咳嗽'],
                      diagnosis: '新型冠状病毒感染',
                      comorbidities: ['高血压', '冠心病'],
                      similarity: 92,
                      outcome: '治愈出院',
                    },
                    {
                      id: 'P004',
                      name: '李某',
                      age: 58,
                      gender: '女',
                      mainSymptoms: ['发热', '乏力', '呼吸急促'],
                      diagnosis: '新型冠状病毒感染',
                      comorbidities: ['糖尿病'],
                      similarity: 88,
                      outcome: '好转出院',
                    },
                    {
                      id: 'P005',
                      name: '赵某',
                      age: 65,
                      gender: '男',
                      mainSymptoms: ['发热', '咳嗽', '胸闷'],
                      diagnosis: '新型冠状病毒感染',
                      comorbidities: ['高血压', '糖尿病'],
                      similarity: 85,
                      outcome: '治愈出院',
                    },
                  ].map(patient => (
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
                  ))}
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'monitoring',
      label: '健康监测',
      children: <MonitoringTab />,
    },
    {
      key: 'risk',
      label: '风险评估',
      children: '风险评估内容',
    },
    {
      key: 'imaging',
      label: '影像资料',
      children: '影像资料内容',
    },
    {
      key: 'lab',
      label: '检验结果',
      children: '检验结果内容',
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
    </>
  );
};

export default PatientDiagnosisPage; 