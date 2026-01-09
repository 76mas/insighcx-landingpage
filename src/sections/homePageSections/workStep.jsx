"use client";

import GradientText from "@/assist/text2";
import { Container } from "@/components/container";

export default function WorkStep() {
  const Steps = [
    {
      title: "Project Alignment",
      icon: "I",
      description:
        "We align with the client’s objectives, methodology, and timelines to fully understand the scope of execution.",
    },
    {
      title: "Field Preparation",
      icon: "II",
      description:
        "We recruit, train, and brief qualified field researchers, ensuring strict quality and ethical standards.",
    },
    {
      title: "Field Execution",
      icon: "III",
      description:
        "Data is collected through surveys, interviews, focus groups, or observations with real-time supervision.",
    },
    {
      title: "Reporting & Delivery",
      icon: "IV",
      description:
        "Clean, structured data and clear reports are delivered on time, ready for analysis and decision-making.",
    },
  ];

  return (
    <section className="w-full relative z-0 min-h-screen flex items-center justify-center py-12 lg:py-20 ">
      <div className="absolute -bottom-[40%] -left-[20%] w-[950px] h-[950px] rounded-full bg-[#ffd6d6ad] blur-[120px] opacity-50 pointer-events-none -z-10" />

      <Container>
        <div className="flex flex-col lg:flex-row justify-center w-full items-start gap-10 lg:gap-20">
          {/* left side */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 justify-center">
            <p className="text-[#1D1E20] font-bold p-1 text-center text-[11.5px] px-2 text-uppercase rounded-full bg-[#F5F5F5]">
              HOW IT WORKS
            </p>
            <div className="flex flex-col text-start items-start ">
              <h2 className="text-[#1D1E20] text-start text-3xl md:text-[44px] font-bold">
                We follow a clear{" "}
              </h2>
              <GradientText
                colors={["#008867", "#FFD6D6", "#008867"]}
                animationSpeed={8}
                direction="horizontal"
                pauseOnHover={false}
                yoyo={true}
                className="text-3xl md:text-5xl text-start font-bold z-40 bg-transparent"
              >
                4 steps
              </GradientText>
            </div>

            <p className="text-[##0C0E0F] text-[16px]">
              execution-focused approach to ensure accuracy, efficiency, and
              reliability in every field research project:
            </p>
          </div>

          {/* right side */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
            <div className="flex flex-col items-center justify-center gap-7">
              {Steps.map((step, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col bg-white hover:bg-[#F5F5F5] transition-all duration-300 rounded-2xl p-6 items-start justify-center gap-2 shadow-sm`}
                  >
                    <div className="flex items-center justify-start gap-2">
                      <div className="w-[30px] fontcange h-[30px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#008867] to-[#9bebd7]  text-white">
                        {step.icon}
                      </div>

                      <h1 className="text-[#1D1E20]  text-start text-xl md:text-[24px] font-bold">
                        {step.title}
                      </h1>
                    </div>
                    <p className="text-[#1D1E20] text-start text-[16px]">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
