"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import relief from "../../../public/assets/relief.webp";
export default function LoanRehabSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-4 lg:py-6">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row-reverse border border-gray-700 "
        >
          {/* Image Part */}
          <div className="w-full md:w-[45%] h-64 md:h-auto relative">
            <Image
              src={relief}
              alt="Loan & Rehabilitation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>

          {/* Content Part */}
          <div className="w-full md:w-[55%] p-8 flex flex-col justify-between">
            <div>
              {/* Title with Icon */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-emerald-950/60 flex items-center justify-center border border-emerald-500/30">
                  <span className="text-xl">💰</span>
                </div>
                <h3 className="text-2xl font-bold  font-bengali">
                  ত্রাণ ও পুনর্বাসন
                </h3>
              </div>

              {/* Description */}
              <p className=" text-sm md:text-base leading-relaxed mb-8 font-bengali">
                মোল্লাপাড়া সমাজ কল্যাণ সংস্থা, এলাকার দরিদ্র জনগোষ্ঠীর পাশে।
                দুর্যোগের সময় ক্ষতিগ্রস্তদের ত্রাণ ও পুনর্বাসন সহায়তা প্রদানের
                মাধ্যমে আমরা মানুষের মুখে হাসি ফোটাতে সর্বদা কাজ করে যাচ্ছি।
              </p>
            </div>

            {/* Button and bottom icon */}
            <div className="flex items-center justify-between">
              <Link href="/donate">
                <button className="px-6 py-3 rounded-lg font-bold font-bengali bg-emerald-800 hover:bg-emerald-700 text-white transition-all shadow-lg border border-emerald-600">
                  সাহায্য করুন
                </button>
              </Link>

              {/* ডান কোণায় নিচের আইকন */}
              <div className="text-6xl -mb-4 -mr-2">💰</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
