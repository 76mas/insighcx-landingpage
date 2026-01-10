"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Badge,
  Button,
  Tag,
  Space,
  Card,
  Input,
  Modal,
  message,
  Popconfirm,
} from "antd";
import {
  CheckCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
} from "../../actions/massage.action";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const result = await getAllMessages({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText,
      });
      if (result.success) {
        setMessages(result.messages);
        setTotal(result.total);
      } else {
        message.error(result.error || "Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  // Mark message as read
  const handleMarkAsRead = async (id) => {
    try {
      const result = await markMessageAsRead(id);
      if (result.success) {
        message.success("Message marked as read");
        setMessages(
          messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
        );
      } else {
        message.error(result.error || "Failed to mark as read");
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteMessage(id);
      if (result.success) {
        message.success("Message deleted");
        fetchMessages();
      } else {
        message.error(result.error || "Failed to delete message");
      }
    } catch (error) {
      message.error("An error occurred while deleting");
    }
  };

  // View message details
  const viewMessage = async (msg) => {
    setSelectedMessage(msg);
    setModalVisible(true);
    if (!msg.read) {
      handleMarkAsRead(msg.id);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span>
          <UserOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <span>
          <MailOutlined style={{ marginRight: "8px", color: "#52c41a" }} />
          {text}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) =>
        phone ? (
          <span>
            <PhoneOutlined style={{ marginRight: "8px", color: "#faad14" }} />
            {phone}
          </span>
        ) : (
          <Tag>N/A</Tag>
        ),
    },
    {
      title: "Message Preview",
      dataIndex: "message",
      key: "message",
      render: (text) => (
        <span style={{ color: "#666" }}>
          {text ? text.substring(0, 50) + (text.length > 50 ? "..." : "") : "-"}
        </span>
      ),
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
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => viewMessage(record)}
          >
            View
          </Button>
          {!record.read && (
            <Button
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => handleMarkAsRead(record.id)}
            >
              Mark Read
            </Button>
          )}
          <Popconfirm
            title="Delete message"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}
      >
        Messages Management
      </h1>

      <Card style={{ marginBottom: "16px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Search messages..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: "300px" }}
              allowClear
            />
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchMessages}
                loading={loading}
              >
                Refresh
              </Button>
              <Tag color="blue">Total: {total}</Tag>
              <Tag color="red">
                Unread: {messages.filter((m) => !m.read).length}
              </Tag>
            </Space>
          </div>
        </Space>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={messages}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            total: total,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} messages`,
          }}
          onChange={handleTableChange}
        />
      </Card>

      {/* Message Detail Modal */}
      <Modal
        title={
          <div>
            <UserOutlined style={{ marginRight: "8px" }} />
            Message from {selectedMessage?.name}
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedMessage && (
          <div>
            <div style={{ marginBottom: "16px" }}>
              <strong>Email:</strong>
              <p style={{ marginTop: "4px" }}>
                <MailOutlined style={{ marginRight: "8px" }} />
                {selectedMessage.email}
              </p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <strong>Phone:</strong>
              <p style={{ marginTop: "4px" }}>
                <PhoneOutlined style={{ marginRight: "8px" }} />
                {selectedMessage.phone || "N/A"}
              </p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <strong>Date:</strong>
              <p style={{ marginTop: "4px" }}>
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <strong>Message:</strong>
              <p
                style={{
                  marginTop: "8px",
                  padding: "12px",
                  borderRadius: "4px",
                  lineHeight: "1.6",
                  backgroundColor: "#424242",
                  color: "#fff",
                }}
              >
                {selectedMessage.message}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
