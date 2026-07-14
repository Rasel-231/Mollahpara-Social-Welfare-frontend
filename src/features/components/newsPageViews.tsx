"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Tag, ArrowRight, Search } from "lucide-react";
import { useGetAllNewsQuery } from "@/Redux/api/newsApi";
import type { INews } from "@/Redux/api/newsApi";
import OrangeSpinner from "@/components/shared/OrangeSpinner";
import Link from "next/link";

type NewsCategory = "all" | "news" | "blog" | "announcement" | "event";

const categoryInfo: Record<string, { label: string; color: string; bg: string }> = {
  news: { label: "সংবাদ", color: "text-blue-700", bg: "bg-blue-100" },
  event: { label: "অনুষ্ঠান", color: "text-welfare-gold-700", bg: "bg-welfare-gold-100" },
  announcement: { label: "ঘোষণা", color: "text-welfare-green-700", bg: "bg-welfare-green-100" },
  blog: { label: "ব্লগ", color: "text-purple-700", bg: "bg-purple-100" },
};

const typeToCategory: Record<string, NewsCategory> = {
  NEWS: "news",
  EVENT: "event",
  ANNOUNCEMENT: "announcement",
  BLOG: "blog",
};

const tabs: { id: NewsCategory; label: string }[] = [
  { id: "all", label: "সব" },
  { id: "news", label: "সংবাদ" },
  { id: "event", label: "অনুষ্ঠান" },
  { id: "announcement", label: "ঘোষণা" },
  { id: "blog", label: "ব্লগ" },
];

function getExcerpt(content: string): string {
  if (!content) return "";
  return content.length > 150 ? content.slice(0, 150) + "..." : content;
}

export default function NewsPageView() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all");
  const [search, setSearch] = useState("");

  const { data: response, isLoading, isError } = useGetAllNewsQuery("");
  const allNews: INews[] = response?.data ?? [];

  const filtered = allNews.filter(n => {
    const cat = typeToCategory[n.type] ?? "news";
    const matchCat = activeCategory === "all" || cat === activeCategory;
    const matchSearch = search === "" || n.title.includes(search);
    return matchCat && matchSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <OrangeSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-3">📋</div>
          <p className="text-welfare-green-500 font-bengali">সংবাদ লোড করা যায়নি</p>
        </div>
      </div>
    );
  }

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
          <Link href={`/news/${filtered[0].id}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="welfare-card overflow-hidden mb-8 group cursor-pointer"
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col md:flex-row">
                {filtered[0].image && (
                  <div className="md:w-2/5 h-60 md:h-auto relative overflow-hidden">
                    <div
                      className="w-full h-full min-h-60 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${filtered[0].image})` }}
                    />
                  </div>
                )}
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${categoryInfo[typeToCategory[filtered[0].type]]?.bg ?? "bg-gray-100"} ${categoryInfo[typeToCategory[filtered[0].type]]?.color ?? "text-gray-700"}`}>
                      {categoryInfo[typeToCategory[filtered[0].type]]?.label ?? filtered[0].type}
                    </span>
                    <span className="text-welfare-green-400 text-xs">সর্বশেষ</span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-welfare-green-800 font-bengali mb-3 leading-7 group-hover:text-welfare-green-600 transition-colors">
                    {filtered[0].title}
                  </h2>
                  <p className="text-welfare-green-600 font-bengali text-sm leading-6 mb-4">{getExcerpt(filtered[0].content)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-welfare-green-400 text-xs">
                      <Calendar size={11} />
                      <span>{filtered[0].publishedAt ? new Date(filtered[0].publishedAt).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" }) : ""}</span>
                    </div>
                    <span className="text-welfare-green-600 hover:text-welfare-green-800 text-sm font-semibold font-bengali flex items-center gap-1 group-hover:gap-2 transition-all">
                      পড়ুন <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Rest of articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(1).map((article, i) => (
            <Link key={article.id} href={`/news/${article.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.09 }}
                className="welfare-card group cursor-pointer overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {article.image && (
                  <div className="h-44 overflow-hidden rounded-t-2xl relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${article.image})` }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${categoryInfo[typeToCategory[article.type]]?.bg ?? "bg-gray-100"} ${categoryInfo[typeToCategory[article.type]]?.color ?? "text-gray-700"}`}>
                        {categoryInfo[typeToCategory[article.type]]?.label ?? article.type}
                      </span>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-welfare-green-800 text-sm lg:text-base font-bengali leading-6 mb-2 line-clamp-2 group-hover:text-welfare-green-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-welfare-green-500 text-xs font-bengali leading-5 mb-3 line-clamp-2">{getExcerpt(article.content)}</p>
                  <div className="flex items-center gap-1 text-welfare-green-400 text-xs">
                    <Calendar size={11} />
                    <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : ""}</span>
                  </div>
                </div>
              </motion.article>
            </Link>
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
