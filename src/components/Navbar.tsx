'use client';

import { Layout, Menu, Button, Space, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const { Header } = Layout;

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: '/', label: '首页' },
    { key: '/patients', label: '病患档案' },
    { key: '/medical-data', label: '诊疗数据' },
    { key: '/ai-diagnosis', label: 'AI诊断' },
    { key: '/follow-up', label: '预后跟踪' },
    { key: '/settings', label: '系统设置' },
  ];

  // 处理用户菜单点击
  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        router.push('/profile');
        break;
      case 'settings':
        router.push('/user-settings');
        break;
      case 'logout':
        message.success('已退出登录');
        // TODO: 实现实际的登出逻辑
        router.push('/login');
        break;
    }
  };

  // 用户下拉菜单项
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: '我的信息',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      background: '#003366', 
      padding: '0 24px',
      height: '64px',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1,
    }}>
      {/* Logo 和系统标题 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginRight: '48px',
      }}>
        <Image
          src="/logo.png"
          alt="DIXcover Logo"
          width={32}
          height={32}
          style={{ marginRight: '8px' }}
        />
        <span style={{ 
          color: '#fff', 
          fontSize: '18px', 
          fontWeight: 'bold' 
        }}>
          DIXcover
        </span>
      </div>

      {/* 导航菜单 */}
      <Menu
        mode="horizontal"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
        style={{
          flex: 1,
          background: 'transparent',
          borderBottom: 'none',
          color: '#fff',
        }}
        theme="dark"
      />

      {/* 用户操作区域 */}
      <Space size={16}>
        <Button 
          type="text" 
          icon={<BellOutlined />}
          style={{ color: '#fff' }}
        />
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleUserMenuClick,
          }}
          placement="bottomRight"
          arrow
        >
          <Button 
            type="text" 
            icon={<UserOutlined />}
            style={{ color: '#fff' }}
          >
            <span style={{ marginLeft: 8 }}>管理员</span>
          </Button>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default Navbar; 