"use client";
import { useState, useEffect, use } from "react";
import CallToActionCard from "@/components/callToActionCard";
import { Container } from "@/components/container";
import Footer from "@/components/footer";
import { motion } from "motion/react";
import Link from "next/link";
import { getBlogById } from "@/app/dashboard/actions/blog.action";

export default function BlogDetail({ params }) {
  const { id } = use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const result = await getBlogById(id);
        if (result.success) {
          setBlog(result.blog);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f6fffd] to-[#dfdfdf]">
        <div className="text-[#1D1E20] text-2xl font-bold animate-pulse">
          Loading blog...
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#f6fffd] to-[#dfdfdf] gap-6">
        <h1 className="text-3xl font-bold text-[#1D1E20]">Blog not found</h1>
        <Link
          href="/blog"
          className="px-6 py-2 bg-[#008867] text-white rounded-full"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  // Sort content by priority
  const sortedContent = [...(blog.content || [])].sort(
    (a, b) => (a.priority || 0) - (b.priority || 0),
  );

  return (
    <div className="flex relative pt-[120px] overflow-hidden min-h-screen items-center flex-col justify-between bg-gradient-to-r from-[#f6fffd] to-[#dfdfdf] font-sans">
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
              <span className="text-white font-medium text-sm">
                {blog.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#1D1E20] text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight"
            >
              {blog.mainTitle}
            </motion.h1>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-5xl h-[300px] md:h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-sm"
          >
            <img
              src={
                "https://insight-x.info" + blog.imageUrl || "/image/blog.png"
              }
              alt={blog.mainTitle}
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
            {sortedContent.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="whitespace-pre-wrap">
                    {block.words}
                  </p>
                );
              } else if (block.type === "title") {
                return (
                  <div
                    key={index}
                    className="flex border-l-4 border-[#C1F15C] pl-6 py-2 my-4"
                  >
                    <h3 className="text-[#1D1E20] text-xl md:text-2xl font-bold leading-snug">
                      {block.words}
                    </h3>
                  </div>
                );
              }
              return null;
            })}
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
