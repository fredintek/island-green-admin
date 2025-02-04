"use client";
import { UnlockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import OTP from "antd/es/input/OTP";
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
    <>
      <div className="bg-white relative max-w-[500px] w-[90%] flex flex-col border rounded-lg shadow-shadow-2 bg-login-box p-3">
        <div className="p-3 rounded-lg grid place-items-center bg-white shadow-shadow-1 w-fit mx-auto mb-4">
          <UnlockOutlined className="text-2xl" />
        </div>

        <p className="text-xl font-semibold text-center">
          Request Password Change
        </p>
        <p className="text-sm font-normal text-[#666] text-center">
          Don’t worry, we’ve got you covered! Enter your email to receive
          instructions on how to reset your password and regain access to your
          account.
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
              ]}
            >
              <Input
                className="bg-gray-200"
                placeholder="Email Address"
                size="large"
              />
            </FormItem>
          </div>
          <Button className="bg-black h-[39.6px] text-white py-[7px] px-[11px] rounded-[8px] flex justify-center items-center gap-2">
            <p className="font-medium">Forgot Password</p>
          </Button>
        </Form>
      </div>

      {/* OTP */}
      <div className="mt-8 relative -translate-y-[15%] max-w-[500px] w-[90%] flex flex-col border rounded-lg shadow-shadow-2 bg-login-box p-3 gap-2">
        <p className="text-xl font-medium uppercase text-center">
          Enter your 6-digit OTP
        </p>
        <OTP
          length={6}
          size="large"
          status={"error"}
          onChange={(value) => {
            console.log("onChange", value);
          }}
          type="text"
        />
      </div>
    </>
  );
};

export default page;
