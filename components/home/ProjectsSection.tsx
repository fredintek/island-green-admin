"use client";
import React, { useMemo, useState } from "react";
import {
  Input,
  Form,
  Upload,
  Table,
  Tooltip,
  Popconfirm,
  Modal,
  Button,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css";

const { Dragger } = Upload;

type Props = {};

type Project = {
  titleTr: string;
  contentTr: string;
  titleEn: string;
  contentEn: string;
  titleRu: string;
  contentRu: string;
  images: string[];
};

const ProjectsSection = (props: Props) => {
  // Dynamically load the ReactQuill component (to prevent SSR issues)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  const [openProjectModal, setProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([
    {
      titleTr: "Çevre Dostu Proje",
      contentTr: "Bu proje, sürdürülebilir çevre çözümleri sunmayı amaçlıyor.",
      titleEn: "Eco-Friendly Project",
      contentEn:
        "This project aims to provide sustainable environmental solutions.",
      titleRu: "Экологичный проект",
      contentRu:
        "Этот проект направлен на предоставление устойчивых экологических решений.",
      images: [
        "https://images.unsplash.com/photo-1736779580644-6b4268af4642?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1735945205189-ead34d91cf69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      titleTr: "Yenilenebilir Enerji Girişimi",
      contentTr:
        "Güneş enerjisi ve rüzgar türbinleri ile enerji çözümleri sunan bir girişim.",
      titleEn: "Renewable Energy Initiative",
      contentEn:
        "An initiative providing energy solutions through solar panels and wind turbines.",
      titleRu: "Инициатива по возобновляемой энергии",
      contentRu:
        "Инициатива, предлагающая энергетические решения с использованием солнечных панелей и ветряных турбин.",
      images: [
        "https://images.unsplash.com/photo-1737741772139-5f8a9d4dd078?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1737901685093-c5e05706efcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  ]);
  const [form] = Form.useForm();

  const handleUploadChange = ({ fileList }: any) => {
    console.log("Uploaded files: ", fileList);
  };

  const handleEdit = (record: Project) => {
    setEditingProject(record);
    setProjectModal(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record: Project) => {
    setProjectsData((prev) => prev.filter((project) => project !== record));
  };

  const handleFormSubmit = (values: Project) => {
    if (editingProject) {
      setProjectsData((prev) =>
        prev.map((project) =>
          project === editingProject
            ? { ...editingProject, ...values }
            : project
        )
      );
    } else {
      setProjectsData((prev) => [...prev, values]);
    }
    setProjectModal(false);
    form.resetFields();
    setEditingProject(null);
  };

  const projectsColumn = [
    {
      title: "Title (tr)",
      dataIndex: "titleTr",
      key: "titleTr",
    },
    {
      title: "Title (en)",
      dataIndex: "titleEn",
      key: "titleEn",
    },
    {
      title: "Title (ru)",
      dataIndex: "titleRu",
      key: "titleRu",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Project) => (
        <div className="flex items-center gap-4 text-lg text-gray-500">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => handleEdit(record)}
          >
            <Tooltip title="Edit">
              <EditOutlined />
            </Tooltip>
          </button>
          <button type="button" className="cursor-pointer">
            <Popconfirm
              title="Are you sure you want to delete this project?"
              onConfirm={() => handleDelete(record)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 bg-white shadow-md rounded-md">
        <p className="text-[22px] text-secondaryShade font-bold uppercase mb-6">
          Projects Section
        </p>

        <div>
          <button
            onClick={() => {
              setProjectModal(true);
              form.resetFields();
              setEditingProject(null);
            }}
            type="button"
            className="mb-4 px-6 py-2 rounded-md text-white cursor-pointer flex gap-2 items-center justify-center bg-secondaryShade border border-secondaryShade hover:bg-transparent hover:text-secondaryShade transition-colors duration-300"
          >
            <PlusOutlined className="text-lg" />
            <p className="uppercase font-medium text-sm">Add Project</p>
          </button>
          <Table
            columns={projectsColumn}
            dataSource={projectsData}
            rowKey="titleEn"
            scroll={{ x: 768 }}
          />
        </div>
      </div>

      {/* add/edit project */}
      <Modal
        onCancel={() => setProjectModal(false)}
        onClose={() => setProjectModal(false)}
        open={openProjectModal}
        width={{
          xs: "100%",
        }}
        footer={null}
      >
        <Form onFinish={handleFormSubmit} layout="vertical" form={form}>
          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              label="Title (Turkish)"
              name="titleTr"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input size="large" placeholder="Enter title in Turkish" />
            </Form.Item>
            <Form.Item
              label="Title (English)"
              name="titleEn"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input size="large" placeholder="Enter title in English" />
            </Form.Item>
            <Form.Item
              label="Title (Russian)"
              name="titleRu"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input size="large" placeholder="Enter title in Russian" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              rules={[{ required: true, message: "Content is required!" }]}
              label="Content (Turkish)"
              name="contentTr"
            >
              <ReactQuill theme="snow" placeholder="Enter content in Turkish" />
            </Form.Item>
            <Form.Item
              label="Content (English)"
              name="contentEn"
              rules={[{ required: true, message: "Content is required!" }]}
            >
              <ReactQuill theme="snow" placeholder="Enter content in English" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Content is required!" }]}
              label="Content (Russian)"
              name="contentRu"
            >
              <ReactQuill theme="snow" placeholder="Enter content in Russian" />
            </Form.Item>
          </div>

          <Form.Item
            name="images"
            rules={[
              {
                validator: (_, value) => {
                  const files = value || [];
                  if (files.length !== 2) {
                    return Promise.reject(
                      new Error("Exactly 2 images are required.")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            label="Upload 2 Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e.map((file) => file.originFileObj || file.url);
              }
              return e?.fileList?.map((file: any) =>
                file.originFileObj ? file.originFileObj : file.url
              );
            }}
          >
            <Upload
              multiple
              onChange={handleUploadChange}
              listType="picture-card"
              beforeUpload={() => false}
              maxCount={2}
              defaultFileList={
                editingProject?.images?.map((url: string, index: number) => ({
                  uid: index.toString(),
                  name: `Image${index + 1}`,
                  status: "done",
                  url,
                })) || []
              }
            >
              <button
                type="button"
                className="p-1 rounded-md text-white cursor-pointer flex gap-2 items-center justify-center bg-secondaryShade border border-secondaryShade hover:bg-transparent hover:text-secondaryShade transition-colors duration-300"
              >
                <UploadOutlined className="text-lg" />
                <p className="uppercase font-medium text-sm">Upload</p>
              </button>
            </Upload>

            <button
              onClick={() => form.submit()}
              type="button"
              className="ml-auto mt-4 px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade border border-secondaryShade hover:bg-transparent hover:text-secondaryShade transition-colors duration-300"
            >
              <p className="uppercase font-medium">
                {editingProject ? "Update Project" : "Add Project"}
              </p>
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectsSection;
