"use client";
import { useAppSelector } from "@/redux/store";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const { isNavCollapsed } = useAppSelector((state) => state.sidebar);
  return (
    <div
      className={`border ${
        isNavCollapsed ? "w-[70px]" : "w-[200px]"
      } transition-all duration-500 ease-in-out`}
    >
      <p>SIDEBAR</p>
    </div>
  );
};

export default Sidebar;
