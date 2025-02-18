"use client";
import { Link, usePathname } from "@/i18n/routing";
import { useAppSelector } from "@/redux/store";
import {
  FolderOutlined,
  HomeOutlined,
  IdcardOutlined,
  PhoneOutlined,
  QuestionOutlined,
  ReadOutlined,
  RotateLeftOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { ConfigProvider, Menu } from "antd";
import React, { useEffect, useState } from "react";

type Props = {};

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
      // {
      //   key: "open-position",
      //   label: "Position",
      //   link: "/about/open-positions",
      // },
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

  // Render menu items recursively
  const renderMenuItems = (items: any) =>
    items.map((item: any) => {
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
    const activeMenuItem = menuItems.find((item) => {
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
            items={renderMenuItems(menuItems)}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            selectedKeys={activeSubKey ? [activeSubKey] : [activeTopKey]}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Sidebar;
