import Blog from "@/sections/homePageSections/blog";
import Bottom from "@/sections/homePageSections/buttom";
import Hero from "@/sections/homePageSections/hero";
import Service from "@/sections/homePageSections/service";
import WorkStep from "@/sections/homePageSections/workStep";

export default function Home() {
  return (
    <div className="flex relative pt-[80px] md:pt-0 overflow-x-hidden min-h-screen items-center flex-col justify-center bg-[#fefefe] font-sans ">
      <Hero />
      <Service />
      <WorkStep />
      <Blog />
      <Bottom />
    </div>
  );
}
