import React, { useState } from 'react';
import { Card, Tag, Row, Col, Typography, Timeline, Table, Space } from 'antd';
import { 
  CalendarOutlined,
  MedicineBoxTwoTone,
  HeartTwoTone,
  AlertTwoTone,
  AlertOutlined
} from '@ant-design/icons';
import { monitoringData } from '@/mocks';

const { Text } = Typography;

/**
 * 健康监测标签页组件
 * 展示患者的生命体征监测、用药记录、护理记录等数据
 */
const MonitoringTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(monitoringData.vitalSigns[0].date);

  return (
    <div>
      {/* 顶部日期选择和护理等级 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={16}>
          <Card size="small">
            <Space size={16}>
              <CalendarOutlined style={{ fontSize: 20, color: '#1890ff' }} />
              {monitoringData.vitalSigns.map(day => (
                <Tag
                  key={day.date}
                  color={selectedDate === day.date ? 'blue' : 'default'}
                  style={{ cursor: 'pointer', padding: '4px 8px' }}
                  onClick={() => setSelectedDate(day.date)}
                >
                  {day.date}
                </Tag>
              ))}
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Space>
              <MedicineBoxTwoTone twoToneColor="#52c41a" />
              <Text strong>当前护理等级：</Text>
              <Tag color="green">
                {monitoringData.nursingLevel.find(n => n.date === selectedDate)?.level}
              </Tag>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* 左侧生命体征和用药记录 */}
        <Col span={16}>
          {/* 生命体征监测 */}
          <Card
            title={
              <Space>
                <HeartTwoTone twoToneColor="#eb2f96" />
                <span>生命体征监测</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Table
              size="small"
              dataSource={monitoringData.vitalSigns
                .find(day => day.date === selectedDate)
                ?.records.map((record, index) => ({ key: index, ...record }))}
              columns={[
                { title: '时间', dataIndex: 'time', width: 100 },
                { 
                  title: '体温(℃)', 
                  dataIndex: 'temperature',
                  render: (temp) => (
                    <Text type={temp >= 38.5 ? 'danger' : temp >= 37.3 ? 'warning' : 'success'}>
                      {temp}
                    </Text>
                  )
                },
                { 
                  title: '心率(次/分)', 
                  dataIndex: 'heartRate',
                  render: (rate) => (
                    <Text type={rate >= 100 ? 'danger' : rate >= 90 ? 'warning' : 'success'}>
                      {rate}
                    </Text>
                  )
                },
                { 
                  title: '血压(mmHg)', 
                  dataIndex: 'bloodPressure',
                  render: (bp) => {
                    const [systolic] = bp.split('/').map(Number);
                    return (
                      <Text type={systolic >= 140 ? 'danger' : systolic >= 130 ? 'warning' : 'success'}>
                        {bp}
                      </Text>
                    );
                  }
                },
                { 
                  title: '呼吸(次/分)', 
                  dataIndex: 'respiratoryRate',
                  render: (rate) => (
                    <Text type={rate >= 24 ? 'danger' : rate >= 20 ? 'warning' : 'success'}>
                      {rate}
                    </Text>
                  )
                },
                { 
                  title: '血氧(%)', 
                  dataIndex: 'oxygenSaturation',
                  render: (spo2) => (
                    <Text type={spo2 <= 93 ? 'danger' : spo2 <= 95 ? 'warning' : 'success'}>
                      {spo2}
                    </Text>
                  )
                },
              ]}
              pagination={false}
            />
          </Card>

          {/* 用药记录 */}
          <Card
            title={
              <Space>
                <MedicineBoxTwoTone twoToneColor="#1890ff" />
                <span>用药记录</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Timeline
              items={monitoringData.medications
                .find(day => day.date === selectedDate)
                ?.items.map(med => ({
                  color: med.status === 'completed' ? 'green' : 'blue',
                  children: (
                    <div>
                      <Text strong>{med.name}</Text>
                      <div>
                        <Text type="secondary">用药时间：</Text>
                        {med.time.map(t => (
                          <Tag key={t} color="blue" style={{ marginRight: 4 }}>{t}</Tag>
                        ))}
                      </div>
                      {med.note && (
                        <div>
                          <Text type="secondary">备注：</Text>
                          <Text>{med.note}</Text>
                        </div>
                      )}
                    </div>
                  )
                }))}
            />
          </Card>

          {/* 护理记录 */}
          <Card
            title={
              <Space>
                <HeartTwoTone twoToneColor="#52c41a" />
                <span>护理记录</span>
              </Space>
            }
          >
            <Timeline
              items={monitoringData.nursingRecords
                .find(day => day.date === selectedDate)
                ?.records.map(record => ({
                  children: (
                    <div>
                      <Text type="secondary">{record.time}</Text>
                      <div style={{ marginTop: 4 }}>{record.content}</div>
                    </div>
                  )
                }))}
            />
          </Card>
        </Col>

        {/* 右侧健康标签和预警事件 */}
        <Col span={8}>
          {/* 健康标签 */}
          <Card
            title={
              <Space>
                <AlertTwoTone twoToneColor="#faad14" />
                <span>健康标签</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Space direction="vertical" style={{ width: '100%' }} size={16}>
              {monitoringData.healthTags.map((category, index) => (
                <div key={index}>
                  <Text type="secondary">{category.category}：</Text>
                  <div style={{ marginTop: 8 }}>
                    {category.tags.map((tag, i) => (
                      <Tag key={i} style={{ marginBottom: 8 }}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </Space>
          </Card>

          {/* 预警事件 */}
          <Card
            title={
              <Space>
                <AlertTwoTone twoToneColor="#ff4d4f" />
                <span>预警事件</span>
              </Space>
            }
          >
            <Timeline
              items={monitoringData.warningEvents
                .filter(event => event.time.startsWith(selectedDate))
                .map(event => ({
                  color: event.type === 'error' ? 'red' : 'orange',
                  dot: <AlertOutlined style={{ fontSize: '16px' }} />,
                  children: (
                    <div>
                      <Text type="secondary">{event.time.split(' ')[1]}</Text>
                      <div style={{ marginTop: 4 }}>
                        <Text type={event.type === 'error' ? 'danger' : 'warning'}>
                          {event.content}
                        </Text>
                      </div>
                    </div>
                  )
                }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MonitoringTab; 