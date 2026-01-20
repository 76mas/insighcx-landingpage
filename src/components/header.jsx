"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState(true);
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    if (
      pathname === "/dashboard/login" ||
      pathname === "/dashboard" ||
      pathname === "/dashboard/blogs" ||
      pathname === "/dashboard/messages"
    ) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
  ];

  const primaryColor = "#00897b"; // Teal color from design

  return (
    <header
      style={{ display: display ? "flex" : "none" }}
      className="fixed top-0 left-0 w-full z-50  md:backdrop-blur-sm h-[60px]flex justify-center  "
    >
      <Container>
        <div className="relative z-50 flex items-center justify-between py-2 md:py-3">
          {/* Logo */}
          <Link href="/" className="relative w-[100px] h-[50px]">
            <Image
              src="/image/logo.svg"
              alt="InsightX Logo"
              fill
              className="object-contain  object-left"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-29">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium px-2 py-1 rounded-full transition-all duration-300 backdrop-blur-sm ${
                    isActive
                      ? "text-[#008867] "
                      : "text-gray-500 hover:text-[#008867] "
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Contact Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden  md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-[#008867] rounded-[10px] hover:bg-[#00796b] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Contact Us
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/80 backdrop-blur-xl z-40 transition-transform duration-300 md:hidden flex justify-center  flex-col pt-[80px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-8 p-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-medium px-8 py-3 rounded-xl backdrop-blur-md border transition-all duration-300 w-full text-center ${
                  isActive
                    ? "bg-[#008867]/10 text-[#008867] border-[#008867]/20"
                    : "bg-gray-50/50 text-gray-600 border-gray-100 hover:bg-[#008867]/5 hover:text-[#008867] hover:border-[#008867]/20"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center text-lg inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-[#008867] rounded-xl hover:bg-[#00796b] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
