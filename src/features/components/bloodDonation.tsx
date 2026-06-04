"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BloodDonationSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* কার্ডের আউটলাইন */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col md:flex-row"
        >
          
          {/* বাম দিকের ইমেজ সেকশন */}
          <div className="md:flex-[0.45] h-64 md:h-auto relative">
            <Image 
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80" 
              alt="Blood Donation" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div className="absolute top-4 left-4 text-4xl z-10">💧</div>
          </div>

          {/* ডান দিকের টেক্সট সেকশন */}
          <div className="md:flex-[0.55] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-emerald-950/60 flex items-center justify-center border border-emerald-500/30">
                  <span className="text-xl">🌿</span>
                </div>
                <h3 className="text-2xl font-bold font-bengali">
                  রক্তদান কর্মসূচি
                </h3>
              </div>

              <p className="text-sm md:text-base leading-relaxed mb-8 font-bengali">
                মোল্লাপাড়া সমাজ কল্যাণ সংস্থা — আবেদনের ভিত্তিতে যোগাযোগ করে রক্ত সংগ্রহের ব্যবস্থা করে। জরুরী প্রয়োজনে নিকটবর্তী হাসপাতাল ও ক্লিনিকে রক্ত সরবরাহ করা হয়। দলবদ্ধ শিক্ষার মাধ্যমে মানুষের মানবতার জাগরণের অনলাইন সন্ধান ও বাস্তব কাজের হামাগুড়ি।
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/blood-donation">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg font-bold font-bengali bg-emerald-800 hover:bg-emerald-700 text-white transition-all shadow-lg border border-emerald-600"
                >
                  রক্তের আহ্বান
                </motion.button>
              </Link>
              
              <div className="text-6xl -mb-4 -mr-2">🩸</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}