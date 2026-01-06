"use client";
import { Container } from "@/components/container";
import { motion } from "motion/react";

export default function SectorWork() {
  const sectors = [
    {
      title: "Telecommunications",
      description: "Mobile apps, digital services, and tech solutions",
      icon: "/image/icons/c1.svg",
    },
    {
      title: "Healthcare",
      description: "Hospitals, clinics, and pharmaceutical products",
      icon: "/image/icons/c2.svg",
    },
    {
      title: "Consumer & Retail",
      description: "FMCG, retail chains, and lifestyle products",
      icon: "/image/icons/c3.svg",
    },
    {
      title: "Media & Communication",
      description: "News outlets, media campaigns, and NGOs",
      icon: "/image/icons/c4.svg",
    },
    {
      title: "Financial & Banking",
      description: "Banks, financial services, and fintech solutions",
      icon: "/image/icons/c5.svg",
    },
    {
      title: "Industrial",
      description: "Manufacturing, automotive, and machinery sectors",
      icon: "/image/icons/c6.svg",
    },
  ];

  return (
    <section className="w-full flex items-center justify-center py-20 bg-[#Fdfdfd]">
      <Container>
        <div className="flex flex-col items-start md:items-center justify-center gap-12 w-full">
          {/* Header */}
          <div className="flex flex-col items-start md:items-center justify-center gap-4 max-w-2xl text-start md:text-center">
            <h2 className="text-[#1D1E20] text-3xl md:text-[40px] font-bold">
              Sectors We <span className="text-[#008867]">Work In</span>
            </h2>
            <p className="text-[#6B7280] text-base md:text-[16px] leading-relaxed">
              InsightX executes field research projects across multiple
              industries, delivering accurate insights for every market.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {sectors.map((sector, index) => (
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
                className="col-span-1 flex flex-col items-center text-center gap-4 p-8 rounded-[24px] bg-[#F9FAFB] hover:shadow-lg transition-shadow duration-300 min-h-[250px]"
              >
                <div className="mb-2">{<img src={sector.icon} alt="" />}</div>
                <h3 className="text-[#1D1E20] text-xl font-bold">
                  {sector.title}
                </h3>
                <p className="text-[#6B7280] text-[15px] leading-relaxed">
                  {sector.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
