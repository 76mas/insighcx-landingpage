"use client";
import GradientText from "@/assist/text2";
import { Container } from "@/components/container";

export default function WhyChoose() {
  const points = [
    "Specialization in field research execution",
    "Accurate, reliable, and timely data collection",
    "Professional management of field teams",
    "Proven track record with high-profile projects",
  ];

  return (
    <section className="w-full flex items-center justify-center   bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-4xl z-10 md:text-[50px] font-bold text-[#1D1E20] leading-tight">
                Why Choose
              </h2>
              {/* <span className="text-4xl z-10 md:text-[50px] font-bold text-[#008867] leading-tight">
                insightx
              </span> */}
                 <GradientText
                                colors={["#008867", "#FFD6D6", "#008867"]}
                                animationSpeed={8}
                                direction="horizontal"
                                pauseOnHover={false}
                                yoyo={true}
                                className="text-3xl md:text-5xl font-bold z-40 px-2 py-1 bg-transparent"
                              >
                                insightx
                              </GradientText>
            </div>

            <div className="flex flex-col gap-6 z-10">
              {points.map((point, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 z-10 w-8 h-8 rounded-full bg-[#52C59F] flex items-center justify-center">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3333 1L5 8.33333L1.66667 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-[#31373D] text-lg z-10 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative rounded-[32px] overflow-hidden">
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <img
                src="/image/service.png"
                alt="Why Choose Us"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
