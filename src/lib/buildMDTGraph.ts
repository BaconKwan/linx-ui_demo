import { AgentEdgeData, AgentNodeData } from '@/types/mdt';

export interface MDTGraph {
  nodes: AgentNodeData[];
  edges: AgentEdgeData[];
}

/**
 * Build MDT graph data from existing mockData structure.
 * This is a first version mapper based on current mocks; can be iterated.
 */
export function buildMDTGraph(mockData: any): MDTGraph {
  const nodes: AgentNodeData[] = [];
  const edges: AgentEdgeData[] = [];

  // Source node: Patient data with overrides
  const overrides = mockData?.mdtOverrides || {};
  const availableData: string[] = [];
  if (mockData?.aiConclusion || overrides?.medicalRecord) availableData.push('电子病历');
  if (mockData?.vitalSigns) availableData.push('体征数据');
  if (mockData?.labResults || overrides?.lab) availableData.push('实验室检查');
  if (mockData?.imaging || overrides?.imaging) availableData.push('影像学检查');
  if (mockData?.pathogenTest || mockData?.metagenomics) availableData.push('病原学检测');

  nodes.push({
    id: 'patient',
    label: '病人数据',
    layer: 1,
    agentType: 'patient',
    summary: `可用：${availableData.join('、')}`,
    details: {
      output: availableData.map((d) => `已提供：${d}`)
    },
    status: 'success'
  });

  // Layer 1: Medical-technical agents
  nodes.push(
    {
      id: 'mh',
      label: '病历汇总Agent',
      layer: 1,
      agentType: 'medical_history_summarizer',
      summary: '负责分析患者病历信息，提取关键症状和病史要点，为后续诊断提供基础数据支持。',
      details: {
        evidence: [
          overrides?.medicalRecord?.mainComplaint || mockData?.medicalRecord?.mainComplaint || '发热3天，呼吸困难2天',
          overrides?.medicalRecord?.presentIllness || mockData?.medicalRecord?.presentIllness || '症状逐渐加重，血氧下降'
        ],
        output: [
          '从主诉与现病史中提取：发热（38.5℃）、气促（22次/分）、血氧下降（93%），症状呈进行性加重，提示以感染性病变为主的急性进展。'
        ]
      },
      status: 'success'
    },
    {
      id: 'lab',
      label: '实验室检查Agent',
      layer: 1,
      agentType: 'lab_analyzer',
      summary: '负责分析实验室检查结果，评估炎症指标和凝血功能，为感染诊断提供客观依据。',
      details: {
        evidence: ((overrides?.lab?.abnormal || mockData?.labResults?.abnormal) || []).map((i: any) => `${i.item} ${i.value}${i.unit || ''}`),
        output: [
          'WBC、CRP、PCT升高提示炎症/可能细菌合并；D-二聚体升高提示凝血激活与血栓风险，需要联合临床评估严重度与抗凝策略。'
        ]
      },
      status: 'warning'
    },
    {
      id: 'pathogen',
      label: '病原学Agent',
      layer: 1,
      agentType: 'pathogen_analyzer',
      summary: '负责分析病原学检测结果，识别感染病原体类型，为抗感染治疗提供精准指导。',
      details: {
        evidence: (mockData?.metagenomics?.results || []).map((r: any) => `${r.pathogen} ${r.reads} reads (${r.percentage})`),
        output: [
          'PCR阳性与宏基因组高丰度新冠reads相互印证，确证新冠感染；同时检出链球菌低丰度，考虑继发细菌可能，但需结合临床与影像评估。'
        ]
      },
      status: 'success'
    },
    {
      id: 'img',
      label: '影像学Agent',
      layer: 1,
      agentType: 'imaging_analyzer',
      summary: '负责分析影像学检查结果，评估肺部病变范围和严重程度，为病情判断提供影像依据。',
      details: {
        evidence: (overrides?.imaging?.findings || mockData?.imaging?.findings) || [],
        output: [
          (overrides?.imaging?.conclusion || '双肺多发磨玻璃影、周围分布、无明显积液，符合病毒性肺炎影像学模式；结合病原学和实验室异常进一步支持感染性病变假设。')
        ]
      },
      status: 'warning'
    }
  );

  // Layer 2: Specialty agents
  nodes.push(
    {
      id: 'resp',
      label: '呼吸科Agent',
      layer: 2,
      agentType: 'respiratory_specialist',
      summary: '负责呼吸系统疾病的专业诊断，结合临床症状和检查结果，制定呼吸系统治疗方案。',
      details: {
        thinking: [
          '综合病原学（PCR+宏基因组）、影像学（磨玻璃影）、实验室（炎症指标）',
          '判断病变性质与病原倾向，评估是否存在细菌合并感染'
        ],
        output: [
          '倾向病毒性肺炎，存在链球菌低水平信号，建议首选抗病毒治疗并根据临床反应与培养结果考虑覆盖典型细菌的经验性抗菌方案。'
        ]
      },
      status: 'success'
    },
    {
      id: 'icu',
      label: '重症医学Agent',
      layer: 2,
      agentType: 'icu_specialist',
      summary: '负责重症患者的综合评估，监测生命体征和器官功能，制定重症监护和治疗策略。',
      details: {
        thinking: ['基于第一层摘要与生命体征，评估病情分级与器官支持需求'],
        output: [
          '当前严重度为重度，建议低流量氧疗并严密监测血氧、呼吸频率及血流动力学指标；根据D-二聚体水平与风险评估，考虑个体化抗凝策略。'
        ]
      },
      status: 'warning'
    },
    {
      id: 'onc',
      label: '肿瘤科Agent',
      layer: 2,
      agentType: 'oncology_specialist',
      summary: '由于患者无肿瘤相关病史和症状，本次会诊不参与肿瘤学评估。',
      details: { output: ['不参与本次会诊推理'] },
      status: 'default'
    },
    {
      id: 'ped',
      label: '儿科Agent',
      layer: 2,
      agentType: 'pediatrics_specialist',
      summary: '由于患者为成人，本次会诊不涉及儿科专业评估。',
      details: { output: ['不参与本次会诊推理'] },
      status: 'default'
    }
  );

  // Layer 3: Conflicts from overrides
  if (Array.isArray(mockData?.mdtConflicts)) {
    mockData.mdtConflicts.forEach((c: any, idx: number) => {
      const conflictId = `conflict_${idx + 1}`;
      nodes.push({
        id: conflictId,
        label: `${c.type}`,
        layer: 3,
        agentType: 'conflict',
        summary: '呼吸科与重症科在细菌合并感染评估上存在分歧，需要进一步讨论达成共识。',
        details: {
          thinking: [c.info],
          output: ['已记录冲突，交由主席组织讨论并促成共识']
        },
        status: 'warning'
      });
      
      // Connect doctors to conflict
      (c.doctors || []).forEach((doc: string, i: number) => {
        const doctorNodeId =
          doc.includes('呼吸') ? 'resp' : doc.includes('重症') ? 'icu' : doc.includes('肿瘤') ? 'onc' : doc.includes('儿科') ? 'ped' : '';
        if (doctorNodeId) {
          edges.push({ id: `${doctorNodeId}-${conflictId}-${i}`, source: doctorNodeId, target: conflictId, label: '冲突提出' });
        }
      });
      
      // Connect conflict to supervisor
      edges.push({ id: `${conflictId}-sup`, source: conflictId, target: 'sup', label: '冲突协调' });
    });
  }

  // Layer 4: Supervisor moved to last layer
  nodes.push({
    id: 'sup',
    label: '主席Agent',
    layer: 4,
    agentType: 'supervisor',
    summary: '作为会诊主席，综合各专科意见，协调分歧，形成最终诊断结论和治疗建议。',
    details: {
      thinking: [
        '汇总专科意见，定位分歧点（是否细菌合并、抗凝策略等）',
        '组织目标化讨论，基于证据与风险收益达成共识'
      ],
      output: [
        `综合判断为${mockData?.aiDiagnosis?.etiology?.primary || '—'}${mockData?.aiDiagnosis?.etiology?.secondary ? '（可能合并' + mockData.aiDiagnosis.etiology.secondary + '）' : ''}，严重度评估为${mockData?.aiDiagnosis?.severity?.level || '—'}；拟采取以抗病毒为主、根据临床与培养结果决定抗菌覆盖的策略，并在${(mockData?.aiTreatmentPlan?.monitoring?.routine || []).join('、') || '规范化监测'}框架下强化血氧与凝血风险监测，必要时个体化器官支持与抗凝管理。`
      ]
    },
    status: 'success'
  });

  // Edges (top-to-bottom)
  const firstLayer = ['mh', 'lab', 'pathogen', 'img'];
  
  // patient -> first layer
  firstLayer.forEach((id) => {
    edges.push({ id: `patient-${id}`, source: 'patient', target: id, label: '原始数据' });
  });
  
  // first layer -> specialists
  firstLayer.forEach((id) => {
    ['resp', 'icu'].forEach((specialistId) => {
      edges.push({ id: `${id}-${specialistId}`, source: id, target: specialistId, label: '摘要' });
    });
  });

  // patient -> specialists for original context
  ['resp', 'icu'].forEach((id) => {
    edges.push({ id: `patient-${id}-context`, source: 'patient', target: id, label: '原始数据' });
  });

  // specialists -> supervisor
  ['resp', 'icu'].forEach((id) => {
    edges.push({ id: `${id}-sup`, source: id, target: 'sup', label: '会诊输出' });
  });

  return { nodes, edges };
}


