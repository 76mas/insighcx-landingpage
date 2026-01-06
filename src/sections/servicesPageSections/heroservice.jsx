"use client";
import { Container } from "@/components/container";
import { motion } from "motion/react";
import SplitText from "@/assist/text";

export default function HeroService() {
  const services = [
    {
      title: "Focus Groups",
      description:
        "Executes professionally moderated focus group discussions designed to capture in-depth opinions, attitudes, and perceptions. We manage participant recruitment, venue setup, moderation support, logistics, and quality monitoring to ensure productive discussions and reliable qualitative outputs.",
      bg: "bg-[#FFEBF0]", // Pinkish
    },
    {
      title: "In-Depth Interviews",
      description:
        "We conduct structured and semi-structured one-on-one interviews with carefully screened respondents. Interviews can be delivered face-to-face or remotely, ensuring flexibility while maintaining consistency, confidentiality, and data integrity throughout the fieldwork process.",
      bg: "bg-[#FFFCEC]", // Cream/Yellowish
    },
    {
      title: "CAWI",
      description:
        "We conduct structured and semi-structured one-on-one interviews with carefully screened respondents. Interviews can be delivered face-to-face or remotely, ensuring flexibility while maintaining consistency, confidentiality, and data integrity throughout the fieldwork process.",
      bg: "bg-[#F0FDF4]", // Light Greenish
    },
    {
      title: "CAPI",
      description:
        "We deliver face-to-face digital interviews using trained field researchers and secure data collection tools. Our teams operate under strict supervision, ensuring accurate responses, real-time validation, and adherence to project protocols across all locations.",
      bg: "bg-[#EAF8FF]", // Light Blue
    },
    {
      title: "Field Team Management",
      description:
        "Recruits, trains, and supervises qualified field researchers tailored to each project's requirements. We ensure field teams follow standardized procedures, ethical guidelines, and quality benchmarks to maintain consistent execution standards.",
      bg: "bg-[#FFF5EB]", // Light Orange
    },
    {
      title: "Field Data Collection",
      description:
        "We execute accurate surveys and interviews across multiple regions, managing logistics, scheduling, and real-time supervision. Continuous monitoring and back-checks are applied to guarantee data accuracy and reliability.",
      bg: "bg-[#F3F0FF]", // Light Purple
    },
    {
      title: "Reporting & Delivery",
      description:
        "Delivers timely, structured, and actionable reports aligned with client requirements. Data is cleaned, validated, and presented in clear formats, ready for analysis and decision-making.",
      bg: "bg-[#F7FEE7]", // Light Lime
    },
    {
      title: "Execution Philosophy",
      description:
        "Focuses exclusively on execution excellence—supporting research agencies and organizations with dependable fieldwork, efficient processes, and budget-conscious solutions.",
      bg: "bg-[#FFEBEB]", // Light Red
    },
  ];

  return (
    <section className="w-full relative z-0 h-full min-h-screen py-30  flex items-center justify-center">
      <div className="absolute -top-[40%] -right-[20%] w-[950px] h-[950px] rounded-full bg-[#FFD6D6] blur-[120px] opacity-50 pointer-events-none -z-10" />
      <div className="absolute -bottom-[40%] -right-[20%] w-[950px] h-[950px] rounded-full bg-green-100 blur-[120px] opacity-50 pointer-events-none -z-10" />
      <div className="absolute -top-[40%] -left-[20%] w-[950px] h-[950px] rounded-full bg-green-100 blur-[120px] opacity-50 pointer-events-none -z-10" />

      {/* Note: Added a light background tint to the section to match the feel, adjust opacity as needed */}
      <Container>
        <div className="flex flex-col items-center justify-center gap-12 w-full">
          {/* Header */}
          <div className="flex flex-col items-center justify-center gap-4 max-w-2xl text-center">
            <SplitText
              text={"Our Services"}
              className="text-[#1D1E20] text-4xl md:text-[50px] font-bold"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: "easeOut",
              }}
              className="text-[#31373D] text-base md:text-lg leading-relaxed"
            >
              InsightX specializes in professional field research execution,
              delivering accurate data through reliable and cost-efficient
              methodologies.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 w-full">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`col-span-1 md:col-span-1 lg:col-span-2 flex flex-col items-start gap-4 p-8 rounded-[24px] ${service.bg} hover:shadow-lg transition-shadow duration-300 min-h-[300px]`}
              >
                <h3 className="text-[#1D1E20] text-2xl font-bold">
                  {service.title}
                </h3>
                <p className="text-[#31373D] text-[15px] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}

            {/* Bottom Row - Spanning 3 cols each (half width) */}
            {services.slice(6, 8).map((service, index) => (
              <motion.div
                key={index + 6}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: (index + 6) * 0.1, // Continue stagger from previous items
                  ease: "easeOut",
                }}
                className={`col-span-1 md:col-span-1 lg:col-span-3 flex flex-col items-start gap-4 p-8 rounded-[24px] ${service.bg} hover:shadow-lg transition-shadow duration-300 min-h-[250px]`}
              >
                <h3 className="text-[#1D1E20] text-2xl font-bold">
                  {service.title}
                </h3>
                <p className="text-[#31373D] text-[15px] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
