"use client";
import { Container } from "@/components/container";
import SplitText from "@/assist/text";
import { motion } from "motion/react";
import Footer from "@/components/footer";
import { FaArrowRight } from "react-icons/fa6";

import { useState } from "react";
import { addMessage } from "../../dashboard/actions/massage.action";
import { message as antMessage } from "antd";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      antMessage.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const hide = antMessage.loading("Sending your message...", 0);

    try {
      const result = await addMessage(formData);
      hide();
      if (result.success) {
        antMessage.success("Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        antMessage.error(
          result.error || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      hide();
      console.error("Contact form error:", error);
      antMessage.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative pt-[120px] overflow-hidden min-h-screen items-center flex-col justify-between bg-gradient-to-r from-[#f6fffd] to-[#dfdfdf] font-sans">
      <Container className="mb-20 w-full">
        <div className="flex flex-col w-full gap-16">
          {/* Header Section */}
          <div className="flex flex-col gap-4 items-start max-w-4xl">
            <SplitText
              text="Get in touch with us."
              className="text-[#1D1E20] text-4xl md:text-[64px] font-bold leading-tight"
              delay={100}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              tag="h1"
              textAlign="left"
            />
            <SplitText
              text="We're here to assist you."
              className="text-[#1D1E20] text-4xl md:text-[64px] font-bold leading-tight"
              delay={150}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              tag="h1"
              textAlign="left"
            />
          </div>

          {/* Form Section */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full flex flex-col gap-12"
            onSubmit={handleSubmit}
          >
            {/* Top Row inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-[#1D1E20] text-lg font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-[#CCCCCC] py-2 focus:outline-none focus:border-[#008867] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#1D1E20] text-lg font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-[#CCCCCC] py-2 focus:outline-none focus:border-[#008867] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#1D1E20] text-lg font-medium">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter your phone number..."
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#CCCCCC] py-2 focus:outline-none focus:border-[#008867] transition-colors"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[#1D1E20] text-lg font-medium">
                Message
              </label>
              <textarea
                rows={1}
                name="message"
                value={formData.message}
                placeholder="Enter your message..."
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#CCCCCC] py-2 focus:outline-none focus:border-[#008867] transition-colors resize-none"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-[#008867] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a5c] transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Leave us a Message"}
                {!loading && (
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          </motion.form>

          {/* Contact Info Card */}
          <div className="w-full flex items-center justify-center relative min-h-[450px] rounded-[32px] overflow-hidden bg-white p-8 md:p-12 shadow-sm">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/image/background.png"
                alt=""
                className="w-full h-full object-cover opacity-40"
              />
            </div>

            {/* Content */}
            <div className="relative h-full z-10 flex flex-col lg:flex-row  lg:justify-between lg:items-center gap-12">
              {/* Left Content */}
              <div className="flex flex-col gap-4 max-w-lg">
                <span className="text-lg font-medium text-[#1D1E20]">
                  Contact Info
                </span>
                <h2 className="text-4xl md:text-[56px] font-bold text-[#1D1E20] leading-tight">
                  We are always here to assist you
                </h2>
              </div>

              {/* Right Content */}
              <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
                {/* Email Section */}
                <div className="flex flex-col gap-10">
                  <h3 className="text-xl font-bold text-[#1D1E20]">
                    Email Address
                    <div className="w-8 h-[2px] mt-2 bg-black"></div>
                  </h3>

                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold text-[#1D1E20]">
                      info@insight-x.info
                    </p>
                    <p className="text-[#5F6973] text-sm leading-relaxed max-w-[200px]">
                      Assistance hours: Saturday - Thursday 8 am to 8 pm EST
                    </p>
                  </div>
                </div>

                {/* Number Section */}
                <div className="flex flex-col gap-10">
                  <h3 className="text-xl font-bold text-[#1D1E20]">
                    Number
                    <div className="w-8 h-[2px] mt-2 bg-black"></div>
                  </h3>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold text-[#1D1E20]">
                      (+964) 781 092 9499
                    </p>
                    <p className="text-[#5F6973] text-sm leading-relaxed max-w-[200px]">
                      Assistance hours: Saturday - Thursday 8 am to 8 pm EST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
