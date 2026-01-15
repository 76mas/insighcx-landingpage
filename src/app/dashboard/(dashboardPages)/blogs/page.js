"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Tag,
  Image,
  Space,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  InputNumber,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  FolderOutlined,
  MinusCircleOutlined,
  EditOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from "../../actions/blog.action";
import { uploadImage } from "../../actions/upload.action";

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBlogs();
  }, [pagination.current, pagination.pageSize]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const result = await getAllBlogs({
        page: pagination.current,
        limit: pagination.pageSize,
      });
      if (result.success) {
        setBlogs(result.blogs);
        setTotal(result.total);
      } else {
        message.error(result.error || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  // Handle Add Blog
  const handleAddBlog = async (values) => {
    setSubmitting(true);
    try {
      const result = await addBlog(values);
      if (result.success) {
        message.success("Blog added successfully!");
        setIsModalVisible(false);
        form.resetFields();
        fetchBlogs();
      } else {
        message.error(result.error || "Failed to add blog");
      }
    } catch (error) {
      message.error("An error occurred while adding the blog");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Edit Blog
  const handleEditBlog = async (values) => {
    setSubmitting(true);
    try {
      const result = await updateBlog(editingBlog.id, values);
      if (result.success) {
        message.success("Blog updated successfully!");
        setIsModalVisible(false);
        setIsEditMode(false);
        setEditingBlog(null);
        form.resetFields();
        fetchBlogs();
      } else {
        message.error(result.error || "Failed to update blog");
      }
    } catch (error) {
      message.error("An error occurred while updating the blog");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setIsEditMode(true);
    setIsModalVisible(true);
    form.setFieldsValue({
      mainTitle: blog.mainTitle,
      category: blog.category,
      imageUrl: blog.imageUrl,
      content: blog.content || [],
    });

    if (blog.imageUrl) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: blog.imageUrl,
        },
      ]);
    } else {
      setFileList([]);
    }
  };

  // Handle Delete Blog
  const handleDelete = async (id) => {
    try {
      const result = await deleteBlog(id);
      if (result.success) {
        message.success("Blog deleted successfully!");
        fetchBlogs();
      } else {
        message.error(result.error || "Failed to delete blog");
      }
    } catch (error) {
      message.error("An error occurred while deleting the blog");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      render: (imageUrl) => (
        console.log("imageUrl", imageUrl),
        (
          // add base url to imageUrl
          <Image
            src={"https://insight-x.info" + imageUrl}
            alt="Blog thumbnail"
            width={60}
            height={60}
            style={{ objectFit: "cover", borderRadius: "4px" }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        )
      ),
    },
    {
      title: "Main Title",
      dataIndex: "mainTitle",
      key: "mainTitle",
      width: 250,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (category) => (
        <Tag color="cyan" icon={<FolderOutlined />}>
          {category}
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 130,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Delete Blog"
            description="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          />
        </Space>
      ),
    },
  ];

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
          Blogs Management
        </h1>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchBlogs}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setIsModalVisible(true);
              setFileList([]);
            }}
          >
            Add Blog
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          total: total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} blogs`,
        }}
        onChange={handleTableChange}
      />

      {/* Add/Edit Blog Modal */}
      <Modal
        title={isEditMode ? "Edit Blog" : "Add New Blog"}
        open={isModalVisible}
        onCancel={() => {
          if (!submitting) {
            setIsModalVisible(false);
            setIsEditMode(false);
            setEditingBlog(null);
            setFileList([]);
            form.resetFields();
          }
        }}
        footer={null}
        width={700}
        maskClosable={!submitting}
        closable={!submitting}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={isEditMode ? handleEditBlog : handleAddBlog}
          disabled={submitting}
        >
          <Form.Item
            name="mainTitle"
            label="Main Title"
            rules={[{ required: true, message: "Please enter the main title" }]}
          >
            <Input placeholder="Enter blog main title" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input placeholder="e.g., Real Estate, Guides, Investment" />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Blog Image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              maxCount={1}
              onPreview={(file) => {
                const url = file.url || file.thumbUrl;
                window.open(url, "_blank");
              }}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              customRequest={async ({ file, onSuccess, onError }) => {
                const formData = new FormData();
                formData.append("file", file);
                try {
                  const result = await uploadImage(formData);
                  if (result.success) {
                    form.setFieldsValue({ imageUrl: result.url });
                    onSuccess(result.url);
                  } else {
                    message.error(result.error);
                    onError(result.error);
                  }
                } catch (err) {
                  message.error("Upload failed");
                  onError(err);
                }
              }}
            >
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.List name="content">
            {(fields, { add, remove }) => (
              <>
                <div style={{ marginBottom: "8px", fontWeight: 500 }}>
                  Blog Content (Ordered by Priority)
                </div>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      alignItems: "center",
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "type"]}
                      rules={[{ required: true, message: "Type" }]}
                      style={{ width: "120px", marginBottom: 0 }}
                    >
                      <Select placeholder="Type">
                        <Select.Option value="title">Title</Select.Option>
                        <Select.Option value="paragraph">
                          Paragraph
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "words"]}
                      rules={[
                        { required: true, message: "Please enter content" },
                      ]}
                      style={{ width: "400px", marginBottom: 0 }}
                    >
                      <Input.TextArea
                        placeholder="Content (Title or Paragraph)"
                        autoSize={{ minRows: 1, maxRows: 6 }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "priority"]}
                      rules={[{ required: true, message: "Priority" }]}
                      style={{ width: "80px", marginBottom: 0 }}
                    >
                      <InputNumber
                        placeholder="Prio"
                        min={1}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({
                        type: "paragraph",
                        words: "",
                        priority: fields.length + 1,
                      })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Content Block
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item style={{ marginTop: "24px", marginBottom: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {isEditMode ? "Update Blog" : "Add Blog"}
              </Button>
              <Button
                disabled={submitting}
                onClick={() => {
                  setIsModalVisible(false);
                  setIsEditMode(false);
                  setEditingBlog(null);
                  setFileList([]);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
