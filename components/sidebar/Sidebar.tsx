"use client";
import { Link } from "@/i18n/routing";
import { useAppSelector } from "@/redux/store";
import {
  HomeOutlined,
  IdcardOutlined,
  PhoneOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faQuestion, faTty } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfigProvider, Menu } from "antd";
import React, { useState } from "react";

type Props = {};

const sidebarOptions = [
  {
    icon: faHouse,
    label: "Home",
    to: "/",
  },
  {
    icon: faQuestion,
    label: "FAQ",
    to: "/faq",
  },
  {
    icon: faTty,
    label: "Communication",
    to: "/communication",
  },
];

const menuItems = [
  {
    key: "home",
    label: "Home",
    icon: <HomeOutlined />,
    link: "/",
  },
  {
    key: "faq",
    label: "FAQ",
    icon: <QuestionOutlined />,
    link: "/faq",
  },
  {
    key: "communication",
    label: "Communication",
    icon: <PhoneOutlined />,
    link: "/communication",
  },
  {
    key: "about",
    label: "About",
    icon: <IdcardOutlined />,
    children: [
      { key: "about-who", label: "Who Are We", link: "/who-are-you" },
      { key: "about-news", label: "News", link: "/news" },
      { key: "open-position", label: "Position", link: "/open-positions" },
    ],
  },
];

const Sidebar = (props: Props) => {
  const { isNavCollapsed } = useAppSelector((state) => state.sidebar);
  const [activeSidebar, setIsActiveSidebar] = useState("");

  // Render menu items recursively
  const renderMenuItems = (items: any) =>
    items.map((item: any) => {
      if (item.children) {
        return (
          <Menu.SubMenu
            key={item.key}
            icon={item.icon}
            title={!isNavCollapsed && item.label}
          >
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={item.key} icon={item.icon || <></>}>
          {item.link ? (
            <Link href={item.link}>{item.label}</Link>
          ) : (
            <p>{item.label}</p>
          )}
        </Menu.Item>
      );
    });

  return (
    <div
      className={`bg-white absolute top-[80px] md:top-0 left-0 h-[calc(100dvh-80px)] md:h-[calc(100dvh-80px)] transition-all duration-500 ease-in-out z-20
        ${
          isNavCollapsed
            ? "-translate-x-full md:w-[70px] md:translate-x-0"
            : "translate-x-0 md:w-[200px]"
        }
        md:relative md:translate-x-0 w-[200px] text-black flex flex-col`}
    >
      <div className="flex-1 flex flex-col my-4 overflow-x-hidden overflow-y-auto shadow-shadow-1">
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                borderRadiusLG: 0,
                controlHeightLG: 60,
                itemHoverBg: "#ef4444",
                itemSelectedBg: "#ef4444",
                itemHoverColor: "white",
                itemSelectedColor: "white",
                subMenuItemSelectedColor: "#ef4444",
              },
            },
          }}
        >
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={isNavCollapsed}
            className="text-base"
          >
            {renderMenuItems(menuItems)}
          </Menu>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Sidebar;
