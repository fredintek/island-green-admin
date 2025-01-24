"use client";
import { useAppSelector } from "@/redux/store";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const { isNavCollapsed } = useAppSelector((state) => state.sidebar);
  return (
    <div
      className={`bg-white fixed top-[80px] md:top-0 left-0 h-full md:min-h-[calc(100dvh-80px)] transition-all duration-500 ease-in-out z-20
        ${
          isNavCollapsed
            ? "-translate-x-full md:w-[70px] md:translate-x-0"
            : "translate-x-0 md:w-[200px]"
        }
        md:relative md:translate-x-0 w-[200px] text-black flex flex-col`}
    >
      <div className="border flex-1 flex flex-col my-4"></div>
    </div>
  );
};

export default Sidebar;
