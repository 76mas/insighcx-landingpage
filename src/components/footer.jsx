import { Container } from "./container";
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa6";

const Footer = ({ className }) => {
  return (
    <footer
      className={`w-full flex flex-col items-center justify-center ${className}`}
    >
      <Container>
        <div className="grid w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 items-start justify-between pt-10 border-t border-gray-100/50">
          {/* Column 1: Brand & Social */}
          <div className="flex w-full flex-col items-start gap-6 lg:max-w-xs">
            <div className="flex flex-col gap-4">
              <div className="relative w-[100px] h-[30px]">
                <Image
                  src="/image/logo.svg"
                  alt="InsightX Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <p className="text-[#31373D] text-sm leading-relaxed text-start">
                is a fieldwork execution company delivering accurate, reliable,
                and high-quality data collection services across multiple
                industries.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-[#1D1E20] font-bold text-[12px] uppercase tracking-wider">
                SOCIAL MEDIA
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/insightx/"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#1D1E20] hover:bg-[#008867] hover:text-white transition-all cursor-pointer"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://twitter.com/insightx"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#1D1E20] hover:bg-[#008867] hover:text-white transition-all cursor-pointer"
                >
                  <FaXTwitter size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/company/insightx/"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#1D1E20] hover:bg-[#008867] hover:text-white transition-all cursor-pointer"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href="https://t.me/insightx"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#1D1E20] hover:bg-[#008867] hover:text-white transition-all cursor-pointer"
                >
                  <FaTelegram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Saas */}
          <div className="flex w-full flex-col items-start gap-6 lg:pl-10">
            <h3 className="text-[#1D1E20] font-bold text-lg uppercase">Saas</h3>
            <a
              href="https://insightcx.app/"
              target="_blank"
              className="text-[#31373D] hover:text-[#008867] transition-colors underline decoration-1 underline-offset-4"
            >
              InsightCX
            </a>
          </div>

          {/* Column 3: QUAL SERVICES */}
          <div className="flex w-full flex-col items-start gap-6">
            <h3 className="text-[#1D1E20] font-bold text-lg uppercase">
              QUAL SERVICES
            </h3>
            <div className="flex flex-col gap-3 text-[#31373D] items-start">
              <a
                href="#"
                className="hover:text-[#008867] transition-colors text-start"
              >
                Focus Group
              </a>
              <a
                href="#"
                className="hover:text-[#008867] transition-colors text-start"
              >
                In-Depth-Interviews
              </a>
              <a
                href="#"
                className="hover:text-[#008867] transition-colors text-start"
              >
                Ethnography
              </a>
            </div>
          </div>

          {/* Column 4: QUANT SERVICES */}
          <div className="flex w-full flex-col items-start gap-6">
            <h3 className="text-[#1D1E20] font-bold text-lg uppercase">
              QUANT SERVICES
            </h3>
            <div className="flex flex-col gap-3 text-[#31373D] items-start">
              <a
                href="#"
                className="hover:text-[#008867] transition-colors text-start"
              >
                CAWI
              </a>
              <a
                href="#"
                className="hover:text-[#008867] transition-colors text-start"
              >
                CAPI
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="w-full h-[50px] mt-10 flex items-center justify-center border-t border-gray-400">
        <Container>
          <div className="flex items-center justify-center">
            <p className="text-[#31373D] text-sm">
              © {new Date().getFullYear()} InsightX. All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
