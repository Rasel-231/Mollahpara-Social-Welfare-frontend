"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, Users, Award, BookOpen } from "lucide-react";

const milestones = [
  { year: "২০২৬", titleBn: "প্রতিষ্ঠা ও যাত্রা", descBn: "মোল্লাপাড়া সমাজ কল্যাণ সংস্থার নতুন পথচলা শুরু।", icon: "🌱" },
  { year: "২০২৭", titleBn: "স্বাস্থ্য কেন্দ্র", descBn: "এলাকায় একটি স্থায়ী কমিউনিটি হেলথ কেয়ার সেন্টার প্রতিষ্ঠা।", icon: "🩺" },
  { year: "২০২৮", titleBn: "কারিগরি প্রশিক্ষণ", descBn: "বেকার যুবকদের জন্য বিনামূল্যে কারিগরি ও আইটি প্রশিক্ষণ কেন্দ্র।", icon: "💻" },
  { year: "২০২৯", titleBn: "পরিবেশ প্রকল্প", descBn: "বৃক্ষরোপণ ও পরিচ্ছন্ন গ্রাম গড়তে ব্যাপক পরিবেশ কর্মসূচি।", icon: "🌿" },
  { year: "২০৩০", titleBn: "স্বনির্ভরতা", descBn: "ক্ষুদ্র উদ্যোক্তাদের সহায়তায় একটি পূর্ণাঙ্গ কো-অপারেটিভ মডেল তৈরি।", icon: "📈" },
  { year: "২০৩১", titleBn: "ভিশন ২০৩১", descBn: "মোল্লাপাড়াকে একটি আদর্শ ও মডেল সমাজ হিসেবে গড়ে তোলা।", icon: "🏆" },
];
const values = [
  { icon: Heart, titleBn: "মানবতা", descBn: "প্রতিটি মানুষের মর্যাদা ও অধিকারের প্রতি শ্রদ্ধাশীল।", color: "text-red-500", bg: "bg-red-50" },
  { icon: Users, titleBn: "একতা", descBn: "সম্মিলিত প্রচেষ্টায় সমাজ পরিবর্তন সম্ভব।", color: "text-welfare-green-600", bg: "bg-welfare-green-50" },
  { icon: Award, titleBn: "সততা", descBn: "স্বচ্ছতা ও জবাবদিহিতা আমাদের মূলনীতি।", color: "text-welfare-gold-600", bg: "bg-welfare-gold-50" },
  { icon: BookOpen, titleBn: "শিক্ষা", descBn: "শিক্ষার মাধ্যমে সমাজের উন্নয়ন।", color: "text-blue-600", bg: "bg-blue-50" },
];

function TimelineItem({ item, index }: { item: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className={`flex ${isLeft ? "flex-row" : "flex-row-reverse"} items-center gap-6 mb-8`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <div className={`welfare-card p-5 ${isLeft ? "ml-auto" : "mr-auto"} max-w-sm`}>
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-end" : "justify-start"}`}>
            <span className="text-2xl">{item.icon}</span>
            <span
              className="text-sm font-bold px-3 py-1 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #166534, #15803d)" }}
            >
              {item.year}
            </span>
          </div>
          <h3 className="font-bold text-welfare-green-800 font-bengali mb-1">{item.titleBn}</h3>
          <p className="text-welfare-green-600 text-sm font-bengali">{item.descBn}</p>
        </div>
      </div>
      {/* Center dot */}
      <div className="flex-shrink-0 w-5 h-5 rounded-full border-4 border-welfare-green-500 bg-white shadow-md z-10" />
      <div className="flex-1" />
    </motion.div>
  );
}

export default function AboutPageView() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-14 shadow-xl"
          style={{ minHeight: 300 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-10 lg:p-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl animate-float">🌿</span>
              <h1 className="text-3xl lg:text-5xl font-bold text-white font-bengali">আমাদের সম্পর্কে</h1>
            </div>
            <p className="text-white font-bengali text-base lg:text-lg leading-8 max-w-2xl">
              মোল্লাপাড়া সমাজ কল্যাণ সংস্থা একটি অলাভজনক সংগঠন যা ২০২৬ সাল থেকে এলাকার মানুষের কল্যাণে নিরলস কাজ করে যাচ্ছে।
            </p>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              Icon: Target,
              titleBn: "আমাদের লক্ষ্য",
              descBn: "এলাকার প্রতিটি মানুষের জীবনমান উন্নয়নে অবদান রাখা। রক্তদান, শিক্ষা, স্বাস্থ্য ও আর্থিক সহায়তার মাধ্যমে একটি সুখী-সমৃদ্ধ সমাজ গড়ে তোলা।",
              gradient: "from-welfare-green-700 to-welfare-green-800",
              delay: 0.1,
            },
            {
              Icon: Eye,
              titleBn: "আমাদের দৃষ্টিভঙ্গি",
              descBn: "এমন একটি সমাজ গড়ার স্বপ্ন যেখানে কোনো মানুষ অসহায় নয়, প্রতিটি শিশু শিক্ষার সুযোগ পাবে এবং সকলের মৌলিক অধিকার নিশ্চিত থাকবে।",
              gradient: "from-welfare-gold-700 to-welfare-gold-800",
              delay: 0.2,
            },
          ].map(({ Icon, titleBn, descBn, gradient, delay }) => (
            <motion.div
              key={titleBn}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay }}
              className="relative rounded-2xl overflow-hidden shadow-lg p-7"
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${gradient.includes("green") ? "#14532d, #166534" : "#92400e, #b45309"})` }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white font-bengali">{titleBn}</h2>
                </div>
                <p className="text-white/85 font-bengali leading-7 text-sm lg:text-base">{descBn}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <div ref={heroRef} className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            className="section-title-center mb-8 font-bengali"
          >
            আমাদের মূল্যবোধ
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, titleBn, descBn, color, bg }, i) => (
              <motion.div
                key={titleBn}
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`welfare-card p-5 text-center`}
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={24} className={color} />
                </div>
                <h3 className={`font-bold font-bengali mb-2 ${color}`}>{titleBn}</h3>
                <p className="text-welfare-green-600 text-xs font-bengali leading-5">{descBn}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="section-title-center mb-12 font-bengali">আমাদের যাত্রা</h2>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-welfare-green-300 via-welfare-green-500 to-welfare-green-300 -translate-x-1/2 hidden md:block" />
            {milestones.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-12 px-8 rounded-3xl"
          style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}
        >
          <h2 className="text-2xl font-bold text-white font-bengali mb-3">আমাদের সাথে যুক্ত হন</h2>
          <p className="text-welfare-green-200 font-bengali mb-6 max-w-lg mx-auto text-sm">
            একসাথে আমরা একটি সুন্দর সমাজ গড়তে পারি। আজই আমাদের স্বেচ্ছাসেবী দলে যোগ দিন।
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/members" className="btn-gold font-bengali">সদস্য হন</a>
            <a href="/donate" className="px-6 py-3 rounded-xl font-semibold font-bengali text-white border-2 border-white/40 hover:bg-white/15 transition-all">অনুদান দিন</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
