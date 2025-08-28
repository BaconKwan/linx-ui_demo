// 患者基本信息类型
export interface PatientBasicInfo {
  name: string;
  age: number;
  gender: string;
  idCard: string;
  phone: string;
  address: string;
  bloodType: string;
  occupation: string;
}

// 疾病标签类型
export interface DiseaseLabel {
  name: string;
  severity: 'warning' | 'error';
}

// 风险评估类型
export interface RiskAssessment {
  cardiovascular: { level: string; score: number };
  diabetes: { level: string; score: number };
  complications: Array<{ name: string; risk: 'high' | 'medium' | 'low' }>;
}

// 依从性类型
export interface Compliance {
  medicationAdherence: number;
  followUpRate: number;
  dietaryCompliance: number;
  exerciseAdherence: number;
}

// 健康概况类型
export interface HealthOverview {
  height: number;
  weight: number;
  bmi: number;
  bloodPressure: string;
  bloodSugar: string;
  habits: {
    smoking: string;
    drinking: string;
    exercise: string;
  };
}

// 干预措施类型
export interface Interventions {
  admissionDate: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  respiratorySupport: string;
  treatments: string[];
}

// AI 推理步骤类型
export interface AIReasoningStep {
  timestamp: string;
  title: string;
  content: string;
  confidence: number;
  evidence: string[];
  details: string[];
}

// 生命体征类型
export interface VitalSigns {
  temperature: number;
  heartRate: number;
  bloodPressure: string;
  respiratoryRate: number;
  oxygenSaturation: number;
  consciousness: string;
}

// 影像学检查类型
export interface Imaging {
  type: string;
  date: string;
  findings: string[];
  conclusion: string;
}

// 实验室检查结果类型
export interface LabResults {
  abnormal: Array<{
    item: string;
    value: string;
    unit: string;
    reference: string;
    status: string;
  }>;
}

// 病原学检测类型
export interface PathogenTest {
  method: string;
  date: string;
  results: Array<{
    pathogen: string;
    result: string;
    method: string;
  }>;
}

// 宏基因组测序结果类型
export interface Metagenomics {
  method: string;
  date: string;
  results: Array<{
    pathogen: string;
    reads: number;
    percentage: string;
    confidence: string;
  }>;
}

// AI 诊断结果类型
export interface AIDiagnosis {
  etiology: {
    primary: string;
    secondary: string;
    evidence: string[];
  };
  severity: {
    level: string;
    score: number;
    criteria: string[];
  };
  progression: {
    trend: string;
    factors: string[];
    prediction: string;
  };
  risks: Array<{
    type: string;
    probability: string;
    timeWindow: string;
    indicators: string[];
  }>;
}

// 监测数据记录类型
export interface MonitoringRecord {
  time: string;
  temperature: number;
  heartRate: number;
  bloodPressure: string;
  respiratoryRate: number;
  oxygenSaturation: number;
}

// 护理记录类型
export interface NursingRecord {
  time: string;
  content: string;
}

// 用药记录类型
export interface MedicationRecord {
  name: string;
  time: string[];
  status: 'completed' | 'pending';
  note?: string;
}

// 健康标签类型
export interface HealthTag {
  category: string;
  tags: string[];
}

// 预警事件类型
export interface WarningEvent {
  time: string;
  type: 'warning' | 'error';
  content: string;
}

// AI 干预措施类型
export interface TreatmentGuide {
  name: string;
  references: Array<string>;
}

export interface TreatmentRecommendation {
  content: string[];
  drugs?: Array<string>;
}

export interface AITreatmentPlan {
  antiviral: {
    guide: TreatmentGuide;
    recommendations: TreatmentRecommendation;
  };
  antibiotic: {
    guide: TreatmentGuide;
    recommendations: TreatmentRecommendation;
  };
  supportive: {
    guide: TreatmentGuide;
    recommendations: TreatmentRecommendation;
  };
  management: {
    guide: TreatmentGuide;
    recommendations: TreatmentRecommendation;
  };
  monitoring: {
    guide: TreatmentGuide;
    routine: string[];
    warning: string[];
  };
}

// 完整的患者详情数据类型
export interface PatientDetail {
  basicInfo: PatientBasicInfo;
  diseaseLabels: DiseaseLabel[];
  riskAssessment: RiskAssessment;
  compliance: Compliance;
  healthOverview: HealthOverview;
  interventions: Interventions;
}

// 完整的模拟数据类型
export interface MockData {
  aiConclusion: string;
  aiReasoning: AIReasoningStep[];
  vitalSigns: VitalSigns;
  imaging: Imaging;
  labResults: LabResults;
  pathogenTest: PathogenTest;
  metagenomics: Metagenomics;
  aiDiagnosis: AIDiagnosis;
  aiTreatmentPlan: AITreatmentPlan;
  // MDT 可视化的可选覆盖数据和冲突信息
  mdtOverrides?: {
    medicalRecord?: { mainComplaint?: string; presentIllness?: string };
    imaging?: { findings?: string[]; conclusion?: string };
    lab?: { abnormal?: Array<{ item: string; value: string; unit?: string }> };
    conclusion?: string;
  };
  mdtConflicts?: Array<{
    type: string;
    info: string;
    doctors: string[];
  }>;
}

// 完整的监测数据类型
export interface MonitoringData {
  vitalSigns: Array<{
    date: string;
    records: MonitoringRecord[];
  }>;
  nursingLevel: Array<{
    date: string;
    level: string;
    reason: string;
  }>;
  medications: Array<{
    date: string;
    items: MedicationRecord[];
  }>;
  nursingRecords: Array<{
    date: string;
    records: NursingRecord[];
  }>;
  healthTags: HealthTag[];
  warningEvents: WarningEvent[];
}

// 入院记录内容类型
export interface AdmissionRecord {
  mainComplaint: string;
  presentIllness: string;
  pastHistory: string;
  physicalExam: string;
}

// 病程记录内容类型
export interface ProgressRecord {
  description: string;
  treatment?: string[];
}

// 病历记录类型
export interface MedicalRecord {
  date: string;
  title: string;
  content: AdmissionRecord | ProgressRecord;
}

// 相似病例类型
export interface SimilarCase {
  id: string;
  name: string;
  age: number;
  gender: string;
  mainSymptoms: string[];
  diagnosis: string;
  comorbidities: string[];
  similarity: number;
  outcome: string;
}

// 病历数据类型
export interface MedicalRecordData {
  medicalRecords: MedicalRecord[];
  similarCases: SimilarCase[];
}

export interface Risk {
  name: string;
  level: 'critical' | 'high' | 'medium';
  probability: string;
  timeWindow: string;
  description: string;
  indicators: string[];
  references: string[];
  suggestions: string[];
}

export interface RiskAssessmentData {
  urgentRisks: Risk[];
  potentialRisks: Risk[];
}

export interface DicomReport {
  findings: string[];
  impression: string[];
  hasAbnormal: boolean;
}

export interface DicomSeries {
  id: string;
  description: string;
  path: string;
}

export interface DicomStudy {
  id: string;
  type: string;
  date: string;
  description: string;
  path: string;
  report: DicomReport;
  series: DicomSeries[];
}

export interface DicomStudies {
  studies: DicomStudy[];
}

// 检验分类类型
export interface LabCategory {
  id: string;
  name: string;
}

// 检验项目类型
export interface LabTest {
  id: string;
  name: string;
  category: string;
  date: string;
  reportTime: string;
  status: 'completed' | 'processing';
  abnormal: boolean;
  urgent: boolean;
  doctor: string;
}

// 检验结果项目类型
export interface LabResultItem {
  name: string;
  value: string;
  unit: string;
  reference: string;
  abnormal: boolean;
  trend: 'up' | 'down' | 'normal';
}

// 检验结果类型
export interface LabResult {
  items: LabResultItem[];
  conclusion: string;
  criticalValues: string[];
  doctor: string;
  reviewDoctor: string;
  samplingTime: string;
  reportTime: string;
}

// 完整的实验室检验数据类型
export interface LabData {
  categories: LabCategory[];
  labTests: LabTest[];
  testResults: {
    [key: string]: LabResult;
  };
} 