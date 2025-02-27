"use client";
import { Link, usePathname } from "@/i18n/routing";
import { useAppSelector } from "@/redux/store";
import {
  FileOutlined,
  FolderOutlined,
  HomeOutlined,
  IdcardOutlined,
  LogoutOutlined,
  PhoneOutlined,
  QuestionOutlined,
  ReadOutlined,
  RotateLeftOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Menu, Tooltip } from "antd";
import React, { JSX, useEffect, useState } from "react";
import { useGetAllPagesQuery } from "@/redux/api/pageApiSlice";
import { Page } from "@/utils/interfaces";
import { useLocale } from "next-intl";
import { useLogoutMutation } from "@/redux/api/authApiSlice";

type Props = {};

const getIcon = (slug: string): JSX.Element => {
  switch (slug) {
    case "home":
      return <HomeOutlined />;
    case "about":
      return <IdcardOutlined />;
    case "projects":
      return <FolderOutlined />;
    case "360":
      return <RotateLeftOutlined />;
    case "blog":
      return <ReadOutlined />;
    case "faq":
      return <QuestionOutlined />;
    case "communication":
      return <PhoneOutlined className="rotate-180" />;
    default:
      return <HomeOutlined />;
  }
};

type MenuItem = {
  key: string;
  label: string;
  icon?: JSX.Element;
  link?: string;
  items?: MenuItem[];
};

const menuItems = [
  {
    key: "home",
    label: "Home",
    icon: <HomeOutlined />,
    link: "/dashboard",
  },
  {
    key: "about",
    label: "About",
    icon: <IdcardOutlined />,
    items: [
      {
        key: "about-who",
        label: "Who Are We",
        link: "/dashboard/about/who-are-we",
      },
      { key: "about-news", label: "News", link: "/dashboard/about/news" },
    ],
  },
  {
    key: "projects",
    label: "Projects",
    icon: <FolderOutlined />,
    items: [
      {
        key: "projects-green-and-blue",
        label: "Green And Blue",
        link: "/dashboard/projects/green-and-blue",
      },
      {
        key: "projects-yalusa-homes",
        label: "Yalusa Homes",
        link: "/dashboard/projects/yalusa-homes",
      },
      {
        key: "projects-aquamarine",
        label: "Aquamarine Bosphorus Mansion",
        link: "/dashboard/projects/aquamarine",
      },
    ],
  },
  {
    key: "360",
    label: "360",
    icon: <RotateLeftOutlined />,
    items: [
      {
        key: "360-green-and-blue",
        label: "Green And Blue",
        link: "/dashboard/360/green-and-blue",
      },
      {
        key: "360-yalusa-homes",
        label: "Yalusa Homes",
        link: "/dashboard/360/yalusa-homes",
      },
      {
        key: "360-aquamarine",
        label: "Aquamarine Bosphorus Mansion",
        link: "/dashboard/360/aquamarine",
      },
    ],
  },
  {
    key: "blog",
    label: "Blog",
    icon: <ReadOutlined />,
    items: [
      {
        key: "north-cyprus-about",
        label: "About Northern Cyprus",
        link: "/dashboard/blog/north-cyprus-about",
      },
      {
        key: "secret-paradise",
        label: "The Hidden Paradise of Northern Cyprus:Karpaz Peninsula",
        link: "/dashboard/blog/secret-paradise",
      },
      {
        key: "buying-guide",
        label:
          "Real Estate Buying Guide in Northern Cyprus:Investment and Living Opportunities",
        link: "/dashboard/blog/buying-guide",
      },
      {
        key: "investment-opportunities",
        label:
          "Investment Opportunities in Northern Cyprus:The Shining Future of the Sunny Island",
        link: "/dashboard/blog/investment-opportunities",
      },
    ],
  },
  {
    key: "faq",
    label: "FAQ",
    icon: <QuestionOutlined />,
    link: "/dashboard/faq",
  },
  {
    key: "communication",
    label: "Communication",
    icon: <PhoneOutlined className="rotate-180" />,
    link: "/dashboard/communication",
  },
];

const Sidebar = (props: Props) => {
  const { isNavCollapsed } = useAppSelector((state) => state.sidebar);
  const [activeTopKey, setActiveTopKey] = useState("/");
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [activeSubKey, setActiveSubKey] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = useLocale() as "en" | "ru" | "tr";
  const [
    logoutFn,
    {
      isError: logoutIsError,
      isLoading: logoutIsLoading,
      isSuccess: logoutIsSuccess,
      error: logoutError,
      data: logoutData,
    },
  ] = useLogoutMutation(undefined);

  const {
    data: getAllPagesData,
    isError: getAllPagesIsError,
    isLoading: getAllPagesIsLoading,
    isSuccess: getAllPagesIsSuccess,
    error: getAllPagesError,
  } = useGetAllPagesQuery(undefined);

  // console.log("getAllPagesData -->", getAllPagesData);
  // console.log("activeSubKey", activeSubKey);
  // console.log("activeTopKey", activeTopKey);

  const mapPagesToMenuItems = (pages: Page[]): MenuItem[] => {
    return pages?.map((page) => {
      const menuItem: MenuItem = {
        key: page.slug,
        label: page.title[locale], // Assuming English as the default label
        icon: getIcon(page.slug),
      };

      // If the page has subPages, we process them into nested items
      if (page.subPages.length > 0 && page.slug !== "blog") {
        menuItem.items = page.subPages.map((subPage) => ({
          key: subPage.slug,
          label: subPage.title[locale], // Assuming English as the default label
          link: `/dashboard/${page.slug}/${subPage.slug}`,
        }));
      } else {
        menuItem.link = `/dashboard/${page.slug}`;
      }

      return menuItem;
    });
  };

  // Render menu items recursively
  const renderMenuItems = (items: any) =>
    items?.map((item: any) => {
      if (item.items) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: renderMenuItems(item.items),
        };
      }

      return {
        key: item.key,
        icon: item.icon,
        label: item.link ? (
          <Link href={item.link}>{item.label}</Link>
        ) : (
          item.label
        ),
      };
    });

  // Handle submenu open change
  const handleOpenChange = (keys: string[]) => {
    // Ensure only one menu is open at a time
    if (keys.length > 1) {
      setOpenKeys([keys[keys.length - 1]]);
    } else {
      setOpenKeys(keys);
    }
  };

  useEffect(() => {
    // Find active top-level menu item
    const activeMenuItem = mapPagesToMenuItems(getAllPagesData).find((item) => {
      if (item.link) return pathname === item.link;
      return item.items?.some((subItem) => pathname === subItem.link);
    });

    // Extract submenu key if applicable
    const activeSubItem = activeMenuItem?.items?.find(
      (subItem) => subItem.link === pathname
    );

    setActiveTopKey(activeMenuItem?.key || "");
    setActiveSubKey(activeSubItem?.key || null);
    setOpenKeys(activeSubItem ? [activeMenuItem?.key as string] : []);
  }, [pathname]);

  return (
    <div
      className={`bg-white dark:bg-[#1e293b] absolute top-[80px] md:top-0 left-0 h-[calc(100dvh-80px)] md:h-[calc(100dvh-80px)] transition-all duration-500 ease-in-out z-20
        ${
          isNavCollapsed
            ? "-translate-x-full md:w-[70px] md:translate-x-0"
            : "translate-x-0 md:w-[200px]"
        }
        md:relative md:translate-x-0 w-[200px] text-black flex flex-col`}
    >
      <div className="flex-1 flex flex-col my-4 overflow-x-hidden overflow-y-auto">
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                borderRadiusLG: 0,
                itemHoverBg: "#ef4444",
                itemSelectedBg: "#ef4444",
                itemHoverColor: "white",
                itemSelectedColor: "white",
                subMenuItemSelectedColor: "#ef4444",
                subMenuItemBg: "#e5e7eb",
                itemHeight: 60,
              },
            },
          }}
        >
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={isNavCollapsed}
            className="text-base !bg-white dark:!bg-[#1e293b]"
            items={renderMenuItems(mapPagesToMenuItems(getAllPagesData))}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            selectedKeys={activeSubKey ? [activeSubKey] : [activeTopKey]}
          />
        </ConfigProvider>
      </div>

      <Tooltip title="logout">
        <button
          type="button"
          className="mx-auto mb-2 px-6 py-2 w-[95%] rounded-md text-white cursor-pointer flex items-center justify-center gap-2 bg-red-500 transition duration-300"
          onClick={() => logoutFn(undefined)}
        >
          <LogoutOutlined />
          <p
            className={`${
              isNavCollapsed
                ? "w-0 md:w-0 opacity-0 invisible"
                : "visible opacity-100"
            } uppercase font-medium transition-all duration-300`}
          >
            Logout
          </p>
        </button>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
