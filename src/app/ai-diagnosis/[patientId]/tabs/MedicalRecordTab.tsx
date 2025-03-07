import React from 'react';
import { Card, Tag, Row, Col, Typography, Timeline, Space } from 'antd';
import { BranchesOutlined } from '@ant-design/icons';
import { medicalRecordData } from '@/mocks';
import { AdmissionRecord, ProgressRecord } from '@/types/mock';

const { Text } = Typography;

/**
 * 病历记录标签页组件
 * 展示患者的入院记录、病程记录和相似病例
 */
const MedicalRecordTab: React.FC = () => {
  const { medicalRecords, similarCases } = medicalRecordData;

  const SimilarCaseCard = ({ patient }: { patient: typeof similarCases[0] }) => (
    <Card
      key={patient.id}
      size="small"
      styles={{ body: { padding: '12px' } }}
      hoverable
    >
      {/* 患者基本信息和相似度 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 8
      }}>
        <Space size={4}>
          <Text strong>{patient.name}</Text>
          <Text type="secondary">
            {patient.age}岁 {patient.gender}
          </Text>
        </Space>
        <Tag color="blue" style={{ margin: 0 }}>
          相似度: {patient.similarity}%
        </Tag>
      </div>

      {/* 主要症状 */}
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
        <Text type="secondary" style={{ flexShrink: 0, marginRight: 4 }}>主要症状：</Text>
        <div style={{ display: 'flex', gap: 4, overflow: 'hidden' }}>
          {patient.mainSymptoms.map((symptom, index) => (
            <Tag 
              key={index} 
              style={{ margin: 0 }}
            >
              {symptom}
            </Tag>
          ))}
        </div>
      </div>

      {/* 诊断和基础疾病 */}
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center' }}>
        <Text type="secondary" style={{ flexShrink: 0, marginRight: 4 }}>诊断：</Text>
        <Tag color="red" style={{ margin: 0 }}>{patient.diagnosis}</Tag>
      </div>

      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
        <Text type="secondary" style={{ flexShrink: 0, marginRight: 4 }}>基础疾病：</Text>
        <div style={{ display: 'flex', gap: 4, overflow: 'hidden' }}>
          {patient.comorbidities.map((disease, index) => (
            <Tag 
              key={index} 
              color="orange" 
              style={{ margin: 0 }}
            >
              {disease}
            </Tag>
          ))}
        </div>
      </div>

      {/* 治疗结果 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text type="secondary" style={{ flexShrink: 0, marginRight: 4 }}>治疗结果：</Text>
        <Tag color="green" style={{ margin: 0 }}>{patient.outcome}</Tag>
      </div>
    </Card>
  );

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* 左侧病历记录 */}
        <Col span={16}>
          <Card title="病历记录" variant="borderless">
            <Timeline
              items={medicalRecords.map(record => ({
                children: (
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>{record.date} {record.title}</Text>
                    <div style={{ marginTop: 8 }}>
                      {record.title === '入院记录' ? (
                        <>
                          <Text>主诉：{(record.content as AdmissionRecord).mainComplaint}</Text>
                          <div style={{ margin: '8px 0' }}>
                            <Text type="secondary">现病史：</Text>
                            <p>{(record.content as AdmissionRecord).presentIllness}</p>
                          </div>
                          <div style={{ margin: '8px 0' }}>
                            <Text type="secondary">既往史：</Text>
                            <p>{(record.content as AdmissionRecord).pastHistory}</p>
                          </div>
                          <div style={{ margin: '8px 0' }}>
                            <Text type="secondary">体格检查：</Text>
                            <p>{(record.content as AdmissionRecord).physicalExam}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>{(record.content as ProgressRecord).description}</p>
                          {(record.content as ProgressRecord).treatment && (
                            <div style={{ margin: '8px 0' }}>
                              <Text type="secondary">治疗方案：</Text>
                              <ul style={{ marginLeft: 24 }}>
                                {(record.content as ProgressRecord).treatment?.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )
              }))}
            />
          </Card>
        </Col>

        {/* 右侧相似病例 */}
        <Col span={8}>
          <Card 
            title={
              <Space>
                <BranchesOutlined />
                <span>相似病例</span>
                <Tag color="blue">已匹配 {similarCases.length} 个相似病例</Tag>
              </Space>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }} size={16}>
              {similarCases.map(patient => (
                <SimilarCaseCard key={patient.id} patient={patient} />
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MedicalRecordTab; 