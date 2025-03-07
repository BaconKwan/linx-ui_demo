import React from 'react';
import { Card, Space, Tag, Progress, Descriptions, Divider, Typography } from 'antd';
import { 
  UserOutlined, 
  HeartOutlined, 
  AlertOutlined, 
  CheckCircleOutlined, 
  MedicineBoxOutlined, 
  ScheduleOutlined 
} from '@ant-design/icons';

// 从 mocks/types.ts 导入类型定义
import { 
  PatientBasicInfo, 
  DiseaseLabel, 
  RiskAssessment, 
  Compliance, 
  HealthOverview, 
  Interventions 
} from '../types/mock';

const { Text } = Typography;

// 定义组件的Props类型
export interface PatientInfoSidebarProps {
  basicInfo: PatientBasicInfo;
  diseaseLabels: DiseaseLabel[];
  riskAssessment: RiskAssessment;
  compliance: Compliance;
  healthOverview: HealthOverview;
  interventions: Interventions;
}

/**
 * 患者信息侧边栏组件
 * 显示患者的基本信息、疾病标签、风险评估、依从性等信息
 */
const PatientInfoSidebar: React.FC<PatientInfoSidebarProps> = ({
  basicInfo,
  diseaseLabels,
  riskAssessment,
  compliance,
  healthOverview,
  interventions,
}) => {
  return (
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
          <Descriptions.Item label="姓名">{basicInfo.name}</Descriptions.Item>
          <Descriptions.Item label="年龄">{basicInfo.age}岁</Descriptions.Item>
          <Descriptions.Item label="性别">{basicInfo.gender}</Descriptions.Item>
          <Descriptions.Item label="血型">{basicInfo.bloodType}</Descriptions.Item>
          <Descriptions.Item label="职业">{basicInfo.occupation}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 疾病标签 */}
      <Card 
        title={<><HeartOutlined /> 疾病标签</>}
        size="small"
        style={{ marginBottom: '16px' }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {diseaseLabels.map((disease, index) => (
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
          <Progress percent={riskAssessment.cardiovascular.score} status="exception" />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <div>糖尿病风险</div>
          <Progress percent={riskAssessment.diabetes.score} status="normal" strokeColor="#faad14" />
        </div>
        <Divider style={{ margin: '8px 0' }}>并发症风险</Divider>
        {riskAssessment.complications.map((comp, index) => (
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
            <Text type={compliance.medicationAdherence >= 85 ? 'success' : 
                    compliance.medicationAdherence >= 70 ? 'warning' : 'danger'}>
              {compliance.medicationAdherence >= 85 ? '优' :
               compliance.medicationAdherence >= 70 ? '良' :
               compliance.medicationAdherence >= 60 ? '中' : '差'}
            </Text>
          </div>
          <Progress percent={compliance.medicationAdherence} showInfo={false} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>随访依从性</span>
            <Text type={compliance.followUpRate >= 85 ? 'success' : 
                    compliance.followUpRate >= 70 ? 'warning' : 'danger'}>
              {compliance.followUpRate >= 85 ? '优' :
               compliance.followUpRate >= 70 ? '良' :
               compliance.followUpRate >= 60 ? '中' : '差'}
            </Text>
          </div>
          <Progress percent={compliance.followUpRate} showInfo={false} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>饮食依从性</span>
            <Text type={compliance.dietaryCompliance >= 85 ? 'success' : 
                    compliance.dietaryCompliance >= 70 ? 'warning' : 'danger'}>
              {compliance.dietaryCompliance >= 85 ? '优' :
               compliance.dietaryCompliance >= 70 ? '良' :
               compliance.dietaryCompliance >= 60 ? '中' : '差'}
            </Text>
          </div>
          <Progress percent={compliance.dietaryCompliance} status="normal" strokeColor="#faad14" showInfo={false} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>运动依从性</span>
            <Text type={compliance.exerciseAdherence >= 85 ? 'success' : 
                    compliance.exerciseAdherence >= 70 ? 'warning' : 'danger'}>
              {compliance.exerciseAdherence >= 85 ? '优' :
               compliance.exerciseAdherence >= 70 ? '良' :
               compliance.exerciseAdherence >= 60 ? '中' : '差'}
            </Text>
          </div>
          <Progress percent={compliance.exerciseAdherence} status="normal" strokeColor="#faad14" showInfo={false} />
        </div>
      </Card>

      {/* 健康概况 */}
      <Card 
        title={<><MedicineBoxOutlined /> 健康概况</>}
        size="small"
        style={{ marginBottom: '16px' }}
      >
        <Descriptions column={1} size="small">
          <Descriptions.Item label="身高">{healthOverview.height} cm</Descriptions.Item>
          <Descriptions.Item label="体重">{healthOverview.weight} kg</Descriptions.Item>
          <Descriptions.Item label="BMI">{healthOverview.bmi}</Descriptions.Item>
          <Descriptions.Item label="血压">{healthOverview.bloodPressure}</Descriptions.Item>
          <Descriptions.Item label="血糖">{healthOverview.bloodSugar}</Descriptions.Item>
          <Descriptions.Item label="吸烟">{healthOverview.habits.smoking}</Descriptions.Item>
          <Descriptions.Item label="饮酒">{healthOverview.habits.drinking}</Descriptions.Item>
          <Descriptions.Item label="运动">{healthOverview.habits.exercise}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 干预概况 */}
      <Card 
        title={<><ScheduleOutlined /> 干预概况</>}
        size="small"
      >
        <Descriptions column={1} size="small">
          <Descriptions.Item label="入院日期">{interventions.admissionDate}</Descriptions.Item>
          <Descriptions.Item label="呼吸支持">{interventions.respiratorySupport}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ margin: '8px 0' }}>当前用药</Divider>
        {interventions.medications.map((med, index) => (
          <div key={index} style={{ marginBottom: '8px' }}>
            <Tag color="blue">{med.name}</Tag>
            <span style={{ fontSize: '12px' }}>{med.dosage} {med.frequency}</span>
          </div>
        ))}
        <Divider style={{ margin: '8px 0' }}>治疗方案</Divider>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {interventions.treatments.map((treatment, index) => (
            <Tag key={index} color="cyan">{treatment}</Tag>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PatientInfoSidebar; 