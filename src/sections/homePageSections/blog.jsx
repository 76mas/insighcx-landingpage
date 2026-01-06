import { Container } from "@/components/container";

export default function Blog() {
  const blogData = [
    {
      iamge: "/image/blog.png",
      title: "Introducing the Webflow Boosters App",
      description:
        "Advanced code solutions added directly inside ofvWebflow at the click of a button.",
    },
    {
      iamge: "/image/blog.png",
      title: "Top 20 UI Inspiration Sites (2023)",
      description:
        "We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project.",
    },
    {
      iamge: "/image/blog.png",
      title: "How to add a countdown timer to Framer",
      description:
        "Learn how to add a beautiful countdown to your Framer project. Add it to your project in seconds",
    },
  ];

  const cutString = (string, length) => {
    if (string.length > length) {
      return string.substring(0, length) + "...";
    }
    return string;
  };

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
              <button className="text-[#1D1E20] font-bold p-2 text-center text-[11.5px] px-4 cursor-pointer text-uppercase rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors">
                Browse All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {blogData.map((blog, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-start gap-3 w-full group "
              >
                <div className="w-full h-[240px] rounded-[24px] overflow-hidden">
                  <img
                    src={blog.iamge}
                    alt="blog"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-start text-lg md:text-[18px] font-bold group-hover:text-[#008867] transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-start text-[#545454] text-sm md:text-base">
                    {cutString(blog.description, 80)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
