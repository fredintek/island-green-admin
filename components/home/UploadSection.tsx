"use client";
import React from "react";
import { Upload, UploadProps, message } from "antd";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

type Props = {};

const defaultImages = [
  "https://images.unsplash.com/photo-1736779580644-6b4268af4642?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1735945205189-ead34d91cf69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1737741772139-5f8a9d4dd078?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1737901685093-c5e05706efcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1736230990003-a98eea26ea1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D",
];

const UploadSection = (props: Props) => {
  const draggerProps: UploadProps = {
    name: "file",
    multiple: true,
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
  };

  return (
    <div className="flex flex-col p-6 bg-white shadow-md rounded-md">
      <p className="text-[22px] text-[#1d5745] font-bold uppercase mb-2">
        Hero Section
      </p>
      <div className="flex flex-col gap-6">
        {/* default hero images */}
        {(defaultImages?.length as number) > 0 && (
          <div>
            <p className="text-lg font-medium capitalize mb-2">
              Existing Hero Images
            </p>
            <div className="grid grid-cols-fluid gap-4">
              {defaultImages?.map((image) => (
                <div
                  key={image}
                  className="relative w-full aspect-video rounded-md overflow-hidden"
                >
                  <img
                    src={image}
                    alt="default-image"
                    className="w-full h-full object-cover"
                  />
                  <DeleteOutlined className="text-red-500 text-lg absolute top-2 right-2 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* upload new hero images */}
        <div>
          <p className="text-lg font-medium capitalize mb-2">
            Upload New Hero images
          </p>
          <div className="border-2 border-secondaryShade border-dashed rounded-xl w-full">
            <Dragger {...draggerProps} className="">
              <p className="ant-upload-drag-icon">
                <InboxOutlined className="!text-secondaryShade" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="ml-auto px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade border border-secondaryShade hover:bg-transparent hover:text-secondaryShade transition-colors duration-300"
        >
          <p className="uppercase font-medium">Submit</p>
        </button>
      </div>
    </div>
  );
};

export default UploadSection;
