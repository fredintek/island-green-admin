"use client";
import React, { useEffect, useState } from "react";
import { Upload, UploadProps, message } from "antd";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/lib/cloudinaryUpload";
import { toast } from "react-toastify";
import {
  useCreateSectionMutation,
  useGetSectionQuery,
  useRemoveLinkFromSectionContentMutation,
} from "@/redux/api/sectionApiSlice";
import { useDeleteFileFromCloudinaryMutation } from "@/redux/api/cloudinaryApiSlice";

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
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log("INFO FILE:uploading", info.file, info.fileList);
        setHeroFileList(info.fileList);
      }
    },
    listType: "picture-card",
  };
  const [heroFileList, setHeroFileList] = useState<any>([]);
  const [uploadImageLoading, setUploadImageLoading] = useState<boolean>(false);
  const [deleteImageLoading, setDeleteImageLoading] = useState<boolean>(false);

  const [
    createSectionFn,
    {
      isError: createSectionIsError,
      isLoading: createSectionIsLoading,
      isSuccess: createSectionIsSuccess,
      error: createSectionError,
      data: createSectionData,
    },
  ] = useCreateSectionMutation();

  const {
    data: getSectionData,
    isLoading: getSectionIsLoading,
    isError: getSectionIsError,
    error: getSectionError,
    refetch: getSectionRefetch,
  } = useGetSectionQuery(14, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  console.log("getSectionData", getSectionData);

  const [
    removeLinkFn,
    {
      isError: removeLinkIsError,
      isLoading: removeLinkIsLoading,
      isSuccess: removeLinkIsSuccess,
      error: removeLinkError,
      data: removeLinkData,
    },
  ] = useRemoveLinkFromSectionContentMutation();

  const [
    deleteFileFromCloudinaryFn,
    {
      isError: deleteFileFromCloudinaryIsError,
      isLoading: deleteFileFromCloudinaryIsLoading,
      isSuccess: deleteFileFromCloudinaryIsSuccess,
      error: deleteFileFromCloudinaryError,
      data: deleteFileFromCloudinaryData,
    },
  ] = useDeleteFileFromCloudinaryMutation();

  const handleDeleteImage = async (publicId: string) => {
    console.log("PUBLIC_ID", publicId);
    try {
      // await deleteFromCloudinary(publicId, setDeleteImageLoading);
      deleteFileFromCloudinaryFn({ publicId });
      removeLinkFn({
        sectionId: 14,
        link: publicId,
      });
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handleSubmit = async () => {
    const imagesToUpload = heroFileList?.map(
      (fileObj: any) => fileObj.originFileObj
    );

    try {
      const uploadedImages = await uploadToCloudinary(
        imagesToUpload,
        setUploadImageLoading
      );
      console.log(uploadedImages);
      setHeroFileList([]);

      const data = {
        page: 15,
        type: "hero",
        sortId: 0,
        content: uploadedImages,
      };

      createSectionFn(data);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  useEffect(() => {
    if (createSectionIsSuccess) {
      toast.success(createSectionData.message);
    }

    if (createSectionIsError) {
      const customError = createSectionError as { data: any; status: number };
      toast.error(customError.data.message);
    }
  }, [
    createSectionIsSuccess,
    createSectionIsError,
    createSectionError,
    createSectionData,
  ]);

  useEffect(() => {
    if (removeLinkIsSuccess) {
      toast.success(removeLinkData.message);
    }

    if (removeLinkIsError) {
      const customError = removeLinkError as { data: any; status: number };
      toast.error(customError.data.message);
    }
  }, [removeLinkIsSuccess, removeLinkIsError, removeLinkError, removeLinkData]);

  return (
    <div className="flex flex-col p-6 bg-white dark:bg-[#1e293b] shadow-md rounded-md">
      <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-2">
        Hero Section
      </p>
      <div className="flex flex-col gap-6">
        {/* default hero images */}
        {(defaultImages?.length as number) > 0 && (
          <div>
            <p className="text-lg text-black dark:text-gray-300 font-medium capitalize mb-2">
              Existing Hero Images
            </p>
            <div className="grid grid-cols-fluid gap-4">
              {getSectionData?.data?.content
                ?.filter((item: any) => item.publicId)
                ?.map((obj: { publicId: string; url: string }) => (
                  <div
                    key={obj.publicId}
                    className="relative w-full aspect-video rounded-md overflow-hidden"
                  >
                    <img
                      src={obj.url}
                      alt="default-image"
                      className="w-full h-full object-cover"
                    />
                    {getSectionData?.data?.content?.length > 1 && (
                      <DeleteOutlined
                        onClick={() => handleDeleteImage(obj.publicId)}
                        className="text-red-500 text-lg absolute top-2 right-2 cursor-pointer"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* upload new hero images */}
        <div>
          <p className="text-lg text-black dark:text-gray-300 font-medium capitalize mb-2">
            Upload New Hero images
          </p>
          <div className="border-2 border-secondaryShade dark:border-primaryShade border-dashed rounded-xl w-full">
            <Dragger fileList={heroFileList} {...draggerProps} className="">
              <p className="ant-upload-drag-icon">
                <InboxOutlined className="!text-secondaryShade dark:!text-primaryShade" />
              </p>
              <p className="ant-upload-text !text-black dark:!text-gray-300">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint !text-black dark:!text-gray-300">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          type="button"
          className="ml-auto px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
          disabled={
            uploadImageLoading || createSectionIsLoading || deleteImageLoading
          }
        >
          {uploadImageLoading ||
          createSectionIsLoading ||
          deleteImageLoading ? (
            <div className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5"></div> // Spinner
          ) : (
            <p className="uppercase font-medium">Submit</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadSection;
