import { LabData } from './types';

export const labData: LabData = {
  categories: [
    { id: 'routine', name: '常规检验' },
    { id: 'biochemistry', name: '生化检验' },
    { id: 'microbiology', name: '微生物检验' },
    { id: 'molecular', name: '分子诊断' },
    { id: 'immunology', name: '免疫学检验' },
  ],
  
  labTests: [
    {
      id: 'CBC001',
      name: '血常规 (CBC)',
      category: 'routine',
      date: '2024-03-18 08:15',
      reportTime: '2024-03-18 10:30',
      status: 'completed',
      abnormal: true,
      urgent: true,
      doctor: '李医生'
    },
    {
      id: 'BMP001',
      name: '血液生化全套',
      category: 'biochemistry',
      date: '2024-03-18 08:15',
      reportTime: '2024-03-18 11:45',
      status: 'completed',
      abnormal: true,
      urgent: false,
      doctor: '王医生'
    },
    {
      id: 'BCP001',
      name: '血培养',
      category: 'microbiology',
      date: '2024-03-18 08:30',
      reportTime: '2024-03-20 14:20',
      status: 'completed',
      abnormal: true,
      urgent: true,
      doctor: '张医生'
    },
    {
      id: 'ABG001',
      name: '血气分析',
      category: 'routine',
      date: '2024-03-18 09:45',
      reportTime: '2024-03-18 10:15',
      status: 'completed',
      abnormal: true,
      urgent: true,
      doctor: '李医生'
    },
    {
      id: 'LFT001',
      name: '肝功能检测',
      category: 'biochemistry',
      date: '2024-03-18 08:15',
      reportTime: '2024-03-18 11:45',
      status: 'completed',
      abnormal: false,
      urgent: false,
      doctor: '王医生'
    },
    {
      id: 'KFT001',
      name: '肾功能检测',
      category: 'biochemistry',
      date: '2024-03-18 08:15',
      reportTime: '2024-03-18 11:45',
      status: 'completed',
      abnormal: false,
      urgent: false,
      doctor: '王医生'
    },
    {
      id: 'PCR001',
      name: '病原体核酸检测',
      category: 'molecular',
      date: '2024-03-17 16:20',
      reportTime: '2024-03-18 09:30',
      status: 'completed',
      abnormal: false,
      urgent: true,
      doctor: '赵医生'
    },
    {
      id: 'MGS001',
      name: '病原宏基因组检测',
      category: 'molecular',
      date: '2024-03-17 16:20',
      reportTime: '2024-03-18 15:30',
      status: 'completed',
      abnormal: true,
      urgent: true,
      doctor: '赵医生'
    },
    {
      id: 'CRP001',
      name: 'C反应蛋白',
      category: 'immunology',
      date: '2024-03-18 08:15',
      reportTime: '2024-03-18 10:45',
      status: 'completed',
      abnormal: true,
      urgent: false,
      doctor: '王医生'
    },
    {
      id: 'PCT001',
      name: '降钙素原',
      category: 'immunology',
      date: '2024-03-18 08:15',
      reportTime: '2024-03-18 10:45',
      status: 'completed',
      abnormal: true,
      urgent: false,
      doctor: '王医生'
    }
  ],

  testResults: {
    'CBC001': {
      items: [
        { name: '白细胞计数 (WBC)', value: '15.6', unit: '×10⁹/L', reference: '4.0-10.0', abnormal: true, trend: 'up' },
        { name: '中性粒细胞比例 (NEU%)', value: '85.2', unit: '%', reference: '50-70', abnormal: true, trend: 'up' },
        { name: '淋巴细胞比例 (LYM%)', value: '10.5', unit: '%', reference: '20-40', abnormal: true, trend: 'down' },
        { name: '单核细胞比例 (MONO%)', value: '5.2', unit: '%', reference: '3-8', abnormal: false, trend: 'normal' },
        { name: '嗜酸性粒细胞比例 (EOS%)', value: '0.8', unit: '%', reference: '0.5-5', abnormal: false, trend: 'normal' },
        { name: '红细胞计数 (RBC)', value: '4.78', unit: '×10¹²/L', reference: '4.0-5.5', abnormal: false, trend: 'normal' },
        { name: '血红蛋白 (HGB)', value: '135', unit: 'g/L', reference: '130-175', abnormal: false, trend: 'normal' },
        { name: '红细胞压积 (HCT)', value: '0.42', unit: 'L/L', reference: '0.4-0.5', abnormal: false, trend: 'normal' },
        { name: '平均红细胞体积 (MCV)', value: '88', unit: 'fL', reference: '80-100', abnormal: false, trend: 'normal' },
        { name: '平均红细胞血红蛋白含量 (MCH)', value: '28.2', unit: 'pg', reference: '27-34', abnormal: false, trend: 'normal' },
        { name: '平均红细胞血红蛋白浓度 (MCHC)', value: '321', unit: 'g/L', reference: '320-360', abnormal: false, trend: 'normal' },
        { name: '血小板计数 (PLT)', value: '223', unit: '×10⁹/L', reference: '100-300', abnormal: false, trend: 'normal' }
      ],
      conclusion: '白细胞及中性粒细胞比例升高，淋巴细胞比例下降，符合细菌感染表现。',
      criticalValues: ['白细胞计数 (WBC)'],
      doctor: '李医生',
      reviewDoctor: '陈主任',
      samplingTime: '2024-03-18 08:15',
      reportTime: '2024-03-18 10:30'
    },
    'BMP001': {
      items: [
        { name: '钠 (Na+)', value: '138', unit: 'mmol/L', reference: '135-145', abnormal: false, trend: 'normal' },
        { name: '钾 (K+)', value: '3.6', unit: 'mmol/L', reference: '3.5-5.5', abnormal: false, trend: 'normal' },
        { name: '氯 (Cl-)', value: '102', unit: 'mmol/L', reference: '96-106', abnormal: false, trend: 'normal' },
        { name: '碳酸氢盐 (HCO3-)', value: '22', unit: 'mmol/L', reference: '22-29', abnormal: false, trend: 'normal' },
        { name: '葡萄糖 (GLU)', value: '8.5', unit: 'mmol/L', reference: '3.9-6.1', abnormal: true, trend: 'up' },
        { name: '尿素氮 (BUN)', value: '7.5', unit: 'mmol/L', reference: '3.2-7.1', abnormal: true, trend: 'up' },
        { name: '肌酐 (Cr)', value: '98', unit: 'μmol/L', reference: '57-97', abnormal: true, trend: 'up' },
        { name: '尿酸 (UA)', value: '358', unit: 'μmol/L', reference: '208-428', abnormal: false, trend: 'normal' },
        { name: '总蛋白 (TP)', value: '68', unit: 'g/L', reference: '60-80', abnormal: false, trend: 'normal' },
        { name: '白蛋白 (ALB)', value: '38', unit: 'g/L', reference: '35-55', abnormal: false, trend: 'normal' },
        { name: '总胆红素 (TBIL)', value: '15.2', unit: 'μmol/L', reference: '5.1-17.0', abnormal: false, trend: 'normal' },
        { name: '钙 (Ca)', value: '2.25', unit: 'mmol/L', reference: '2.0-2.6', abnormal: false, trend: 'normal' },
        { name: '磷 (P)', value: '1.12', unit: 'mmol/L', reference: '0.81-1.45', abnormal: false, trend: 'normal' },
        { name: '镁 (Mg)', value: '0.88', unit: 'mmol/L', reference: '0.66-1.07', abnormal: false, trend: 'normal' }
      ],
      conclusion: '血糖、尿素氮和肌酐轻度升高，建议监测肾功能，并控制血糖。',
      criticalValues: [],
      doctor: '王医生',
      reviewDoctor: '刘主任',
      samplingTime: '2024-03-18 08:15',
      reportTime: '2024-03-18 11:45'
    },
    'BCP001': {
      items: [
        { name: '血培养结果', value: '阳性', unit: '', reference: '阴性', abnormal: true, trend: 'up' },
        { name: '分离菌种', value: '肺炎链球菌', unit: '', reference: '', abnormal: true, trend: 'up' },
        { name: '药敏结果 - 青霉素', value: '敏感 (S)', unit: '', reference: '', abnormal: false, trend: 'normal' },
        { name: '药敏结果 - 阿莫西林', value: '敏感 (S)', unit: '', reference: '', abnormal: false, trend: 'normal' },
        { name: '药敏结果 - 头孢曲松', value: '敏感 (S)', unit: '', reference: '', abnormal: false, trend: 'normal' },
        { name: '药敏结果 - 红霉素', value: '耐药 (R)', unit: '', reference: '', abnormal: true, trend: 'up' },
        { name: '药敏结果 - 克林霉素', value: '耐药 (R)', unit: '', reference: '', abnormal: true, trend: 'up' },
        { name: '药敏结果 - 左氧氟沙星', value: '敏感 (S)', unit: '', reference: '', abnormal: false, trend: 'normal' },
        { name: '药敏结果 - 万古霉素', value: '敏感 (S)', unit: '', reference: '', abnormal: false, trend: 'normal' }
      ],
      conclusion: '血培养分离出肺炎链球菌，对青霉素类和头孢菌素类抗生素敏感，对大环内酯类抗生素耐药。建议使用青霉素或头孢曲松治疗。',
      criticalValues: ['血培养结果'],
      doctor: '张医生',
      reviewDoctor: '吴主任',
      samplingTime: '2024-03-18 08:30',
      reportTime: '2024-03-20 14:20'
    },
    'ABG001': {
      items: [
        { name: 'pH值', value: '7.35', unit: '', reference: '7.35-7.45', abnormal: false, trend: 'normal' },
        { name: 'PaO2', value: '75', unit: 'mmHg', reference: '80-100', abnormal: true, trend: 'down' },
        { name: 'PaCO2', value: '42', unit: 'mmHg', reference: '35-45', abnormal: false, trend: 'normal' },
        { name: 'HCO3-', value: '24', unit: 'mmol/L', reference: '22-26', abnormal: false, trend: 'normal' },
        { name: 'BE', value: '-1.5', unit: 'mmol/L', reference: '-3.0-3.0', abnormal: false, trend: 'normal' },
        { name: 'SaO2', value: '92', unit: '%', reference: '95-100', abnormal: true, trend: 'down' },
        { name: '乳酸', value: '1.8', unit: 'mmol/L', reference: '0.5-2.2', abnormal: false, trend: 'normal' }
      ],
      conclusion: '轻度低氧血症，氧合功能轻度下降，无酸碱平衡紊乱。',
      criticalValues: ['PaO2', 'SaO2'],
      doctor: '李医生',
      reviewDoctor: '陈主任',
      samplingTime: '2024-03-18 09:45',
      reportTime: '2024-03-18 10:15'
    },
    'PCR001': {
      items: [
        { name: '新冠病毒 (SARS-CoV-2) 核酸', value: '阴性', unit: '', reference: '阴性', abnormal: false, trend: 'normal' },
        { name: '流感病毒A型 核酸', value: '阴性', unit: '', reference: '阴性', abnormal: false, trend: 'normal' },
        { name: '流感病毒B型 核酸', value: '阴性', unit: '', reference: '阴性', abnormal: false, trend: 'normal' },
        { name: '呼吸道合胞病毒 (RSV) 核酸', value: '阴性', unit: '', reference: '阴性', abnormal: false, trend: 'normal' },
        { name: '腺病毒 核酸', value: '阴性', unit: '', reference: '阴性', abnormal: false, trend: 'normal' },
        { name: '肺炎支原体 核酸', value: '阴性', unit: '', reference: '阴性', abnormal: false, trend: 'normal' }
      ],
      conclusion: '未检测到常见呼吸道病原体核酸。',
      criticalValues: [],
      doctor: '赵医生',
      reviewDoctor: '杨主任',
      samplingTime: '2024-03-17 16:20',
      reportTime: '2024-03-18 09:30'
    },
    'LFT001': {
      items: [
        { name: '总蛋白 (TP)', value: '68', unit: 'g/L', reference: '60-80', abnormal: false, trend: 'normal' },
        { name: '白蛋白 (ALB)', value: '38', unit: 'g/L', reference: '35-55', abnormal: false, trend: 'normal' },
        { name: '球蛋白 (GLB)', value: '30', unit: 'g/L', reference: '20-35', abnormal: false, trend: 'normal' },
        { name: '白蛋白/球蛋白比值 (A/G)', value: '1.27', unit: '', reference: '1.2-2.4', abnormal: false, trend: 'normal' },
        { name: '总胆红素 (TBIL)', value: '15.2', unit: 'μmol/L', reference: '5.1-17.0', abnormal: false, trend: 'normal' },
        { name: '直接胆红素 (DBIL)', value: '3.5', unit: 'μmol/L', reference: '0-6.8', abnormal: false, trend: 'normal' },
        { name: '间接胆红素 (IBIL)', value: '11.7', unit: 'μmol/L', reference: '5.1-12.0', abnormal: false, trend: 'normal' },
        { name: '谷丙转氨酶 (ALT)', value: '25', unit: 'U/L', reference: '0-40', abnormal: false, trend: 'normal' },
        { name: '谷草转氨酶 (AST)', value: '28', unit: 'U/L', reference: '0-40', abnormal: false, trend: 'normal' },
        { name: '碱性磷酸酶 (ALP)', value: '78', unit: 'U/L', reference: '40-150', abnormal: false, trend: 'normal' },
        { name: 'γ-谷氨酰转肽酶 (GGT)', value: '32', unit: 'U/L', reference: '0-50', abnormal: false, trend: 'normal' }
      ],
      conclusion: '肝功能指标均在正常范围内，未见异常。',
      criticalValues: [],
      doctor: '王医生',
      reviewDoctor: '刘主任',
      samplingTime: '2024-03-18 08:15',
      reportTime: '2024-03-18 11:45'
    },
    'KFT001': {
      items: [
        { name: '尿素氮 (BUN)', value: '7.5', unit: 'mmol/L', reference: '3.2-7.1', abnormal: true, trend: 'up' },
        { name: '肌酐 (Cr)', value: '98', unit: 'μmol/L', reference: '57-97', abnormal: true, trend: 'up' },
        { name: '尿酸 (UA)', value: '358', unit: 'μmol/L', reference: '208-428', abnormal: false, trend: 'normal' },
        { name: '胱抑素C (Cys-C)', value: '1.2', unit: 'mg/L', reference: '0.51-1.09', abnormal: true, trend: 'up' },
        { name: '估算肾小球滤过率 (eGFR)', value: '75', unit: 'mL/min/1.73m²', reference: '>90', abnormal: true, trend: 'down' }
      ],
      conclusion: '肾功能指标轻度异常，尿素氮和肌酐轻度升高，eGFR轻度下降，提示轻度肾功能损伤。',
      criticalValues: [],
      doctor: '王医生',
      reviewDoctor: '刘主任',
      samplingTime: '2024-03-18 08:15',
      reportTime: '2024-03-18 11:45'
    },
    'CRP001': {
      items: [
        { name: 'C反应蛋白 (CRP)', value: '85', unit: 'mg/L', reference: '0-8', abnormal: true, trend: 'up' }
      ],
      conclusion: 'C反应蛋白显著升高，提示机体存在明显炎症反应。',
      criticalValues: ['C反应蛋白 (CRP)'],
      doctor: '王医生',
      reviewDoctor: '刘主任',
      samplingTime: '2024-03-18 08:15',
      reportTime: '2024-03-18 10:45'
    },
    'PCT001': {
      items: [
        { name: '降钙素原 (PCT)', value: '2.3', unit: 'ng/mL', reference: '<0.5', abnormal: true, trend: 'up' }
      ],
      conclusion: '降钙素原显著升高，高度提示细菌感染，特别是系统性感染。',
      criticalValues: ['降钙素原 (PCT)'],
      doctor: '王医生',
      reviewDoctor: '刘主任',
      samplingTime: '2024-03-18 08:15',
      reportTime: '2024-03-18 10:45'
    },
    'MGS001': {
      items: [
        { 
          name: '总序列数据量', 
          value: '12.5', 
          unit: 'M reads', 
          reference: '>10M', 
          abnormal: false, 
          trend: 'normal' 
        },
        { 
          name: '病毒 - 新型冠状病毒', 
          value: '15,680', 
          unit: 'reads', 
          reference: '<100', 
          abnormal: true, 
          trend: 'up' 
        },
        { 
          name: '细菌 - 肺炎链球菌', 
          value: '420', 
          unit: 'reads', 
          reference: '<100', 
          abnormal: true, 
          trend: 'up' 
        },
        { 
          name: '细菌 - 流感嗜血杆菌', 
          value: '285', 
          unit: 'reads', 
          reference: '<100', 
          abnormal: true, 
          trend: 'up' 
        },
        { 
          name: '细菌 - 肺炎克雷伯菌', 
          value: '156', 
          unit: 'reads', 
          reference: '<100', 
          abnormal: true, 
          trend: 'up' 
        },
        { 
          name: '耐药基因 - β内酰胺类', 
          value: '检出 (168 reads)', 
          unit: '', 
          reference: '<50 reads', 
          abnormal: true, 
          trend: 'up' 
        },
        { 
          name: '耐药基因 - 大环内酯类', 
          value: '检出 (142 reads)', 
          unit: '', 
          reference: '<50 reads', 
          abnormal: true, 
          trend: 'up' 
        },
        { 
          name: '耐药基因 - 氨基糖苷类', 
          value: '35 reads', 
          unit: '', 
          reference: '<50 reads', 
          abnormal: false, 
          trend: 'normal' 
        },
        { 
          name: '其他病毒序列', 
          value: '未检出', 
          unit: '', 
          reference: '<100 reads', 
          abnormal: false, 
          trend: 'normal' 
        },
        { 
          name: '真菌序列', 
          value: '45', 
          unit: 'reads', 
          reference: '<100', 
          abnormal: false, 
          trend: 'normal' 
        }
      ],
      conclusion: '检出新型冠状病毒（15,680 reads）提示存在活动性感染，同时检出多种致病菌，包括肺炎链球菌（420 reads）、流感嗜血杆菌（285 reads）和肺炎克雷伯菌（156 reads），提示存在细菌合并感染。检出β内酰胺类和大环内酯类耐药基因，提示可能存在相关抗生素耐药性。建议根据耐药基因检测结果，调整抗生素使用方案，并进行抗病毒治疗。',
      criticalValues: ['病毒 - 新型冠状病毒', '细菌 - 肺炎链球菌', '耐药基因 - β内酰胺类'],
      doctor: '赵医生',
      reviewDoctor: '杨主任',
      samplingTime: '2024-03-17 16:20',
      reportTime: '2024-03-18 15:30'
    }
  }
}; 