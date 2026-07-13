"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// লোকাল ইমপোর্টগুলো ঠিক আছে
import bkashLogo from "../../../public/assets/bkash.jpg";
import nagadLogo from "../../../public/assets/nagad.png";
import rocketLogo from "../../../public/assets/rocekt-icon.png";
import cardLogo from "../../../public/assets/visa.png";
import Link from "next/link";

const paymentMethods = [
  { id: "bkash", name: "বিকাশ", logo: bkashLogo, color: "hover:shadow-pink-200" },
  { id: "nagad", name: "নগদ", logo: nagadLogo, color: "hover:shadow-orange-200" },
  { id: "rocket", name: "রকেট", logo: rocketLogo, color: "hover:shadow-purple-200" },
  { id: "card", name: "কার্ড পেমেন্ট", logo: cardLogo, color: "hover:shadow-blue-200" },
];

export default function DonationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-24 ">
      <div className="w-full  mx-auto px-6">
        
        {/* মেইন কার্ডটি এখন আরও চওড়া */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-2xl border border-white/50"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              আপনার সহায়তা, আমাদের শক্তি
            </h2>
            <p className="text-slate-600 text-lg">সহজ ও নিরাপদ পেমেন্ট মেথড ব্যবহার করে আপনার অনুদান জমা দিন</p>
          </div>

          {/* কার্ড গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                whileHover={{ y: -10 }}
                className={`group bg-white p-8 rounded-3xl border border-slate-100 shadow-lg transition-all duration-300 hover:shadow-2xl ${method.color}`}
              >
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <Image
                    src={method.logo}
                    alt={method.name}
                    fill
                    sizes="80px"
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{method.name}</h3>
                <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
              </motion.button>
            ))}
          </div>

          {/* বাটন সেকশন */}
          <Link href="/donate">
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all"
            >
              
                এখনই অনুদান দিন
             
            </motion.button>
          </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}