"use client";
import { Form, Input } from "antd";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

type Props = {};

const page = (props: Props) => {
  // Dynamically load the ReactQuill component (to prevent SSR issues)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    console.log("values", values);
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-[#1e293b] shadow-md rounded-md">
        <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
          Communication Section
        </p>

        {/* content */}
        <Form
          className="themed-form"
          onFinish={handleFormSubmit}
          layout="vertical"
          form={form}
        >
          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              rules={[{ required: true, message: "Telephone is required!" }]}
              label={<span>Telephone Numbers</span>}
              name="telephone"
            >
              <ReactQuill
                className="themed-quill"
                theme="snow"
                placeholder="Enter telephone"
              />
            </Form.Item>
            <Form.Item
              label={<span>Emails</span>}
              name="email"
              rules={[{ required: true, message: "Email is required!" }]}
            >
              <ReactQuill
                className="themed-quill"
                theme="snow"
                placeholder="Enter email"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Location is required!" }]}
              label={<span>Locations</span>}
              name="location"
            >
              <ReactQuill
                className="themed-quill"
                theme="snow"
                placeholder="Enter location"
              />
            </Form.Item>
          </div>
        </Form>

        <button
          onClick={() => form.submit()}
          type="button"
          className="ml-auto px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
        >
          <p className="uppercase font-medium">Submit</p>
        </button>
      </div>
    </>
  );
};

export default page;
