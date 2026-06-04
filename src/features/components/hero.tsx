"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImpactStatsSection from "./impactState";

export default function CombinedHeroSection() {
  return (
    <div className="mt-20">
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundImage: `url('/assets/bg-image.png')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#000' // ইমেজটি ডার্ক দেখাতে কালো ব্যাকগ্রাউন্ড
            }}
          />
          {/* *** মডিফিকেশন: এখানে অপাসিটি ০.৮০ (৮০%) করা হয়েছে যাতে ইমেজটি অনেক বেশি ডার্ক হয় *** */}
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight font-bengali"
          >
            মানবতার সেবায় উৎসর্গীকৃত
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 font-bengali max-w-2xl"
          >
            মোল্লাপাড়া সমাজ কল্যাণ সংস্থা — এলাকার উন্নয়নে আমাদের অবদান
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto"
          >
            <Link href="/join" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3 rounded-md font-semibold font-bengali bg-emerald-700 hover:bg-emerald-800 text-white transition-all">
                যোগ দিন
              </button>
            </Link>
            <Link href="/donate" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3 rounded-md font-semibold font-bengali bg-amber-600 hover:bg-amber-700 text-white transition-all">
                অনুদান দিন
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="-mt-10 md:-mt-20 relative z-20">
        <ImpactStatsSection />
      </div>
    </div>
  );
}