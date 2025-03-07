import { MedicalRecordData } from '@/types/mock';

export const medicalRecordData: MedicalRecordData = {
  medicalRecords: [
    {
      date: '2024-03-20',
      title: '入院记录',
      content: {
        mainComplaint: '发热3天，呼吸困难2天',
        presentIllness: '患者3天前无明显诱因出现发热，最高体温38.5℃，伴有咳嗽、咳痰，痰为白色粘痰。2天前出现呼吸困难，活动后明显，休息后可缓解。同时伴有乏力、食欲下降等症状。',
        pastHistory: '高血压病史5年，长期服用缬沙坦控制；2型糖尿病病史3年，规律服用二甲双胍治疗。',
        physicalExam: '体温38.5℃，脉搏95次/分，呼吸22次/分，血压135/85mmHg，神志清楚，精神一般，双肺呼吸音粗，可闻及散在干湿性啰音。'
      }
    },
    {
      date: '2024-03-21',
      title: '病程记录',
      content: {
        description: '患者发热持续，最高体温38.3℃，呼吸困难较前加重，血氧饱和度下降至93%。完善新冠病毒核酸检测及病原学检测，影像学检查提示双肺感染性改变。',
        treatment: [
          '抗病毒治疗',
          '抗感染治疗',
          '对症支持治疗',
          '基础疾病用药维持'
        ]
      }
    },
    {
      date: '2024-03-22',
      title: '病程记录',
      content: {
        description: '实验室检查结果回报，提示炎症指标升高，病原学检测提示新冠病毒核酸阳性。患者体温仍有波动，呼吸困难症状持续，建议继续强化治疗。'
      }
    }
  ],
  similarCases: [
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
    }
  ]
}; 