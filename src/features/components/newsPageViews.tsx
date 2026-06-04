"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Tag, ArrowRight, Search } from "lucide-react";
import { NewsArticle } from "../types/types";


type NewsCategory = "all" | "news" | "blog" | "announcement" | "event";

const allNews: NewsArticle[] = [
  { id: "1", titleBn: "শীতবস্ত্র বিতরণ কর্মসূচি ২০২৩-এর ফলাফল", titleEn: "Winter Clothes 2023", excerptBn: "এ বছর আমাদের শীতবস্ত্র বিতরণ কর্মসূচিতে ৫০০ পরিবারকে সহায়তা করা হয়েছে।", contentBn: "", image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80", publishedAt: "2023-12-21", category: "news", author: "সম্পাদকীয় দল", slug: "winter-2023", tags: ["ত্রাণ"] },
  { id: "2", titleBn: "নতুন স্বেচ্ছাসেবক ওরিয়েন্টেশন সম্পন্ন", titleEn: "Volunteer Orientation", excerptBn: "আমাদের সংস্থায় যোগ দেওয়া ৪৫ জন নতুন স্বেচ্ছাসেবকের প্রশিক্ষণ সফলভাবে সম্পন্ন হয়েছে।", contentBn: "", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80", publishedAt: "2023-11-13", category: "event", author: "সম্পাদকীয় দল", slug: "volunteer-2023", tags: ["স্বেচ্ছাসেবী"] },
  { id: "3", titleBn: "বার্ষিক স্বাস্থ্য পরীক্ষা শিবিকা সফল", titleEn: "Health Camp", excerptBn: "বার্ষিক বিনামূল্যে স্বাস্থ্য পরীক্ষা শিবিকায় ২০০ জনেরও বেশি মানুষ সেবা পেয়েছেন।", contentBn: "", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", publishedAt: "2023-10-31", category: "announcement", author: "সম্পাদকীয় দল", slug: "health-2023", tags: ["স্বাস্থ্য"] },
  { id: "4", titleBn: "রক্তদান ক্যাম্প — অক্টোবর ২০২৩", titleEn: "Blood Donation Camp", excerptBn: "গত মাসে আমাদের রক্তদান ক্যাম্পে ৮০ জন সুস্থ দাতা রক্ত দিয়েছেন।", contentBn: "", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=80", publishedAt: "2023-10-15", category: "news", author: "সম্পাদকীয় দল", slug: "blood-camp-oct-2023", tags: ["রক্তদান"] },
  { id: "5", titleBn: "মানবতার পথে এগিয়ে চলা — একটি গল্প", titleEn: "A Story of Humanity", excerptBn: "আমাদের সংগঠনের পথচলার গল্প, কিভাবে একটি ছোট স্বপ্ন আজ হাজারো মানুষের জীবন বদলে দিচ্ছে।", contentBn: "", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80", publishedAt: "2023-09-22", category: "blog", author: "সভাপতি", slug: "humanity-story", tags: ["অনুপ্রেরণা"] },
  { id: "6", titleBn: "শিক্ষা বৃত্তি প্রোগ্রাম ২০২৩ ঘোষণা", titleEn: "Scholarship 2023", excerptBn: "এ বছর ৫০ জন মেধাবী কিন্তু আর্থিকভাবে অসচ্ছল শিক্ষার্থীকে বৃত্তি দেওয়া হবে।", contentBn: "", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", publishedAt: "2023-08-01", category: "announcement", author: "সম্পাদকীয় দল", slug: "scholarship-2023", tags: ["শিক্ষা"] },
];

const categoryInfo: Record<string, { label: string; color: string; bg: string }> = {
  news: { label: "সংবাদ", color: "text-blue-700", bg: "bg-blue-100" },
  event: { label: "অনুষ্ঠান", color: "text-welfare-gold-700", bg: "bg-welfare-gold-100" },
  announcement: { label: "ঘোষণা", color: "text-welfare-green-700", bg: "bg-welfare-green-100" },
  blog: { label: "ব্লগ", color: "text-purple-700", bg: "bg-purple-100" },
};

const tabs: { id: NewsCategory; label: string }[] = [
  { id: "all", label: "সব" },
  { id: "news", label: "সংবাদ" },
  { id: "event", label: "অনুষ্ঠান" },
  { id: "announcement", label: "ঘোষণা" },
  { id: "blog", label: "ব্লগ" },
];

export default function NewsPageView() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all");
  const [search, setSearch] = useState("");

  const filtered = allNews.filter(n => {
    const matchCat = activeCategory === "all" || n.category === activeCategory;
    const matchSearch = search === "" || n.titleBn.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-10 shadow-xl px-8 lg:px-12 py-12"
          style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}
        >
          <div className="absolute right-8 text-8xl opacity-10 select-none top-1/2 -translate-y-1/2">📰</div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl animate-float">🍃</span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white font-bengali">আমাদের খবর ও ব্লগ</h1>
            </div>
            <p className="text-welfare-green-200 font-bengali text-sm lg:text-base">সাম্প্রতিক কার্যক্রম, ঘোষণা ও গল্পগুলো</p>
          </div>
        </motion.div>

        {/* Search + Filter Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-welfare-green-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="সংবাদ খুঁজুন..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-semibold font-bengali text-sm transition-all duration-300 ${
                  activeCategory === tab.id
                    ? "text-white shadow-lg"
                    : "bg-white border border-welfare-green-200 text-welfare-green-700 hover:bg-welfare-green-50"
                }`}
                style={activeCategory === tab.id ? { background: "linear-gradient(135deg, #166534, #15803d)" } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured article */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="welfare-card overflow-hidden mb-8 group cursor-pointer"
            whileHover={{ y: -4 }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 h-60 md:h-auto relative overflow-hidden">
                <div
                  className="w-full h-full min-h-60 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${filtered[0].image})` }}
                />
              </div>
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${categoryInfo[filtered[0].category]?.bg} ${categoryInfo[filtered[0].category]?.color}`}>
                    {categoryInfo[filtered[0].category]?.label}
                  </span>
                  <span className="text-welfare-green-400 text-xs">সর্বশেষ</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-welfare-green-800 font-bengali mb-3 leading-7 group-hover:text-welfare-green-600 transition-colors">
                  {filtered[0].titleBn}
                </h2>
                <p className="text-welfare-green-600 font-bengali text-sm leading-6 mb-4">{filtered[0].excerptBn}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-welfare-green-400 text-xs">
                    <Calendar size={11} />
                    <span>{new Date(filtered[0].publishedAt).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <span className="text-welfare-green-600 hover:text-welfare-green-800 text-sm font-semibold font-bengali flex items-center gap-1 group-hover:gap-2 transition-all">
                    পড়ুন <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rest of articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(1).map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.09 }}
              className="welfare-card group cursor-pointer overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="h-44 overflow-hidden rounded-t-2xl relative">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${categoryInfo[article.category]?.bg} ${categoryInfo[article.category]?.color}`}>
                    {categoryInfo[article.category]?.label}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-welfare-green-800 text-sm lg:text-base font-bengali leading-6 mb-2 line-clamp-2 group-hover:text-welfare-green-600 transition-colors">
                  {article.titleBn}
                </h3>
                <p className="text-welfare-green-500 text-xs font-bengali leading-5 mb-3 line-clamp-2">{article.excerptBn}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-welfare-green-400 text-xs">
                    <Calendar size={11} />
                    <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="flex items-center gap-0.5 text-welfare-green-500 text-xs">
                        <Tag size={9} />{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-welfare-green-400 font-bengali">
            <div className="text-5xl mb-3">📋</div>
            <p>কোনো সংবাদ পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </div>
  );
}
