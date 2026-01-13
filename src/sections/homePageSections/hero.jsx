"use client";
import { motion } from "motion/react";
import SplitText from "@/assist/text";
import { Container } from "@/components/container";
import Header from "@/components/header";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full relative z-0 h-full min-h-screen flex items-center justify-center">
      <div
        className="absolute -top-[40%] -right-[20%] w-[950px] h-[950px] rounded-full opacity-50 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 214, 214, 1) 0%, rgba(255, 214, 214, 0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-[40%] -right-[20%] w-[950px] h-[950px] rounded-full opacity-50 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 252, 231, 1) 0%, rgba(220, 252, 231, 0) 70%)",
        }}
      />

      <div
        className="absolute -top-[40%] -left-[20%] w-[950px] h-[950px] rounded-full opacity-50 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 252, 231, 1) 0%, rgba(220, 252, 231, 0) 70%)",
        }}
      />

      {/* <div className="absolute -bottom-[20%] -right-[20%] w-[950px] h-[950px] rounded-full bg-green-200 blur-[120px] opacity-50 pointer-events-none -z-10" /> */}
      <Container className="h-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 h-full px-4 md:px-0">
          <div className="w-full lg:w-[55%] flex flex-col items-start  justify-between h-[363px]  z-10">
            {/* Precision in Field Research Execution */}

            <div className="flex flex-col gap-2 text-start items-start">
              <SplitText
                text={"Precision in Field"}
                className="text-4xl md:text-[60px] font-bold text-[#1D1E20] "
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
              />
              <SplitText
                text={"Research Execution"}
                className="text-4xl md:text-[60px] font-bold text-[#1D1E20] "
                delay={150}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
              />
            </div>

            <div className="flex items-start justify-start flex-col gap-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="text-start flex text-[#31373D]   text-[18px]  leading-relaxed"
              >
                specializes in executing field research projects in Iraq, from
                data collection to final reporting. Our expertise ensures
                accurate, reliable results to support informed decision-making.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  ease: "easeOut",
                }}
                className="flex gap-3"
              >
                <Link href="/contact" className="text-[#ffffff] bg-[#008867] cursor-pointer px-5 py-3 rounded-[12px] hover:bg-[#006f54] transition-colors">
                  Contact Us
                </Link>
                <Link href="/services" className="text-[#000000] bg-[#ffffff] cursor-pointer border-[#cdd3db] border px-5 py-3 rounded-[12px] hover:bg-gray-100 transition-colors">
                  Services
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="w-full relative lg:w-[500px] h-[50vh] lg:h-full overflow-hidden rounded-2xl md:rounded-none">
            <img
              src="/image/heroimage.png"
              className="w-full h-full object-cover"
              alt="heroimage"
            />

            <div className="absolute top-0 left-0 up  bg-white w-1/2 h-full "></div>
            <div className="absolute bottom-0 right-0 down  bg-white w-1/2 h-full "></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
