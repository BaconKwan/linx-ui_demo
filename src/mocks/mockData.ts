import { MockData } from '@/types/mock';

export const mockData: MockData = {
  aiConclusion: '患者为65岁男性，目前诊断为新型冠状病毒感染，疑似合并肺炎链球菌感染。主要表现为发热（38.5℃）、呼吸频率增快（22次/分）、血氧饱和度降低（93%），症状持续3天且呈进行性加重。实验室检查显示炎症指标明显升高，影像学表现为双肺多发磨玻璃密度影。病情评估为重度，存在进展为危重型的风险。基于患者年龄、基础疾病（高血压、糖尿病）、实验室指标和影像学表现，预计未来48-72小时是关键观察期。建议密切监测生命体征、血氧饱和度，警惕呼吸衰竭和血栓并发症风险，同时关注基础疾病变化。',
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
  },

  aiTreatmentPlan: {
    antiviral: {
      guide: {
        name: '抗病毒治疗',
        references: [
          '《新型冠状病毒感染诊疗方案（第十版）》',
          '《重症新型冠状病毒感染诊治指南（第四版）》'
        ]
      },
      recommendations: {
        content: [
          '建议使用小分子抗病毒药物',
          '用药时注意相互作用，特别是与降压、降糖药物的相互作用'
        ],
        drugs: ['奈玛特韦/利托那韦', '莫诺拉韦']
      }
    },
    antibiotic: {
      guide: {
        name: '抗菌治疗',
        references: [
          '《中国成人社区获得性肺炎诊断和治疗指南（2016年版）》',
          '《抗菌药物临床应用指导原则（2015年版）》'
        ]
      },
      recommendations: {
        content: [
          '考虑存在肺炎链球菌合并感染',
          '建议治疗疗程7-14天，根据临床反应调整'
        ],
        drugs: ['头孢曲松', '莫西沙星']
      }
    },
    supportive: {
      guide: {
        name: '对症支持治疗',
        references: [
          '《重症医学专家共识》',
          '《发热患者诊疗专家共识（2017版）》'
        ]
      },
      recommendations: {
        content: [
          '氧疗：建议开始低流量氧疗（2-3L/min），根据血氧饱和度调整',
          '解热：体温>38.5℃时使用对乙酰氨基酚',
          '化痰：建议使用乙酰半胱氨酸'
        ],
        drugs: ['乙酰半胱氨酸']
      }
    },
    management: {
      guide: {
        name: '基础疾病管理',
        references: [
          '《中国高血压防治指南（2018年修订版）》',
          '《中国2型糖尿病防治指南（2020年版）》'
        ]
      },
      recommendations: {
        content: [
          '高血压：继续使用缬沙坦，密切监测血压',
          '糖尿病：暂停二甲双胍，改用胰岛素控制血糖',
          '目标：血压<140/90mmHg，空腹血糖6-10mmol/L'
        ]
      }
    },
    monitoring: {
      guide: {
        name: '监测建议',
        references: [
          '《重症医学监护治疗专家共识》',
          '《急性呼吸窘迫综合征诊治指南（2019版）》'
        ]
      },
      routine: [
        '生命体征：每4小时',
        '血气分析：每日1次',
        '血常规、CRP：每48小时'
      ],
      warning: [
        '血氧饱和度 < 92%',
        '呼吸频率 > 30次/分',
        '血压 < 90/60mmHg'
      ]
    }
  }
}; 