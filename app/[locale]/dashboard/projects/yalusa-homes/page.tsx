import DisplayContent from "@/components/projects/DisplayContent";
import Location from "@/components/projects/Location";
import ProductLink from "@/components/projects/ProductLink";
import ProjectHouses from "@/components/projects/ProjectHouses";
import VideoLinks from "@/components/projects/VideoLinks";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="flex flex-col gap-10">
      {/* product link section */}
      <ProductLink />

      {/* display content */}
      <DisplayContent />

      {/* project houses */}
      <ProjectHouses />

      {/* Video section */}
      <VideoLinks />

      {/* Location section */}
      <Location />
    </section>
  );
};

export default page;
