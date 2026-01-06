import HeroService from "@/sections/servicesPageSections/heroservice";
import WhyChoose from "@/sections/servicesPageSections/whyChooeSections";
import SectorWork from "@/sections/servicesPageSections/sectorWork";
import Bottom from "@/sections/homePageSections/buttom";
export default function Services() {
  return (
    <div className="flex relative pt-[80px] md:pt-[0px] overflow-hidden min-h-screen items-center flex-col justify-center bg-[#fefefe] font-sans ">
      <HeroService />
      <WhyChoose />
      <SectorWork />
      <Bottom />
    </div>
  );
}
