"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { NewsArticle } from "../types/types";


const mockNews: NewsArticle[] = [
  {
    id: "1",
    titleBn: "শীতবস্ত্র বিতরণ কর্মসূচি ২০২৩-এর ফলাফল",
    titleEn: "Winter Clothes Distribution Program 2023 Results",
    excerptBn: "এ বছর আমাদের শীতবস্ত্র বিতরণ কর্মসূচিতে ৫০০ পরিবারকে সহায়তা করা হয়েছে।",
    contentBn: "",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&q=80",
    publishedAt: "2023-03-21",
    category: "news",
    author: "সম্পাদকীয় দল",
    slug: "winter-clothes-2023",
    tags: ["ত্রাণ", "শীতকাল"],
  },
  {
    id: "2",
    titleBn: "নতুন স্বেচ্ছাসেবক ওরিয়েন্টেশন",
    titleEn: "New Volunteer Orientation",
    excerptBn: "আমাদের সংস্থায় যোগ দেওয়া নতুন স্বেচ্ছাসেবকদের জন্য বিশেষ প্রশিক্ষণ সম্পন্ন হয়েছে।",
    contentBn: "",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&q=80",
    publishedAt: "2023-03-13",
    category: "event",
    author: "সম্পাদকীয় দল",
    slug: "volunteer-orientation",
    tags: ["স্বেচ্ছাসেবী", "প্রশিক্ষণ"],
  },
  {
    id: "3",
    titleBn: "বার্ষিক স্বাস্থ্য পরীক্ষা শিবিকা",
    titleEn: "Annual Health Check-up Camp",
    excerptBn: "বার্ষিক বিনামূল্যে স্বাস্থ্য পরীক্ষা শিবিকায় ২০০ জনের বেশি সেবা পেয়েছেন।",
    contentBn: "",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80",
    publishedAt: "2023-03-31",
    category: "announcement",
    author: "সম্পাদকীয় দল",
    slug: "health-camp-2023",
    tags: ["স্বাস্থ্য", "সেবা"],
  },
];

const categoryColors: Record<string, string> = {
  news: "bg-blue-100 text-blue-700",
  event: "bg-welfare-gold-100 text-welfare-gold-700",
  announcement: "bg-welfare-green-100 text-welfare-green-700",
  blog: "bg-purple-100 text-purple-700",
};

const categoryLabelsBn: Record<string, string> = {
  news: "সংবাদ",
  event: "অনুষ্ঠান",
  announcement: "ঘোষণা",
  blog: "ব্লগ",
};

function NewsCard({ article, delay }: { article: NewsArticle; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="welfare-card group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-lg text-xs font-semibold font-bengali ${categoryColors[article.category] ?? "bg-gray-100 text-gray-700"}`}
          >
            {categoryLabelsBn[article.category] ?? article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-welfare-green-800 text-sm lg:text-base leading-6 mb-2 font-bengali line-clamp-2 group-hover:text-welfare-green-600 transition-colors">
          {article.titleBn}
        </h3>
        <p className="text-welfare-green-600 text-xs leading-5 font-bengali line-clamp-2 mb-3">
          {article.excerptBn}
        </p>
        <div className="flex items-center gap-1.5 text-welfare-green-500 text-xs">
          <Calendar size={11} />
          <span>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
            <h2 className="section-title-center text-welfare-green-800">
              আমাদের খবর ও ব্লগ
            </h2>
            <span className="text-base animate-float">🍃</span>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockNews.map((article, i) => (
            <Link key={article.id} href={`/news/${article.slug}`}>
              <NewsCard article={article} delay={i * 0.12} />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              সব সংবাদ দেখুন
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}