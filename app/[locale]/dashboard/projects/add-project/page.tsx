"use client";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload } from "antd";
import Dragger from "antd/es/upload/Dragger";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

type Props = {};

const page = (props: Props) => {
  // Dynamically load the ReactQuill component (to prevent SSR issues)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  const [projectFileList, setProjectFileList] = useState<any>([]);
  const [projectPdfList, setProjectPdfList] = useState<any>([]);
  const [projectHomeImageList, setProjectHomeImageList] = useState<any>([]);
  const [projectHouseGallery, setProjectHouseGallery] = useState<any>([]);
  const [projectHouseCoverImageFileList, setProjectHouseCoverImageFileList] =
    useState<any>([]);
  const [
    projectHouseDisplayImageFileList,
    setProjectHouseDisplayImageFileList,
  ] = useState<any>([]);
  const [form] = Form.useForm();

  const handleUploadChange = ({ fileList }: any) => {
    setProjectFileList(fileList);
    form.setFieldsValue({ projectImages: fileList });
  };

  const handleUploadChangePdf = ({ fileList }: any) => {
    setProjectPdfList(fileList);
    form.setFieldsValue({ projectPdf: fileList });
  };

  const handleUploadChangeHomeImage = ({ fileList }: any) => {
    setProjectHomeImageList(fileList);
    form.setFieldsValue({ projectHomeImage: fileList });
  };

  const handleUploadChangeProjectHouseCoverImage = ({ fileList }: any) => {
    setProjectHouseCoverImageFileList(fileList);
    form.setFieldsValue({ projectHouseCoverImage: fileList });
  };

  const handleUploadChangeProjectHouseDisplayImage = ({ fileList }: any) => {
    setProjectHouseDisplayImageFileList(fileList);
    form.setFieldsValue({ projectHouseDisplayImage: fileList });
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="p-6 bg-white dark:bg-[#1e293b] shadow-md rounded-md">
        <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
          Add Project
        </p>

        <Form layout="vertical" form={form}>
          {/* PROJECT TITLE */}
          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              label="Project Title (Turkish)"
              name="projectTitleTr"
              rules={[
                { required: true, message: "Project Title is required!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Project Title in Turkish"
              />
            </Form.Item>
            <Form.Item
              label="Project Title (English)"
              name="projectTitleEn"
              rules={[
                { required: true, message: "Project Title is required!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Project Title in English"
              />
            </Form.Item>
            <Form.Item
              label="Project Title (Russian)"
              name="projectTitleRu"
              rules={[
                { required: true, message: "Project Title is required!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Project Title in Russian"
              />
            </Form.Item>
          </div>

          {/* PRODUCT LINK */}
          <Form.Item
            rules={[{ required: true, message: "Product Link is required!" }]}
            label="Product Link"
            name="productLink"
          >
            <Input size="large" placeholder="Enter Project Title in Turkish" />
          </Form.Item>

          {/* PROJECT CONTENT */}
          <div>
            <p className="text-base text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
              Project Content
            </p>

            <div className="flex items-center gap-10">
              <Form.Item
                label="Upload Project Images (2)"
                name="projectImages"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[
                  {
                    required: true,
                    message: "Please upload at least one image!",
                  },
                ]}
              >
                <Upload
                  name="file"
                  multiple={false}
                  beforeUpload={() => false}
                  listType="picture-card"
                  accept="image/*"
                  fileList={projectFileList}
                  onChange={handleUploadChange}
                >
                  <PlusOutlined />
                </Upload>
              </Form.Item>

              <Form.Item
                label="Upload Project PDF"
                name="projectPdf"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[
                  {
                    required: true,
                    message: "Project PDF is required!",
                  },
                ]}
              >
                <Upload
                  name="file"
                  multiple={false}
                  beforeUpload={() => false}
                  listType="picture-card"
                  accept="application/pdf"
                  fileList={projectPdfList}
                  onChange={handleUploadChangePdf}
                >
                  <PlusOutlined />
                </Upload>
              </Form.Item>
            </div>

            <div className="grid grid-cols-fluid-1 gap-4">
              <Form.Item
                rules={[
                  { required: true, message: "Project Content is required!" },
                ]}
                label="Project Content(Turkish)"
                name="projectContentTr"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project content in Turkish"
                />
              </Form.Item>
              <Form.Item
                label="Project Content(English)"
                name="projectContentEn"
                rules={[
                  { required: true, message: "Project Content is required!" },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project content in English"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Project Content is required!" },
                ]}
                label="Project Content(Russian)"
                name="projectContentRu"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project content in Russian"
                />
              </Form.Item>
            </div>
          </div>

          {/* PROJECT HOUSE */}
          <div>
            <p className="text-base text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
              Project Houses
            </p>

            {/* project house titles */}
            <div className="grid grid-cols-fluid-1 gap-4">
              <Form.Item
                label="Project House Title (Turkish)"
                name="projectHouseTitleTr"
                rules={[
                  {
                    required: true,
                    message: "Project House Title is required!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Project House Title in Turkish"
                />
              </Form.Item>
              <Form.Item
                label="Project House Title (English)"
                name="projectHouseTitleEn"
                rules={[
                  {
                    required: true,
                    message: "Project House Title is required!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Project House Title in English"
                />
              </Form.Item>
              <Form.Item
                label="Project House Title (Russian)"
                name="projectHouseTitleRu"
                rules={[
                  {
                    required: true,
                    message: "Project House Title is required!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Project House Title in Russian"
                />
              </Form.Item>
            </div>

            {/* project house cover image and display image and home images */}
            <div className="flex items-center gap-10">
              <Form.Item
                label="Project House Cover Image"
                name="projectHouseCoverImage"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[
                  {
                    required: true,
                    message: "Project House Cover Image is required!",
                  },
                ]}
              >
                <Upload
                  name="file"
                  multiple={false}
                  beforeUpload={() => false}
                  listType="picture-card"
                  accept="image/*"
                  fileList={projectHouseCoverImageFileList}
                  onChange={handleUploadChangeProjectHouseCoverImage}
                >
                  <PlusOutlined />
                </Upload>
              </Form.Item>

              <Form.Item
                label="Project House Display Image"
                name="projectHouseDisplayImage"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[
                  {
                    required: true,
                    message: "Project House Display Image is required!",
                  },
                ]}
              >
                <Upload
                  name="file"
                  multiple={false}
                  beforeUpload={() => false}
                  listType="picture-card"
                  accept="image/*"
                  fileList={projectHouseDisplayImageFileList}
                  onChange={handleUploadChangeProjectHouseDisplayImage}
                >
                  <PlusOutlined />
                </Upload>
              </Form.Item>

              {/* project home images */}
              <Form.Item
                label="Upload Project Home Images (2)"
                name="projectHomeImage"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[
                  {
                    required: true,
                    message: "Project Home Image is required!",
                  },
                ]}
              >
                <Upload
                  name="file"
                  multiple={true}
                  beforeUpload={() => false}
                  listType="picture-card"
                  accept="image/*"
                  fileList={projectHomeImageList}
                  onChange={handleUploadChangeHomeImage}
                  maxCount={2}
                >
                  <PlusOutlined />
                </Upload>
              </Form.Item>
            </div>

            {/* project home content */}
            <div className="grid grid-cols-fluid-1 gap-4">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Project Home Content is required!",
                  },
                ]}
                label="Project Home Content(Turkish)"
                name="projectHomeContentTr"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project home content in Turkish"
                />
              </Form.Item>
              <Form.Item
                label="Project Home Content(English)"
                name="projectHomeContentEn"
                rules={[
                  {
                    required: true,
                    message: "Project Home Content is required!",
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project home content in English"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Project Home Content is required!",
                  },
                ]}
                label="Project Home Content(Russian)"
                name="projectHomeContentRu"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project home content in Russian"
                />
              </Form.Item>
            </div>

            {/* project house general info */}
            <div className="grid grid-cols-fluid-1 gap-4">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Project General Info is required!",
                  },
                ]}
                label="Project General Info(Turkish)"
                name="projectGeneralInfoTr"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project general info in Turkish"
                />
              </Form.Item>
              <Form.Item
                label="Project General Info(English)"
                name="projectGeneralInfoEn"
                rules={[
                  {
                    required: true,
                    message: "Project General Info is required!",
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project general info in English"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Project General Info is required!",
                  },
                ]}
                label="Project General Info(Russian)"
                name="projectGeneralInfoRu"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project general info in Russian"
                />
              </Form.Item>
            </div>

            {/* project house features */}
            <div className="grid grid-cols-fluid-1 gap-4">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Project features is required!",
                  },
                ]}
                label="Project Features(Turkish)"
                name="projectFeaturesTr"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project features in Turkish"
                />
              </Form.Item>
              <Form.Item
                label="Project Features(English)"
                name="projectFeaturesEn"
                rules={[
                  {
                    required: true,
                    message: "Project features is required!",
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project features in English"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Project features is required!",
                  },
                ]}
                label="Project Features(Russian)"
                name="projectFeaturesRu"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter project features in Russian"
                />
              </Form.Item>
            </div>

            {/* project house optional features */}
            <div className="grid grid-cols-fluid-1 gap-4">
              <Form.Item
                label="Optional Project Features(Turkish)"
                name="optionalProjectFeaturesTr"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter optional project features in Turkish"
                />
              </Form.Item>
              <Form.Item
                label="Optional Project Features(English)"
                name="optionalProjectFeaturesEn"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter optional project features in English"
                />
              </Form.Item>
              <Form.Item
                label="Optional Project Features(Russian)"
                name="optionalProjectFeaturesRu"
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Enter optional project features in Russian"
                />
              </Form.Item>
            </div>

            {/* project house gallery */}
            <div>
              <p className="text-sm text-black dark:text-gray-300 capitalize mb-2">
                Upload project house gallery
              </p>
              <div className="border-2 border-secondaryShade dark:border-primaryShade border-dashed rounded-xl w-full">
                <Dragger
                  name="file"
                  multiple={true}
                  beforeUpload={(file) => false}
                  onChange={(info) => {
                    setProjectHouseGallery(info.fileList);
                  }}
                  listType="picture-card"
                  accept="image/*"
                  className=""
                  fileList={projectHouseGallery}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined className="!text-secondaryShade dark:!text-primaryShade" />
                  </p>
                  <p className="ant-upload-text !text-black dark:!text-gray-300">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint !text-black dark:!text-gray-300">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default page;
