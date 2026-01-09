"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Badge,
  message,
  Spin,
  Button,
} from "antd";
import {
  FileTextOutlined,
  MessageOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { getDashboardOverview } from "./actions/dashboard.action";

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: {
      totalBlogs: 0,
      totalMessages: 0,
      unreadMessages: 0,
    },
    recentBlogs: [],
    recentMessages: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const result = await getDashboardOverview();
      if (result.success) {
        setData(result.data);
      } else {
        message.error(result.error || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
      message.error(
        "An unexpected error occurred while loading dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  const blogColumns = [
    {
      title: "Title",
      dataIndex: "mainTitle",
      key: "mainTitle",
      render: (text, record) => (
        <a
          onClick={() => router.push(`/dashboard/blogs/${record.id}`)}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  const messageColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) =>
        text ? text.substring(0, 50) + (text.length > 50 ? "..." : "") : "-",
    },
    {
      title: "Status",
      dataIndex: "read",
      key: "read",
      render: (read) => (
        <Badge
          status={read ? "success" : "processing"}
          text={read ? "Read" : "Unread"}
        />
      ),
    },
  ];

  if (loading && !data.stats.totalBlogs && !data.recentBlogs.length) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "400px",
        }}
      >
        <Spin size="large" tip="Loading dashboard data..." />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          Dashboard Overview
        </h1>
        <Button onClick={fetchDashboardData} loading={loading}>
          Refresh Data
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Blogs"
              value={data.stats.totalBlogs}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Messages"
              value={data.stats.totalMessages}
              prefix={<MessageOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Unread Messages"
              value={data.stats.unreadMessages}
              prefix={<MailOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Blogs */}
      <Card
        title="Recent Blogs"
        style={{ marginBottom: "24px" }}
        extra={
          <a
            onClick={() => router.push("/dashboard/blogs")}
            style={{ cursor: "pointer" }}
          >
            View All
          </a>
        }
      >
        <Table
          columns={blogColumns}
          dataSource={data.recentBlogs}
          rowKey="id"
          pagination={false}
          loading={loading}
        />
      </Card>

      {/* Recent Messages */}
      <Card
        title="Recent Messages"
        extra={
          <a
            onClick={() => router.push("/dashboard/massge")}
            style={{ cursor: "pointer" }}
          >
            View All
          </a>
        }
      >
        <Table
          columns={messageColumns}
          dataSource={data.recentMessages}
          rowKey="id"
          pagination={false}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
