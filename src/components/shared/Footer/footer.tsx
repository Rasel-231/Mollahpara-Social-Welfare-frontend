"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ComplainModal from "../Modal/complanModal";
import { useState } from "react";

const quickLinks = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "রক্তদান", href: "/blood-donation" },
  { label: "গ্যালারি", href: "/gallery" },
  { label: "খবর ও ব্লগ", href: "/news" },
  { label: "যোগাযোগ", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", href: "#", color: "hover:bg-blue-500" },
  { label: "YouTube", href: "#", color: "hover:bg-red-500" },
  { label: "WhatsApp", href: "#", color: "hover:bg-green-500" },
  { label: "Call", href: "#", color: "hover:bg-sky-500" },
];

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="relative w-full bg-blue-950 text-white overflow-hidden">
      {/* Top Gradient Border */}
      <div className="h-1.5 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400" />

      {/* Main Container */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Org Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 border-4 border-blue-800 flex items-center justify-center shadow-2xl">
                <span className="text-3xl">🌿</span>
              </div>
              <div>
                <h3 className="font-bold text-2xl font-bengali text-white">মোল্লাপাড়া সমাজ কল্যাণ সংস্থা</h3>
                <p className="text-blue-200 text-sm tracking-widest uppercase font-semibold">Mollapara Social Welfare Association</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-8 mb-8 font-bengali max-w-sm opacity-90">
              মানবতার সেবায় উৎসর্গীকৃত আমাদের সংগঠন এলাকার উন্নয়নে নিরলস কাজ করে যাচ্ছে। রক্তদান, শিক্ষা সহায়তা ও পুনর্বাসন কার্যক্রমের মাধ্যমে আমরা মানুষের পাশে থাকি।
            </p>
            
            <div className="space-y-4 text-sm font-medium">
              <p className="flex items-center gap-3 text-blue-100"><span className="text-sky-300 text-lg">📍</span> <span>শেখপাড়া,শ্রীপুর,গাজীপুর</span></p>
              <p className="flex items-center gap-3 text-blue-100"><span className="text-sky-300 text-lg">📞</span> +৮৮০ ১০০০-০০০০০০</p>
              <p className="flex items-center gap-3 text-blue-100"><span className="text-sky-300 text-lg">✉️</span> info@mollaporawelfare.org</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 font-bengali text-lg border-b border-blue-800 pb-2 inline-block">🔗 জরুরি লিংক</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-sky-300 transition-all flex items-center gap-2 text-sm font-bengali group">
                    <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-sky-300 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Donate */}
          <div>
            <h4 className="font-bold text-white mb-6 font-bengali text-lg border-b border-blue-800 pb-2 inline-block">📱 সোশ্যাল মিডিয়া</h4>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center justify-center p-3 rounded-lg bg-blue-900 border border-blue-800 transition-all ${social.color} text-xs font-semibold`}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>

            <div onClick={() => setIsModalOpen(true)}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-[2px] rounded-xl overflow-hidden cursor-pointer group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-black via-blue-500 via-green-500 to-pink-500"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 text-center py-3 rounded-[10px] font-bold text-white bg-blue-900 hover:bg-transparent transition-all duration-300 font-bengali">
                  📢 অভিযোগ করুন
                </div>
              </motion.div>
            </div>
            
            <ComplainModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-blue-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-300/80">
          <p> © {new Date().getFullYear()} মোল্লাপাড়া সমাজ কল্যাণ সংস্থা। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">গোপনীয়তা নীতি</Link>
            <Link href="/terms" className="hover:text-white transition-colors">শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}