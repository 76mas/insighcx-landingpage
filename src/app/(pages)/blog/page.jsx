"use client";
import { Container } from "@/components/container";
import SplitText from "@/assist/text";
import { motion } from "motion/react";
import Bottom from "@/sections/homePageSections/buttom";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Blog() {
  const blogPosts = [
    {
      title: "Introducing the Webflow Boosters App",
      description:
        "Advanced code solutions added directly inside of Webflow at the click of a button.",
      image: "/image/blog.png",
      tag: "Product",
    },
    {
      title: "Top 20 UI Inspiration Sites (2023)",
      description:
        "We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project.",
      image: "/image/blog.png",
      tag: "Design",
    },
    {
      title: "How to add a countdown timer to Framer",
      description:
        "Learn how to add a beautiful countdown to your Framer project. Add it to your project in seconds.",
      image: "/image/blog.png",
      tag: "Tutorial",
    },
    {
      title: "Introducing the Webflow Boosters App",
      description:
        "Advanced code solutions added directly inside of Webflow at the click of a button.",
      image: "/image/blog.png",
      tag: "Product",
    },
    {
      title: "Top 20 UI Inspiration Sites (2023)",
      description:
        "We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project.",
      image: "/image/blog.png",
      tag: "Design",
    },
    {
      title: "How to add a countdown timer to Framer",
      description:
        "Learn how to add a beautiful countdown to your Framer project. Add it to your project in seconds.",
      image: "/image/blog.png",
      tag: "Tutorial",
    },
  ];
  // خلقية متدرجة
  return (
    <div className="flex relative pt-[120px] overflow-hidden min-h-screen items-center flex-col justify-start bg-gradient-to-r from-[#f6fffd] to-[#dfdfdf] font-sans">
      <Container className="mb-20">
        <div className="flex flex-col items-center justify-center w-full gap-16">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center text-center gap-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-7 py-2 bg-[#008867] rounded-full"
            >
              <span className="text-white font-medium text-sm">Our blog</span>
            </motion.div>

            <div className="flex flex-col gap-4 items-center">
              <SplitText
                text="Blog & Resources"
                className="text-[#1D1E20] text-4xl md:text-[56px] font-bold leading-tight"
                delay={100}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                tag="h1"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[#5F6973] text-lg leading-relaxed max-w-2xl"
              >
                Explore our blog and resources for valuable insights, expert
                opinions, and up-to-date information on the latest trends in the
                industry.
              </motion.p>
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {blogPosts.map((post, index) => (
              <Link href={`/blog/${index}`} key={index} className="contents">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex flex-col gap-4 group cursor-pointer"
                >
                  <div className="w-full h-[240px] rounded-2xl overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#1D1E20] text-xl font-bold leading-snug group-hover:text-[#008867] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[#5F6973] text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* Footer / CTA Section */}
      <Footer />
    </div>
  );
}
