"use client";
import { useState, useEffect } from "react";
import { Container } from "@/components/container";
import cutString from "@/lib/sherdfounction";
import SplitText from "@/assist/text";
import { motion } from "motion/react";
import Link from "next/link";
import Footer from "@/components/footer";
import { getAllBlogs } from "@/app/dashboard/actions/blog.action";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await getAllBlogs({ page: 1, limit: 12 });

        console.log("result", result);
        if (result.success) {
          setBlogs(result.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 w-full animate-pulse"
                >
                  <div className="w-full h-[240px] rounded-2xl bg-gray-200" />
                  <div className="flex flex-col gap-2">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {blogs.map((post, index) => {
                // Find the first paragraph to use as description
                const description =
                  post.content?.find((c) => c.type === "paragraph")?.words ||
                  "";

                return (
                  <Link
                    href={`/blog/${post.id}`}
                    key={post.id}
                    className="contents"
                  >
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
                          src={
                            "https://insight-x.info" + post.imageUrl ||
                            "/image/blog.png"
                          }
                          alt={post.mainTitle}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#008867] text-xs font-bold uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[#1D1E20] text-xl font-bold leading-snug group-hover:text-[#008867] transition-colors line-clamp-2">
                          {post.mainTitle}
                        </h3>
                        <p className="text-[#5F6973] text-sm leading-relaxed line-clamp-3">
                          {cutString(description, 40)}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-[#5F6973] text-lg">No blogs found yet.</div>
          )}
        </div>
      </Container>

      {/* Footer / CTA Section */}
      <Footer />
    </div>
  );
}
