import { Container } from "@/components/container";
import Header from "@/components/header";
import Hero from "@/sections/homePageSections/hero";
import Service from "@/sections/homePageSections/service";
import WorkStep from "@/sections/homePageSections/workStep";

export default function Home() {
  return (
    <div className="flex relative pt-[80px] md:pt-[0px] overflow-x-hidden min-h-screen items-center flex-col justify-center bg-[#fefefe] font-sans ">
      <Header />
      <Hero />
      <Service />
      <WorkStep />
    </div>
  );
}
