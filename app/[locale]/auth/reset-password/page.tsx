"use client";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import Password from "antd/es/input/Password";
import React from "react";

type Props = {};

const customizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => (
  <>
    {label}
    {required && <span className="text-red-500 ml-[2px]">*</span>}
  </>
);

const page = (props: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("VALUES", values);
  };
  return (
    <div className="bg-white relative max-w-[500px] w-[90%] flex flex-col border rounded-lg shadow-shadow-2 bg-login-box p-3">
      <div className="p-3 rounded-lg grid place-items-center bg-white shadow-shadow-1 w-fit mx-auto mb-4">
        <ReloadOutlined className="text-2xl" />
      </div>

      <p className="text-xl font-semibold text-center">Reset Your Password</p>
      <p className="text-sm font-normal text-[#666] text-center">
        Don’t worry! Enter the new password below to reset your account’s
        password. Your security is our priority, and we’ve made it easy to
        regain access.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4 flex flex-col gap-4"
        requiredMark={customizeRequiredMark}
      >
        <div className="">
          <FormItem
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Password must contain minimum eight characters, at least one letter, one number and one special character",
              },
            ]}
          >
            <Password
              className="bg-gray-200"
              placeholder="Password"
              size="large"
            />
          </FormItem>
        </div>
        <div className="">
          <FormItem
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm Password!",
              },
              {
                validator: (_, value) => {
                  if (!value || value === form.getFieldValue("password")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              },
            ]}
          >
            <Password
              className="bg-gray-200"
              placeholder="Password"
              size="large"
            />
          </FormItem>
        </div>
        <Button className="bg-black h-[39.6px] text-white py-[7px] px-[11px] rounded-[8px] flex justify-center items-center gap-2">
          <p className="font-medium">Reset Your Password</p>
        </Button>
      </Form>
    </div>
  );
};

export default page;
