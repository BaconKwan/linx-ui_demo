'use client';

import { Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '48px' }}>
      <Title level={1}>欢迎使用 DIXcover AI医疗辅诊系统</Title>
      <Title level={3}>智能诊断，助力医疗</Title>
    </div>
  );
}
