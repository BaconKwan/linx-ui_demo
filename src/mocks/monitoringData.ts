import { MonitoringData } from './types';

export const monitoringData: MonitoringData = {
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