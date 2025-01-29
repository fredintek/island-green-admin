import React from "react";
import { Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

type Props = {};

const ContactSection = (props: Props) => {
  const draggerProps: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      if (!file.type.startsWith("video/")) {
        return Upload.LIST_IGNORE;
      }
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
    accept: "video/*",
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <p className="text-[22px] text-secondaryShade font-bold uppercase mb-6">
        Contact Section
      </p>

      {/* content */}
      <div>
        <p className="text-lg font-medium capitalize mb-2">Upload New Video</p>
        <div className="border-2 border-secondaryShade border-dashed rounded-xl w-full">
          <Dragger {...draggerProps} className="">
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="!text-secondaryShade" />
            </p>
            <p className="ant-upload-text">
              Click or drag video to this area to upload
            </p>
          </Dragger>
        </div>
      </div>

      <button
        type="button"
        className="mt-2 ml-auto px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade border border-secondaryShade hover:bg-transparent hover:text-secondaryShade transition-colors duration-300"
      >
        <p className="uppercase font-medium">Submit</p>
      </button>
    </div>
  );
};

export default ContactSection;
