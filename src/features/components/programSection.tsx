"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const programs = [
  {
    id: "blood",
    titleBn: "রক্তদান কর্মসূচি",
    descriptionBn:
      "আবেদনের ভিত্তিতে যোগাযোগ করে রক্ত সংগ্রহের ব্যবস্থা করা হয়। জরুরী প্রয়োজনে নিকটবর্তী হাসপাতাল ও ক্লিনিকে রক্ত সরবরাহ করা হয়। দলবদ্ধ শিক্ষার মাধ্যমে মানুষের সচেতনতা বৃদ্ধি পায়।",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&q=80",
    href: "/blood-donation",
    ctaBn: "জানতে আসুন",
    icon: "🩸",
    colSpan: "lg:col-span-2",
  },
  {
    id: "education",
    titleBn: "শিক্ষন সহায়তা",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80",
    descriptionBn: "",
    href: "/programs#education",
    ctaBn: "দেখুন",
    icon: "📚",
    colSpan: "lg:col-span-1",
  },
  {
    id: "loans",
    titleBn: "ঋণ ও পুনর্বাসন",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80",
    descriptionBn: "",
    href: "/programs#loans",
    ctaBn: "দেখুন",
    icon: "🏦",
    colSpan: "lg:col-span-1",
  },
];

export default function ProgramsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="section-divider mb-4">
            <span className="text-base animate-float">🍃</span>
            <h2 className="section-title-center">আমাদের প্রধান প্রকল্পসমূহ</h2>
            <span className="text-base animate-float">🍃</span>
          </div>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Blood Donation - Wide card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="md:col-span-2 lg:col-span-2 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            style={{ minHeight: "280px" }}
            whileHover={{ y: -4 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105"
              style={{ backgroundImage: `url('${programs[0].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-welfare-green-900/90 via-welfare-green-800/50 to-transparent" />

            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg animate-float">{programs[0].icon}</span>
                <span className="text-welfare-gold-300 text-sm">🌿</span>
                <h3 className="text-xl font-bold text-white font-bengali">
                  {programs[0].titleBn}
                </h3>
              </div>
              <p className="text-white/80 text-xs leading-5 font-bengali mb-4 line-clamp-3">
                {programs[0].descriptionBn}
              </p>
              <Link href={programs[0].href}>
                <motion.button
                  whileHover={{ scale: 1.05, x: 3 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-bengali text-welfare-green-900"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24, #d97706)",
                    boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)",
                  }}
                >
                  {programs[0].ctaBn}
                  {/* Inline SVG ArrowRight */}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            style={{ minHeight: "280px" }}
            whileHover={{ y: -4 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105"
              style={{ backgroundImage: `url('${programs[1].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-welfare-green-900/90 to-transparent" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-end">
              <h3 className="text-lg font-bold text-white font-bengali mb-1">
                {programs[1].titleBn}
              </h3>
            </div>
          </motion.div>

          {/* Loans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            style={{ minHeight: "280px" }}
            whileHover={{ y: -4 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105"
              style={{ backgroundImage: `url('${programs[2].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-welfare-green-800/90 to-transparent" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-end">
              <h3 className="text-lg font-bold text-white font-bengali mb-1">
                {programs[2].titleBn}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Extended Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 p-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(22, 101, 52, 0.15)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-welfare-green-100 flex items-center justify-center">
              <span className="text-sm">📊</span>
            </div>
            <h3 className="font-bold text-welfare-green-800 font-bengali text-base">
              আজব বিস্তারিতভাবে
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: "📅", label: "রক্তদান", value: "১২০০+" },
              { icon: "💊", label: "রক্তদান", value: "৫০০+" },
              { icon: "🏥", label: "নিরাময় সেবা", value: "২০০+" },
              { icon: "👨‍👩‍👧", label: "পরিবার সেবা", value: "৫০০+" },
              { icon: "💰", label: "বিতরিত টাকা", value: "২০০+" },
              { icon: "🤝", label: "মানবিক সেবা", value: "২০০+" },
            ].map((s) => (
              <div key={s.label + s.value} className="text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-welfare-green-800 font-bold font-bengali text-sm">
                  {s.value}
                </div>
                <div className="text-welfare-green-500 text-xs font-bengali">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}