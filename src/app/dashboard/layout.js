"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  ConfigProvider,
  theme,
} from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  MessageOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useAuth, AuthProvider } from "@/hooks/useAuth";
import "antd/dist/reset.css";

const { Header, Sider, Content } = Layout;

function DashboardLayoutContent({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, isLoading, logout, getAdminName } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated && pathname !== "/dashboard/login") {
      router.push("/dashboard/login");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Don't render layout for login page
  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  // Show loading or redirect (prevents flashing content)
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#141414",
          color: "rgba(255, 255, 255, 0.85)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/dashboard/blogs",
      icon: <FileTextOutlined />,
      label: "Blogs",
    },
    {
      key: "/dashboard/massge",
      icon: <MessageOutlined />,
      label: "Messages",
    },
  ];

  const userMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: logout,
    },
  ];

  const handleMenuClick = ({ key }) => {
    router.push(key);
  };

  const getSelectedKey = () => {
    if (pathname.startsWith("/dashboard/blogs")) return "/dashboard/blogs";
    if (pathname.startsWith("/dashboard/massge")) return "/dashboard/massge";
    return pathname;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: collapsed ? "18px" : "20px",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {collapsed ? "AD" : "Admin Dashboard"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ marginTop: "16px" }}
        />
      </Sider>
      <Layout
        style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}
      >
        <Header
          style={{
            padding: "0 24px",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
              <span style={{ fontWeight: 500 }}>{getAdminName()}</span>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "transparent",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <AuthProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </AuthProvider>
    </ConfigProvider>
  );
}
