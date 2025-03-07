import { PatientDetail } from './types';

export const patientDetail: PatientDetail = {
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