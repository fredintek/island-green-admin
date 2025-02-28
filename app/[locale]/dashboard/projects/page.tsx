"use client";
import { Link, useRouter } from "@/i18n/routing";
import { useGetPageBySlugQuery } from "@/redux/api/pageApiSlice";
import { Page } from "@/utils/interfaces";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Popconfirm, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useLocale } from "next-intl";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const locale = useLocale();
  const {
    data: getAllPageBySlugData,
    isLoading: getAllPageBySlugIsLoading,
    isError: getAllPageBySlugIsError,
    error: getAllPageBySlugError,
    refetch: getAllPageBySlugRefetch,
  } = useGetPageBySlugQuery("projects", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const projectColumn: ColumnsType<Partial<Page>> = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text, record) => text[locale],
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Partial<Page>) => (
        <div className="flex items-center gap-4 text-lg text-gray-500">
          <button type="button" className="cursor-pointer">
            <Tooltip>
              <EditOutlined />
            </Tooltip>
          </button>
          <button type="button" className="cursor-pointer">
            <Popconfirm title="Are you sure you want to delete this project?">
              <DeleteOutlined />
            </Popconfirm>
          </button>
        </div>
      ),
    },
  ];

  console.log("getAllPageBySlugData", getAllPageBySlugData);
  return (
    <section className="flex flex-col gap-10">
      <div className="p-6 bg-white dark:bg-[#1e293b] shadow-md rounded-md">
        <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
          Project Section
        </p>

        <Link href={`projects/add-project`}>
          <button
            type="button"
            className="mb-4 px-6 py-2 rounded-md text-white cursor-pointer flex gap-2 items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
          >
            <PlusOutlined className="text-lg" />
            <p className="uppercase font-medium text-sm">Add Page</p>
          </button>
          <Table
            columns={projectColumn}
            dataSource={getAllPageBySlugData?.subPages || []}
            scroll={{ x: 768 }}
            className=""
          />
        </Link>
      </div>
    </section>
  );
};

export default page;
