"use client";
import ProjectsSection from "@/components/home/ProjectsSection";
import UploadSection from "@/components/home/UploadSection";

export default function Home() {
  return (
    <section className="flex flex-col gap-10">
      {/* hero section */}
      <UploadSection />

      {/* projects section */}
      <ProjectsSection />

      {/* reasons section */}

      {/* contact section */}
    </section>
  );
}
