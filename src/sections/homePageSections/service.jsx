"use client";
import GradientText from "@/assist/text2";
import { Container } from "@/components/container";

export default function Service() {
  const cardData = [
    {
      title: "Field Team Management",
      description:
        "Recruiting, training, and supervising field researchers to ensure high-quality data collection",
      icon: "/image/s2.svg",
    },

    {
      title: "Qualitative Research Execution",
      description:
        "Focus groups, in-depth interviews, and usability studies with professional facilitation",
      icon: "/image/s3.svg",
    },
    {
      title: "Reporting & Data Delivery",
      description:
        "Timely, actionable reports delivered to support effective decision-making",
      icon: "/image/s4.svg",
    },
  ];
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-20">
      <Container>
        <div className="flex flex-col w-full items-center justify-center gap-16">
          <div className="w-full flex flex-wrap items-center justify-center lg:justify-between gap-10">
            <div className="flex flex-col h-full items-center lg:items-start justify-center gap-5 max-w-xl text-center lg:text-left">
              <h2 className="flex flex-wrap justify-center lg:justify-start text-3xl md:text-5xl z-40 items-center text-[#1D1E20] gap-x-2">
                Explore Our
                <GradientText
                  colors={["#008867", "#FFD6D6", "#008867"]}
                  animationSpeed={8}
                  direction="horizontal"
                  pauseOnHover={false}
                  yoyo={true}
                  className="text-3xl md:text-5xl font-bold z-40 px-2 py-1 bg-transparent"
                >
                  Services
                </GradientText>
              </h2>
              <p className="text-[#31373D] z-40 text-base md:text-[18px] leading-relaxed">
                Data analysis software is a type of software tool used for data
                analysis and reporting. It is designed to help businesses,
                organizations.
              </p>
            </div>
            {/* card */}

            <div className="group z-10 flex flex-col items-start justify-between gap-4 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#008867]/20 w-full max-w-sm min-h-[280px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#effaf6] transition-all duration-300 group-hover:bg-[#008867] group-hover:scale-110">
                <img
                  src="/image/s1.svg"
                  alt="service"
                  className="h-8 w-8 transition-all duration-300 group-hover:invert group-hover:brightness-0"
                />
              </div>

              <div className="flex w-full flex-col gap-3 text-left">
                <h1 className="text-2xl font-bold text-[#1D1E20] transition-colors duration-300 group-hover:text-[#008867]">
                  Field Data Collection
                </h1>
                <p className="text-[#51575D] text-[16px] leading-relaxed">
                  Executing accurate surveys and interviews across multiple
                  locations with strict quality control.
                </p>
              </div>
            </div>
          </div>

          {/* cards */}
          <div className="w-full flex flex-wrap md:flex-nowrap gap-5 items-stretch justify-center">
            {cardData.map((service, index) => (
              <div
                key={index}
                className="group flex z-10 flex-col items-start justify-between gap-1 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#008867]/20 w-full max-w-sm min-h-[280px]"
              >
                <div className="flex items-start gap-10 flex-col">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#effaf6] transition-all duration-300 group-hover:bg-[#008867] group-hover:scale-110">
                    <img
                      src={service.icon}
                      alt="service"
                      className="h-8 w-8 transition-all duration-300 group-hover:invert group-hover:brightness-0"
                    />
                  </div>

                  <h1 className="text-2xl font-bold text-[#1D1E20] transition-colors duration-300 group-hover:text-[#008867]">
                    {service.title}
                  </h1>
                </div>
                <div className="flex w-full flex-col">
                  <p className="text-[#51575D] text-[16px] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}

            {/* 
            <div className="group flex flex-col items-start justify-between gap-4 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#008867]/20 w-full max-w-sm min-h-[280px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#effaf6] transition-all duration-300 group-hover:bg-[#008867] group-hover:scale-110">
                <img
                  src="/image/s1.svg"
                  alt="service"
                  className="h-8 w-8 transition-all duration-300 group-hover:invert group-hover:brightness-0"
                />
              </div>

              <div className="flex w-full flex-col gap-3">
                <h1 className="text-2xl font-bold text-[#1D1E20] transition-colors duration-300 group-hover:text-[#008867]">
                  Field Data Collection
                </h1>
                <p className="text-[#51575D] text-[16px] leading-relaxed">
                  Executing accurate surveys and interviews across multiple
                  locations with strict quality control.
                </p>
              </div>
            </div>

            <div className="group flex flex-col items-start justify-between gap-4 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#008867]/20 w-full max-w-sm min-h-[280px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#effaf6] transition-all duration-300 group-hover:bg-[#008867] group-hover:scale-110">
                <img
                  src="/image/s1.svg"
                  alt="service"
                  className="h-8 w-8 transition-all duration-300 group-hover:invert group-hover:brightness-0"
                />
              </div>

              <div className="flex w-full flex-col gap-3">
                <h1 className="text-2xl font-bold text-[#1D1E20] transition-colors duration-300 group-hover:text-[#008867]">
                  Field Data Collection
                </h1>
                <p className="text-[#51575D] text-[16px] leading-relaxed">
                  Executing accurate surveys and interviews across multiple
                  locations with strict quality control.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
