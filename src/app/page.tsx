'use client';

import { Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '48px' }}>
      <Title level={1}>欢迎使用 灵析 AI 医疗辅诊系统</Title>
      <Title level={3}>智能诊断 · 精准医疗</Title>
    </div>
  );
}
