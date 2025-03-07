import { DicomStudies } from '@/types/mock';

export const dicomStudies: DicomStudies = {
  studies: [
    {
      id: 'LUNG_CT',
      type: 'CT',
      date: '2024-03-20 14:30',
      description: '肺部CT',
      path: '/static/Lung_CT',
      report: {
        findings: [
          "双肺野内见多发斑片状、结节状高密度影，边界模糊，分布不均匀",
          "部分病灶呈磨玻璃密度改变，其中以双肺外带及胸膜下为著",
          "双肺门及纵隔内未见明显肿大淋巴结",
          "气管及主支气管通畅",
          "纵隔位置居中",
          "心影大小正常，形态规则",
          "主动脉及其分支走形正常",
          "双侧胸腔未见明显积液"
        ],
        impression: [
          "双肺多发性炎症性病变，考虑病毒性肺炎可能",
          "建议结合临床及实验室检查进一步明确诊断",
          "建议短期复查观察病灶变化"
        ],
        hasAbnormal: true
      },
      series: [
        {
          id: 'LUNG_CT_001',
          description: '肺部CT序列',
          path: '/static/Lung_CT'
        }
      ]
    },
    {
      id: 'BRAIN_CT',
      type: 'CT',
      date: '2024-03-21 15:45',
      description: '脑部CT',
      path: '/static/Brain_CT',
      report: {
        findings: [
          "脑实质密度基本正常，灰白质分界清晰",
          "脑室系统大小、形态正常，位置居中",
          "中线结构无移位",
          "脑池、脑沟系统未见异常",
          "双侧基底节区未见异常密度影",
          "颅骨完整"
        ],
        impression: [
          "未见明显异常改变",
          "建议结合临床症状进行综合评估"
        ],
        hasAbnormal: false
      },
      series: [
        {
          id: 'BRAIN_CT_001',
          description: '脑部CT序列',
          path: '/static/Brain_CT'
        }
      ]
    }
  ]
}; 