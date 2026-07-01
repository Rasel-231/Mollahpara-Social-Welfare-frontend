"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/Redux/utils/helpers";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "রক্তদান", href: "/blood-donation" },
  { label: "প্রকল্পসমূহ", href: "/our-program" },
  { label: "গ্যালারি", href: "/gallery" },
  { label: "খবর ও ব্লগ", href: "/news" },
  { label: "প্যানেল", href: "/login" },
  { label: "যোগাযোগ", href: "/contact" },
];

// --- Custom SVGs Components ---
const LeafIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-13.9.2" />
    <path d="M9 22v-4H5" />
    <path d="M14 12c-1.5 1.5-2.5 3.5-3 5.5" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-welfare-green-200/60"
            : "bg-white/90 backdrop-blur-sm",
        )}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-welfare-green-700 flex items-center justify-center shadow-lg group-hover:shadow-welfare-green-300/50 transition-shadow duration-300"
              >
                <LeafIcon className="w-6 h-6 lg:w-7 lg:h-7 text-white fill-white/20" />
              </motion.div>
              <div className="hidden sm:block">
                <p className="text-welfare-green-800 font-bold text-sm lg:text-base leading-tight font-bengali">
                  মোল্লাপাড়া সমাজ কল্যাণ সংস্থা
                </p>
                <p className="text-welfare-green-500 text-xs font-medium tracking-wide">
                  Mollapara Social Welfare Association
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link px-3 py-2 rounded-lg text-sm font-medium text-welfare-green-800 hover:text-welfare-green-600 hover:bg-welfare-green-50 transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-welfare-green-700 border border-welfare-green-300 hover:bg-welfare-green-50 transition-all duration-200"
              >
                <HeartIcon className="w-4 h-4 text-welfare-green-600" />
                প্যানেল
              </Link>
              <Link href="/donate" className="btn-primary text-sm py-2 px-5">
                <span>অনুদান দিন</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-welfare-green-50 text-welfare-green-700 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <XIcon className="w-6 h-6" />
                  ) : (
                    <MenuIcon className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/98 backdrop-blur-lg border-b border-welfare-green-200/60 shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-1 mb-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-welfare-green-800 hover:bg-welfare-green-50 hover:text-welfare-green-700 font-medium transition-all duration-200 text-base"
                    >
                      <LeafIcon className="w-4 h-4 text-welfare-green-500" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-4 border-t border-welfare-green-100">
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary text-center flex items-center justify-center gap-2"
                >
                  <HeartIcon className="w-4 h-4 text-white fill-white/20" />
                  অনুদান দিন
                </Link>
                <Link
                  href="/members"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold text-center"
                >
                  সদস্য হন
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
