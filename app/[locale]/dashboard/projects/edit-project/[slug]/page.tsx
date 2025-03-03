"use client";
import {
  useGetPageBySlugQuery,
  useLazyGetPageBySlugQuery,
} from "@/redux/api/pageApiSlice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const params = useParams() as { locale: string; slug: string };
  console.log("params", params);

  const [
    getPageBySlugFn,
    {
      data: getAllPageBySlugData,
      isLoading: getAllPageBySlugIsLoading,
      isError: getAllPageBySlugIsError,
      error: getAllPageBySlugError,
    },
  ] = useLazyGetPageBySlugQuery();

  useEffect(() => {
    if (params?.slug) {
      getPageBySlugFn(params.slug);
    }
  }, [params?.slug]);
  return (
    <section className="flex flex-col">
      <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
        Edit Project
      </p>

      {/*  */}
    </section>
  );
};

export default page;
