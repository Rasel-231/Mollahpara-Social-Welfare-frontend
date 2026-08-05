"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ImpactStatsSection from "./impactState";

export default function CombinedHeroSection() {
  return (
    <div className="mt-12 lg:mt-20">
      <section className="relative min-h-[40vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/bg-image.png"
            alt="কমিউনিটি সোশ্যাল ক্লাব"
            fill
            height={100}
            width={100}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight font-bengali break-words"
          >
            মানবতার সেবায় উৎসর্গীকৃত
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 font-bengali max-w-2xl"
          >
            কমিউনিটি সোশ্যাল ক্লাব — এলাকার উন্নয়নে আমাদের অঙ্গীকার
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Link href="/members">
              <button className="px-4 w-20 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-md font-semibold font-bengali bg-emerald-700 hover:bg-emerald-800 text-white transition-all whitespace-nowrap">
                যোগ দিন
              </button>
            </Link>
            <Link href="/donate">
              <button className="px-4 w-20 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-md font-semibold font-bengali bg-amber-600 hover:bg-amber-700 text-white transition-all whitespace-nowrap">
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
