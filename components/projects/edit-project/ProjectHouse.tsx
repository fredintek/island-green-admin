import { Page } from "@/utils/interfaces";
import React from "react";

type Props = {
  pageData?: Partial<Page>;
  refetchEditedData?: any;
};

const ProjectHouse = ({ pageData, refetchEditedData }: Props) => {
  return (
    <div>
      <p>ProjectHouse</p>
    </div>
  );
};

export default ProjectHouse;
