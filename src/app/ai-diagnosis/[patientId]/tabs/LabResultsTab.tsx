import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Space, 
  Tag, 
  Button, 
  List, 
  Descriptions, 
  Alert, 
  Table, 
  Divider, 
  Empty 
} from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { labData } from '@/mocks';

/**
 * 检验结果标签页组件
 * 展示患者的所有实验室检查结果
 */
const LabResultsTab: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const { Text } = Typography;
  
  // 定义检验分类
  const categories = labData.categories;
  
  // 模拟检验数据
  const labTests = labData.labTests;
  
  // 模拟检验结果数据
  const testResults = labData.testResults;

  // 根据分类获取检验列表
  const getTestsByCategory = (categoryId: string | null) => {
    if (!categoryId) return labTests;
    return labTests.filter(test => test.category === categoryId);
  };

  // 自动选择第一个检验
  useEffect(() => {
    if (labTests.length > 0 && !selectedTest) {
      setSelectedTest(labTests[0].id);
      setCurrentCategory(null);
    }
  }, []);

  // 渲染趋势指示器
  const renderTrendIndicator = (trend: string) => {
    if (trend === 'up') {
      return <span style={{ color: 'red' }}>↑</span>;
    } else if (trend === 'down') {
      return <span style={{ color: 'blue' }}>↓</span>;
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 250px)' }}>
      {/* 左侧检验列表 */}
      <div style={{ width: 300, marginRight: '16px', display: 'flex', flexDirection: 'column' }}>
        {/* 分类选择 */}
        <Card 
          style={{ marginBottom: '8px' }} 
          styles={{ body: { padding: '8px' } }}
        >
          <Space wrap>
            <Button 
              type={!currentCategory ? 'primary' : 'default'}
              onClick={() => setCurrentCategory(null)}
            >
              全部检验
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                type={currentCategory === category.id ? 'primary' : 'default'}
                onClick={() => setCurrentCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </Space>
        </Card>
        
        {/* 检验列表 */}
        <Card 
          style={{ 
            flex: 1,
            height: 0,
            overflow: 'auto'
          }}
          title={
            <Space>
              检验列表
              <Tag>{getTestsByCategory(currentCategory).length}</Tag>
            </Space>
          }
          styles={{ body: { padding: '8px' } }}
        >
          <List
            dataSource={getTestsByCategory(currentCategory)}
            renderItem={(test, index) => (
              <List.Item
                key={test.id}
                onClick={() => setSelectedTest(test.id)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedTest === test.id ? '#e6f7ff' : 'transparent',
                  padding: '12px',
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <div style={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      background: test.urgent ? '#ff4d4f' : (test.abnormal ? '#faad14' : '#52c41a'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </div>
                  }
                  title={
                    <Space>
                      {test.name}
                      {test.abnormal && <Tag color="red">异常</Tag>}
                      {test.status === 'processing' && <Tag color="processing">处理中</Tag>}
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">{categories.find(c => c.id === test.category)?.name}</Text>
                      <Text type="secondary">采样: {test.date}</Text>
                      {test.reportTime && <Text type="secondary">报告: {test.reportTime}</Text>}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* 右侧检验结果详情 */}
      <Card 
        style={{ 
          flex: 1,
          height: '100%',
          overflow: 'auto'
        }}
        styles={{
          body: { padding: '16px' }
        }}
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Space>
              检验结果详情
              {selectedTest && labTests.find(t => t.id === selectedTest)?.abnormal && 
                <Tag color="red">异常</Tag>
              }
              {selectedTest && labTests.find(t => t.id === selectedTest)?.urgent && 
                <Tag color="red">急诊</Tag>
              }
            </Space>
            {selectedTest && 
              <Button 
                type="text" 
                icon={<PrinterOutlined />} 
                size="small"
              >
                打印报告
              </Button>
            }
          </div>
        }
      >
        {selectedTest && testResults[selectedTest as keyof typeof testResults] ? (
          <>
            {/* 检验基本信息 */}
            <Descriptions size="small" bordered column={2}>
              <Descriptions.Item label="检验项目">
                {labTests.find(t => t.id === selectedTest)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="检验类别">
                {categories.find(c => c.id === labTests.find(t => t.id === selectedTest)?.category)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="采样时间">
                {testResults[selectedTest as keyof typeof testResults].samplingTime}
              </Descriptions.Item>
              <Descriptions.Item label="报告时间">
                {testResults[selectedTest as keyof typeof testResults].reportTime}
              </Descriptions.Item>
              <Descriptions.Item label="检验医师">
                {testResults[selectedTest as keyof typeof testResults].doctor}
              </Descriptions.Item>
              <Descriptions.Item label="审核医师">
                {testResults[selectedTest as keyof typeof testResults].reviewDoctor}
              </Descriptions.Item>
            </Descriptions>

            {/* 危急值提示 */}
            {testResults[selectedTest as keyof typeof testResults].criticalValues.length > 0 && (
              <Alert
                message="危急值提示"
                description={
                  <div>
                    以下检验项目达到危急值标准，已通知临床医生：
                    <ul>
                      {testResults[selectedTest as keyof typeof testResults].criticalValues.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                }
                type="error"
                showIcon
                style={{ margin: '16px 0' }}
              />
            )}

            {/* 检验项目表格 */}
            <div style={{ margin: '16px 0' }}>
              <Table
                dataSource={testResults[selectedTest as keyof typeof testResults].items.map((item, index) => ({
                  ...item,
                  key: `${selectedTest}-${index}`
                }))}
                columns={[
                  { title: '检验项目', dataIndex: 'name', key: 'name', width: '35%' },
                  { 
                    title: '结果', 
                    dataIndex: 'value', 
                    key: 'value',
                    width: '25%',
                    render: (text, record) => (
                      <span style={{ 
                        color: record.abnormal ? '#ff4d4f' : 'inherit'
                      }}>
                        {text} {renderTrendIndicator(record.trend)}
                      </span>
                    )
                  },
                  { title: '单位', dataIndex: 'unit', key: 'unit', width: '15%' },
                  { title: '参考范围', dataIndex: 'reference', key: 'reference', width: '25%' }
                ]}
                pagination={false}
                size="small"
                rowClassName={(record) => record.abnormal ? 'ant-table-row-abnormal' : ''}
              />
            </div>

            {/* 检验结论 */}
            <Divider orientation="left">检验结论</Divider>
            <Alert
              message={testResults[selectedTest as keyof typeof testResults].conclusion}
              type="info"
              showIcon
            />
          </>
        ) : (
          <Empty description="暂无检验结果" />
        )}
      </Card>
    </div>
  );
};

export default LabResultsTab; 