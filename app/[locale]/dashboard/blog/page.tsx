"use client";
import { useGetPageBySlugQuery } from "@/redux/api/pageApiSlice";
import { Page } from "@/utils/interfaces";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Form, Input, Modal, Popconfirm, Table, Tooltip, Upload } from "antd";
import { ColumnsType } from "antd/es/table";
import { useLocale } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useLazyGetSectionByPageIdQuery } from "@/redux/api/sectionApiSlice";
const { Dragger } = Upload;

const testDefault = [
  {
    publicId: "rxyaakzyzqgpeorvof8p",
    url: "https://res.cloudinary.com/dlvv45itb/image/upload/v1740580034/rxyaakzyzqgpeorvof8p.png",
  },
  {
    publicId: "yp9hgdrjyjsibzuqkq1x",
    url: "https://res.cloudinary.com/dlvv45itb/image/upload/v1740660332/yp9hgdrjyjsibzuqkq1x.jpg",
  },
];

type Props = {};

const page = (props: Props) => {
  // Dynamically load the ReactQuill component (to prevent SSR issues)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  const locale = useLocale();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [blogFileList, setBlogFileList] = useState<any>([]);
  const [editingPage, setEditingPage] = useState<Partial<Page> | null>(null);
  const {
    data: getAllPageBySlugData,
    isLoading: getAllPageBySlugIsLoading,
    isError: getAllPageBySlugIsError,
    error: getAllPageBySlugError,
    refetch: getAllPageBySlugRefetch,
  } = useGetPageBySlugQuery("blog", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const [
    getSectionByPageIdFn,
    {
      data: getSectionByPageIdData,
      isLoading: getSectionByPageIdIsLoading,
      isError: getSectionByPageIdIsError,
      error: getSectionByPageIdError,
    },
  ] = useLazyGetSectionByPageIdQuery();

  const handleEdit = async (record: Partial<Page>) => {
    console.log("record", record);
    await getSectionByPageIdFn(record?.id);
    setEditingPage(record);
    setOpenModal(true);
    setBlogFileList(
      testDefault.map((img) => ({
        uid: img.publicId,
        name: "image",
        status: "done",
        url: img.url,
      }))
    );
    form.setFieldsValue({
      blogImages: testDefault.map((img) => ({
        uid: img.publicId,
        name: "image",
        status: "done",
        url: img.url,
      })),
    });
  };

  const handleUploadChange = ({ fileList }: any) => {
    setBlogFileList(fileList);
    form.setFieldsValue({ blogImages: fileList });
  };

  const handleFormSubmit = async (values: any) => {
    console.log("values", values);
  };

  const blogColumn: ColumnsType<Partial<Page>> = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text, record) => text[locale],
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Partial<Page>) => (
        <div className="flex items-center gap-4 text-lg text-gray-500">
          <button type="button" className="cursor-pointer">
            <Tooltip>
              <EyeOutlined />
            </Tooltip>
          </button>
          <button type="button" className="cursor-pointer">
            <Tooltip>
              <EditOutlined onClick={() => handleEdit(record)} />
            </Tooltip>
          </button>
          <button type="button" className="cursor-pointer">
            <Popconfirm title="Are you sure you want to delete this project?">
              <DeleteOutlined />
            </Popconfirm>
          </button>
        </div>
      ),
    },
  ];

  console.log("blogFileList", blogFileList);
  console.log("getSectionByPageIdData", getSectionByPageIdData?.data);

  return (
    <section className="flex flex-col gap-10">
      <div className="p-6 bg-white dark:bg-[#1e293b] shadow-md rounded-md">
        <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
          Blog Section
        </p>

        <div>
          <button
            onClick={() => {
              setOpenModal(true);
              setEditingPage(null);
              form.resetFields();
            }}
            type="button"
            className="mb-4 px-6 py-2 rounded-md text-white cursor-pointer flex gap-2 items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
          >
            <PlusOutlined className="text-lg" />
            <p className="uppercase font-medium text-sm">Add Page</p>
          </button>
          <Table
            columns={blogColumn}
            dataSource={getAllPageBySlugData?.subPages || []}
            scroll={{ x: 768 }}
            className=""
          />
        </div>
      </div>

      {/* add/edit FAQ */}
      <Modal
        onCancel={() => {
          setOpenModal(false);
          setEditingPage(null);
        }}
        onClose={() => {
          setOpenModal(false);
          setEditingPage(null);
        }}
        open={openModal}
        width={{
          xs: "100%",
        }}
        footer={null}
      >
        <Form onFinish={handleFormSubmit} layout="vertical" form={form}>
          {/* PAGE TITLE */}
          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              label="Page Title (Turkish)"
              name="pageTitleTr"
              rules={[{ required: true, message: "Page Title is required!" }]}
            >
              <Input size="large" placeholder="Enter Page Title in Turkish" />
            </Form.Item>
            <Form.Item
              label="Page Title (English)"
              name="pageTitleEn"
              rules={[{ required: true, message: "Page Title is required!" }]}
            >
              <Input size="large" placeholder="Enter Page Title in English" />
            </Form.Item>
            <Form.Item
              label="Page Title (Russian)"
              name="pageTitleRu"
              rules={[{ required: true, message: "Page Title is required!" }]}
            >
              <Input size="large" placeholder="Enter Page Title in Russian" />
            </Form.Item>
          </div>

          {/* BLOG TITLE */}
          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              label="Blog Title (Turkish)"
              name="blogTitleTr"
              rules={[{ required: true, message: "Blog Title is required!" }]}
            >
              <Input size="large" placeholder="Enter Blog Title in Turkish" />
            </Form.Item>
            <Form.Item
              label="Blog Title (English)"
              name="blogTitleEn"
              rules={[{ required: true, message: "Blog Title is required!" }]}
            >
              <Input size="large" placeholder="Enter Blog Title in English" />
            </Form.Item>
            <Form.Item
              label="Blog Title (Russian)"
              name="blogTitleRu"
              rules={[{ required: true, message: "Blog Title is required!" }]}
            >
              <Input size="large" placeholder="Enter Blog Title in Russian" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              rules={[{ required: true, message: "Blog Content is required!" }]}
              label="Blog Content(Turkish)"
              name="blogContentTr"
            >
              <ReactQuill
                theme="snow"
                placeholder="Enter blog content in Turkish"
              />
            </Form.Item>
            <Form.Item
              label="Blog Content(English)"
              name="blogContentEn"
              rules={[{ required: true, message: "Blog Content is required!" }]}
            >
              <ReactQuill
                theme="snow"
                placeholder="Enter blog content in English"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Blog Content is required!" }]}
              label="Blog Content(Russian)"
              name="blogContentRu"
            >
              <ReactQuill
                theme="snow"
                placeholder="Enter blog content in Russian"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Upload Blog Images (2)"
            name="blogImages"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[
              { required: true, message: "Please upload at least one image!" },
            ]}
          >
            <div className="border-2 border-secondaryShade dark:border-primaryShade border-dashed rounded-xl max-w-[600px]">
              <Dragger
                name="file"
                multiple={true}
                beforeUpload={() => false}
                maxCount={2}
                listType="picture-card"
                accept="image/*"
                fileList={blogFileList}
                onChange={handleUploadChange}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined className="!text-secondaryShade dark:!text-primaryShade" />
                </p>
                <p className="ant-upload-text !text-black dark:!text-gray-300">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
            </div>
          </Form.Item>
        </Form>
        <button
          onClick={() => form.submit()}
          type="button"
          className="ml-auto mt-2 px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
          disabled={false}
        >
          {false ? (
            <div className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5"></div> // Spinner
          ) : (
            <p className="uppercase font-medium">
              {editingPage ? "Save" : "Submit"}
            </p>
          )}
        </button>
      </Modal>
    </section>
  );
};

export default page;
