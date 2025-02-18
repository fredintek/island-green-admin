import React from "react";
import { Upload, UploadProps } from "antd";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";

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
    <div className="p-6 bg-white dark:bg-[#1e293b] shadow-md rounded-md">
      <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
        Contact Section
      </p>

      {/* content */}
      <div className="">
        <div className="bg-white dark:bg-[#1e293b] max-w-[300px] w-full aspect-video p-1 flex flex-col gap-2">
          <p className="text-lg text-black dark:text-gray-300 font-medium capitalize">
            Existing Video
          </p>
          <DeleteOutlined className="text-base self-end cursor-pointer text-red-500" />
          <div className="bg-red-500 w-full h-full rounded-md">
            <video
              className="w-full block h-full object-cover rounded-md"
              autoPlay
              loop
              muted
              preload="none"
              playsInline
            >
              <source
                src="https://islandgreenconstruction.com/templates/igcnew/assets/popupvid.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-lg text-black dark:text-gray-300 font-medium capitalize mb-2">
            Upload New Video
          </p>
          <div className="border-2 border-secondaryShade dark:border-primaryShade border-dashed rounded-xl w-full">
            <Dragger {...draggerProps} className="">
              <p className="ant-upload-drag-icon">
                <InboxOutlined className="!text-secondaryShade dark:!text-primaryShade" />
              </p>
              <p className="ant-upload-text !text-black dark:!text-gray-300">
                Click or drag video to this area to upload
              </p>
            </Dragger>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-2 ml-auto px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
      >
        <p className="uppercase font-medium">Submit</p>
      </button>
    </div>
  );
};

export default ContactSection;
