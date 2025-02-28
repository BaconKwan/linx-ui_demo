'use client';

import { useState } from 'react';
import { Table, Input, Button, Card, Space, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  idCard: string;
  status: string;
  lastVisit: string;
  risk: 'high' | 'medium' | 'low';
}

const AIDiagnosisPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  
  // 模拟的患者数据
  const patients: Patient[] = [
    {
      id: 'P001',
      name: '张三',
      age: 45,
      gender: '男',
      idCard: '310********1234',
      status: '待诊断',
      lastVisit: '2024-03-15',
      risk: 'high',
    },
    {
      id: 'P002',
      name: '李四',
      age: 32,
      gender: '女',
      idCard: '310********5678',
      status: '已完成',
      lastVisit: '2024-03-14',
      risk: 'low',
    },
    // 添加更多模拟数据...
  ];

  const getRiskTagColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  const columns: TableProps<Patient>['columns'] = [
    {
      title: '患者ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: '最近就诊',
      dataIndex: 'lastVisit',
      key: 'lastVisit',
      width: 120,
    },
    {
      title: '风险等级',
      dataIndex: 'risk',
      key: 'risk',
      width: 100,
      render: (risk: string) => (
        <Tag color={getRiskTagColor(risk)}>
          {risk === 'high' ? '高风险' : risk === 'medium' ? '中风险' : '低风险'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<FileSearchOutlined />}
          onClick={() => router.push(`/ai-diagnosis/${record.id}`)}
        >
          诊断
        </Button>
      ),
    },
  ];

  const filteredPatients = patients.filter(patient => 
    Object.values(patient).some(value => 
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2} style={{ margin: 0 }}>AI 辅助诊断</Title>
            <Input.Search
              placeholder="搜索患者信息..."
              allowClear
              enterButton={<SearchOutlined />}
              style={{ width: 300 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          <Table
            columns={columns}
            dataSource={filteredPatients}
            rowKey="id"
            pagination={{
              total: filteredPatients.length,
              pageSize: 10,
              showTotal: (total) => `共 ${total} 条记录`,
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            scroll={{ x: 1200 }}
          />
        </Space>
      </Card>
    </div>
  );
};

export default AIDiagnosisPage; 