"use client";

import { useState, useEffect } from "react";
import cutString from "@/lib/sherdfounction";
import { Container } from "@/components/container";
import Link from "next/link";
import { getAllBlogs } from "@/app/dashboard/actions/blog.action";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBlogs = async () => {
      try {
        const result = await getAllBlogs({ page: 1, limit: 3 });
        if (result.success) {
          setBlogs(result.blogs);
        }
      } catch (error) {
        console.error("Error fetching top blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopBlogs();
  }, []);



  return (
    <section className="w-full relative z-0 min-h-screen flex  justify-center py-12 lg:py-20 ">
      <div className="absolute -bottom-[40%] -right-[20%] w-[950px] h-[950px] rounded-full bg-green-100 blur-[120px] opacity-50 pointer-events-none -z-10" />

      <Container>
        <div className="flex flex-col w-full items-center justify-center gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0">
            <div className="flex flex-col items-start justify-center gap-1">
              <h2 className="text-[#1D1E20] font-bold text-3xl md:text-[44px]">
                Our Blog
              </h2>
              <p className="text-[#31373D] text-sm md:text-[16px]">
                Discover articles to help you build better
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Link
                href="/blog"
                className="text-[#1D1E20] font-bold p-2 text-center text-[13px] px-6 cursor-pointer text-uppercase rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors"
              >
                Browse All
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {loading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 w-full animate-pulse"
                  >
                    <div className="w-full h-[240px] rounded-[24px] bg-gray-200" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                ))
              : blogs.map((blog) => {
                  const description =
                    blog.content?.find((c) => c.type === "paragraph")?.words ||
                    "";

                  return (
                    <Link
                      href={`/blog/${blog.id}`}
                      key={blog.id}
                      className="flex flex-col items-start justify-start gap-3 w-full group "
                    >
                      <div className="w-full h-[240px] rounded-[24px] overflow-hidden">
                        <img
                          src={blog.imageUrl || "/image/blog.png"}
                          alt={blog.mainTitle}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-start text-lg md:text-[18px] font-bold group-hover:text-[#008867] transition-colors line-clamp-2">
                          {blog.mainTitle}
                        </h2>
                        <p className="text-start text-[#545454] text-sm md:text-base line-clamp-2">
                          {cutString(description, 40)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
          </div>

          {!loading && blogs.length === 0 && (
            <p className="text-[#5F6973] text-lg">Coming soon...</p>
          )}
        </div>
      </Container>
    </section>
  );
}
