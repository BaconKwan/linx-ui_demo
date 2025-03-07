import { RiskAssessmentData } from './types';

export const riskAssessmentData: RiskAssessmentData = {
  urgentRisks: [
    {
      name: '呼吸衰竭',
      level: 'critical',
      probability: '75%',
      timeWindow: '24-48小时',
      description: '基于患者目前的血氧饱和度和呼吸频率，存在发展为呼吸衰竭的高风险',
      indicators: [
        '血氧饱和度持续下降',
        '呼吸频率增快',
        '呼吸困难加重',
        '血气分析指标恶化'
      ],
      references: [
        'Blood oxygen saturation < 93%',
        'Respiratory rate > 30/min',
        'Oxygenation index < 300'
      ],
      suggestions: [
        '加强氧疗支持',
        '密切监测血氧饱和度',
        '准备无创呼吸机支持',
        '及时调整治疗方案'
      ]
    },
    {
      name: '急性呼吸窘迫综合征',
      level: 'high',
      probability: '60%',
      timeWindow: '48-72小时',
      description: '患者存在发展为ARDS的风险，需要密切监测和预防',
      indicators: [
        '氧合指数持续下降',
        '双肺浸润影扩大',
        '呼吸功能持续恶化'
      ],
      references: [
        'Berlin definition of ARDS',
        'Chest imaging deterioration',
        'Progressive hypoxemia'
      ],
      suggestions: [
        '严格限制液体入量',
        '保护性通气策略',
        '防止医源性损伤',
        '监测肺部影像变化'
      ]
    }
  ],
  potentialRisks: [
    {
      name: '血栓并发症',
      level: 'medium',
      probability: '45%',
      timeWindow: '3-7天',
      description: '由于长期卧床和炎症状态，存在发生血栓并发症的风险',
      indicators: [
        'D-二聚体升高',
        '活动受限',
        '凝血功能异常'
      ],
      references: [
        'D-dimer elevation',
        'Prolonged immobilization',
        'Hypercoagulable state'
      ],
      suggestions: [
        '预防性抗凝治疗',
        '早期活动干预',
        '弹力袜预防',
        '定期监测凝血指标'
      ]
    },
    {
      name: '继发感染',
      level: 'medium',
      probability: '40%',
      timeWindow: '5-10天',
      description: '免疫功能受损可能导致继发感染，需要预防',
      indicators: [
        '新发热峰',
        '炎症指标升高',
        '痰培养阳性'
      ],
      references: [
        'New fever spikes',
        'Elevated inflammatory markers',
        'Positive sputum culture'
      ],
      suggestions: [
        '规范使用抗生素',
        '加强气道管理',
        '注意无菌操作',
        '监测细菌培养结果'
      ]
    }
  ]
}; 