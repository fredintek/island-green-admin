"use client";
import React, { useMemo, useState } from "react";
import { Input, Form, Upload, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const { Dragger } = Upload;

type Props = {};

const ProjectsSection = (props: Props) => {
  // Dynamically load the ReactQuill component (to prevent SSR issues)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  const [form] = Form.useForm();
  const [defaultImages, setDefaultImages] = useState([
    { url: "https://via.placeholder.com/150", id: 1 },
    { url: "https://via.placeholder.com/150", id: 2 },
  ]);

  const handleUploadChange = ({ fileList }: any) => {
    console.log("Uploaded files: ", fileList);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <p className="text-[22px] text-secondaryShade font-bold uppercase mb-6">
        Projects Section
      </p>

      <Form layout="vertical" form={form}>
        {/* Titles for EN, TR, RU */}
        <div className="grid grid-cols-fluid-1 gap-4">
          <Form.Item
            label="Title (English)"
            name="titleEn"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input size="large" placeholder="Enter title in English" />
          </Form.Item>
          <Form.Item
            label="Title (Turkish)"
            name="titleTr"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input size="large" placeholder="Enter title in Turkish" />
          </Form.Item>
          <Form.Item
            label="Title (Russian)"
            name="titleRu"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input size="large" placeholder="Enter title in Russian" />
          </Form.Item>
        </div>

        {/* Rich Text Editor for Content */}
        <div className="grid grid-cols-fluid-1 gap-4">
          <Form.Item
            label="Content (English)"
            name="contentEn"
            rules={[{ required: true, message: "Content is required!" }]}
          >
            <ReactQuill theme="snow" placeholder="Enter content in English" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Content is required!" }]}
            label="Content (Turkish)"
            name="contentTr"
          >
            <ReactQuill theme="snow" placeholder="Enter content in Turkish" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Content is required!" }]}
            label="Content (Russian)"
            name="contentRu"
          >
            <ReactQuill theme="snow" placeholder="Enter content in Russian" />
          </Form.Item>
        </div>

        {/* images display */}
        <Form.Item
          name="images"
          rules={[{ required: true, message: "Exactly 2 images is required" }]}
          label="Upload 2 Images"
        >
          <div className="border-2 border-secondaryShade border-dashed rounded-xl w-full">
            <Dragger
              multiple
              name="images"
              onChange={handleUploadChange}
              listType="picture-card"
              beforeUpload={(file) => {
                console.log("File selected:", file);
                return false;
              }}
              maxCount={2}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined className="!text-secondaryShade" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for uploading multiple images
              </p>
            </Dragger>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="ml-auto mt-4 px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade border border-secondaryShade hover:bg-transparent hover:text-secondaryShade transition-colors duration-300"
          >
            <p className="uppercase font-medium">Submit</p>
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjectsSection;
