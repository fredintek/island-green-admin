"use client";
import React, { useMemo } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Upload, UploadProps } from "antd";
import dynamic from "next/dynamic";
const { Dragger } = Upload;

type Props = {};

const page = (props: Props) => {
  const [form] = Form.useForm();
  // Dynamically load the ReactQuill component (to prevent SSR issues)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  const handleFormSubmit = (values: any) => {
    console.log("values", values);
  };

  const draggerProps: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      console.log("File selected:", file);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log("INFO FILE:uploading", info.file, info.fileList);
      }
      if (status === "done") {
        console.log("INFO FILE:done", info.file);
      } else if (status === "error") {
        console.log("INFO FILE:error", info.file);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    listType: "picture-card",
    maxCount: 1,
  };

  return (
    <div className="p-6 bg-white dark:bg-[#1e293b] shadow-md rounded-md">
      <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
        Who are we
      </p>

      {/* content */}
      <div>
        <p className="text-lg text-black dark:text-gray-300 font-medium capitalize mb-2">
          Upload Image
        </p>
        <div className="border-2 border-secondaryShade dark:border-primaryShade border-dashed rounded-xl w-full">
          <Dragger {...draggerProps} className="">
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="!text-secondaryShade dark:!text-primaryShade" />
            </p>
            <p className="ant-upload-text !text-black dark:!text-gray-300">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <p className="text-lg text-black dark:text-gray-300 font-medium capitalize mb-2">
          Content
        </p>
        <Form
          className="themed-form"
          onFinish={handleFormSubmit}
          layout="vertical"
          form={form}
        >
          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              rules={[{ required: true, message: "Content is required!" }]}
              label={<span>Content (Turkish)</span>}
              name="contentTr"
            >
              <ReactQuill
                className="themed-quill"
                theme="snow"
                placeholder="Enter content in Turkish"
              />
            </Form.Item>
            <Form.Item
              label={<span>Content (English)</span>}
              name="contentEn"
              rules={[{ required: true, message: "Content is required!" }]}
            >
              <ReactQuill
                className="themed-quill"
                theme="snow"
                placeholder="Enter content in English"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Content is required!" }]}
              label={<span>Content (Russian)</span>}
              name="contentRu"
            >
              <ReactQuill
                className="themed-quill"
                theme="snow"
                placeholder="Enter content in Russian"
              />
            </Form.Item>
          </div>
        </Form>
      </div>

      <button
        onClick={() => form.submit()}
        type="button"
        className="mt-4 ml-auto px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
      >
        <p className="uppercase font-medium">Submit</p>
      </button>
    </div>
  );
};

export default page;
