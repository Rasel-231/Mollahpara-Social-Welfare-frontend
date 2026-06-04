"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatItemProps {
  icon: string;
  value: string;
  numericValue: number;
  suffix: string;
  labelBn: string;
  delay: number;
  accentColor: string;
}

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const toBengali = (n: number): string => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return n
      .toString()
      .split("")
      .map((d) => (/\d/.test(d) ? bengaliDigits[parseInt(d)] : d))
      .join("");
  };

  return (
    <span>
      {toBengali(count)}
      {suffix}
    </span>
  );
}

function StatCard({ icon, numericValue, suffix, labelBn, delay, accentColor }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="stat-card group cursor-default"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Glowing background accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-xl"
        style={{ background: accentColor }}
      />

      {/* Icon */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        className="text-4xl mb-3 select-none"
      >
        {icon}
      </motion.div>

      {/* Counter */}
      <div
        className="text-3xl lg:text-4xl font-bold mb-1 font-bengali"
        style={{ color: accentColor }}
      >
        {isInView ? (
          <AnimatedCounter value={numericValue} suffix={suffix} />
        ) : (
          "০"
        )}
      </div>

      {/* Label */}
      <p className="text-welfare-green-700 font-medium text-sm font-bengali">{labelBn}</p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
    </motion.div>
  );
}

const stats: StatItemProps[] = [
  {
    icon: "🩸",
    value: "১০০০+",
    numericValue: 1000,
    suffix: "+",
    labelBn: "স্বেচ্ছাসেবী",
    delay: 0.1,
    accentColor: "#dc2626",
  },
  {
    icon: "📚",
    value: "৫০০+",
    numericValue: 500,
    suffix: "+",
    labelBn: "রক্তদান",
    delay: 0.2,
    accentColor: "#166534",
  },
  {
    icon: "🏥",
    value: "২০০+",
    numericValue: 200,
    suffix: "+",
    labelBn: "নিরাময় সেবা",
    delay: 0.3,
    accentColor: "#b45309",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    value: "৫০০+",
    numericValue: 500,
    suffix: "+",
    labelBn: "পরিবার সেবা",
    delay: 0.4,
    accentColor: "#0369a1",
  },
  {
    icon: "🎓",
    value: "২০০+",
    numericValue: 200,
    suffix: "+",
    labelBn: "শিক্ষা বৃত্তি",
    delay: 0.5,
    accentColor: "#6d28d9",
  },
  {
    icon: "🤝",
    value: "২০০+",
    numericValue: 200,
    suffix: "+",
    labelBn: "মানবিক সেবা",
    delay: 0.6,
    accentColor: "#0891b2",
  },
];

export default function ImpactStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
<section className="py-16 lg:py-20 relative overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-welfare-green-50/30 to-welfare-gold-50/20" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-welfare-green-50 border border-welfare-green-200 mb-4">
            <span className="text-welfare-green-600 text-lg">🌟</span>
            <h2 className="text-xl lg:text-2xl font-bold text-welfare-green-800 font-bengali">
              Impact at a Glance
            </h2>
            <span className="text-welfare-green-600 text-lg">🌟</span>
          </div>
          <p className="text-welfare-green-600 font-bengali text-sm lg:text-base max-w-xl mx-auto">
            আমাদের কার্যক্রমের সারসংক্ষেপ — সংখ্যায় যা বলছে আমাদের অর্জন
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {stats.map((stat) => (
            <StatCard key={stat.labelBn} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}