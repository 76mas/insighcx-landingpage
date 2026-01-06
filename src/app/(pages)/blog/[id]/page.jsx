"use client";
import CallToActionCard from "@/components/callToActionCard";
import { Container } from "@/components/container";
import Footer from "@/components/footer";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";

export default function BlogDetail({ params }) {
  // Use React.use() to unwrap params
  const { id } = use(params);

  return (
    <div className="flex relative pt-[120px]  overflow-hidden min-h-screen items-center flex-col justify-between bg-gradient-to-r from-[#f6fffd] to-[#dfdfdf] font-sans">
      <Container className="w-full">
        <div className="flex flex-col items-center justify-center w-full gap-12 lg:gap-16">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center text-center gap-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-6 py-2 bg-[#008867] rounded-full"
            >
              <span className="text-white font-medium text-sm">Technology</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#1D1E20] text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight"
            >
              Perfect product images with Generative AI in Nivia platform
            </motion.h1>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-5xl h-[300px] md:h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-sm"
          >
            {/* Using a placeholder image stack as requested - referencing one of the uploaded images or a generic one */}
            <img
              src="/image/blog.png"
              alt="Blog Hero"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-8 max-w-3xl w-full text-[#5F6973] text-lg leading-relaxed"
          >
            <p>
              The toppings you may chose for that TV dinner pizza slice when you
              forgot to shop for foods, the paint you may slap on your face to
              impress the new boss is your business. But what about your daily
              bread? Not so fast, I'd say, there are some redeeming factors in
              favor of greeking text, as its use is merely the symptom of a
              worse problem to take into consideration.
            </p>

            <p>
              Design comps, layouts, wireframes—will your clients accept that
              you go about things the facile way? Authorities in our business
              will tell in no uncertain terms that Lorem Ipsum is that huge,
              huge no no to forswear forever.
            </p>

            {/* Quote Block */}
            <div className="flex border-l-4 border-[#C1F15C] pl-6 py-2 my-4">
              <h3 className="text-[#1D1E20] text-xl md:text-2xl font-bold leading-snug">
                Design comps, layouts, wireframes—we believe that clients will
                surely accept that you go about things the facile way. It’s a
                matter of time.
              </h3>
            </div>

            <p>
              Design comps, layouts, wireframes—will your clients accept that
              you go about things the facile way? Authorities in our business
              will tell in no uncertain terms that Lorem Ipsum is that huge,
              huge no no to forswear forever.
            </p>

            <p>
              The toppings you may chose for that TV dinner pizza slice when you
              forgot to shop for foods, the paint you may slap on your face to
              impress the new boss is your business. But what about your daily
              bread? Not so fast, I'd say, there are some redeeming factors in
              favor of greeking text, as its use is merely the symptom of a
              worse problem to take into consideration.
            </p>

            <p>
              Not so fast, I'd say, there are some redeeming factors in favor of
              greeking text, as its use is merely the symptom of a worse problem
              to take into consideration.
            </p>

            <p>
              Design comps, layouts, wireframes—will your clients accept that
              you go about things the facile way? Authorities in our business
              will tell in no uncertain terms that Lorem Ipsum is that huge,
              huge no no to forswear forever.
            </p>
          </motion.div>
        </div>
      </Container>
      <Container className="mt-20">
        <CallToActionCard />
      </Container>
      <Footer className="mt-20" />
    </div>
  );
}
