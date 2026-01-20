import CallToActionCard from "@/components/callToActionCard";
import { Container } from "@/components/container";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import {
  FaAngleRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";

const Bottom = () => {
  return (
    <section className="w-full flex-col relative z-0 min-h-screen flex items-center justify-center py-12 lg:py-20 lg:pb-0 pb-0 overflow-hidden">
      {/* <div className="absolute -bottom-[40%] -left-[20%] w-[950px] h-[950px] rounded-full bg-[#FFD6D6] blur-[120px] opacity-50 pointer-events-none -z-10" /> */}
      <div
        className="absolute -bottom-[40%] -left-[20%] w-[950px] h-[950px] rounded-full opacity-50 pointer-events-none -z-10"
        style={{
          // use this FFD6D6
          background:
            "radial-gradient(circle, rgba(255, 214, 214, 1) 0%, rgba(255, 214, 214, 0) 70%)",
        }}
      />
      <Container>
        <div className="flex flex-col gap-20 mb-20 w-full">
          {/* Call to Action Card */}
          {/* <div className="flex flex-col items-center justify-center shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] bg-[#F5F5F5] w-full h-[450px] rounded-[24px]">
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-[#1D1E20] font-bold text-center text-3xl md:text-[44px]">
                  Do you have any market
                </h2>
                <h2 className="text-[#1D1E20] font-bold text-center text-3xl md:text-[44px]">
                  research problem?
                </h2>
              </div>

              <p className="text-[#31373D] text-sm md:text-[16px]">
                We can provide a Quality Research and Fieldwork!
              </p>
              <button className="text-[#ffffff] flex items-center group gap-2 bg-[#000000] cursor-pointer px-5 py-3 rounded-full hover:bg-[#181717] transition-colors">
                Get stated now
                <FaAngleRight className="ml-2 group-hover:ml-4 transition-all" />
              </button>
            </div>
          </div> */}
          <CallToActionCard />

          {/* Footer Section */}
        </div>
      </Container>

      <Footer />
    </section>
  );
};

export default Bottom;
