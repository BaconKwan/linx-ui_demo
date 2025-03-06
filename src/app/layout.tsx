import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import Navbar from '@/components/Navbar';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '灵析 AI - 智能医疗辅助诊断系统',
  description: '灵析 AI (LingX AI) - 基于人工智能的医疗辅助诊断系统',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider>
            <Navbar />
            <main style={{
              marginTop: 64,
              padding: '24px',
              minHeight: 'calc(100vh - 64px)',
              background: '#f0f2f5',
            }}>
              {children}
            </main>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
