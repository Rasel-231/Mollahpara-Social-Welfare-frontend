"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useGetAllNewsQuery } from "@/Redux/api/newsApi";
import type { INews } from "@/Redux/api/newsApi";
import OrangeSpinner from "@/components/shared/OrangeSpinner";

function getExcerpt(content: string): string {
  if (!content) return "";
  return content.length > 100 ? content.slice(0, 100) + "..." : content;
}

function formatDate(value?: string | Date | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsCard({ article, delay }: { article: INews; delay: number }) {
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
      {article.image && (
        <div className="relative h-44 overflow-hidden rounded-t-2xl">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${article.image})` }}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-welfare-green-800 text-sm lg:text-base leading-6 mb-2 font-bengali line-clamp-2 group-hover:text-welfare-green-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-welfare-green-600 text-xs leading-5 font-bengali line-clamp-2 mb-3">
          {getExcerpt(article.content)}
        </p>
        <div className="flex items-center gap-1.5 text-welfare-green-500 text-xs">
          <Calendar size={11} />
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { data: response, isLoading } = useGetAllNewsQuery("");
  const news: INews[] = response?.data ?? [];

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
        {isLoading ? (
          <div className="flex justify-center py-10">
            <OrangeSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.slice(0, 3).map((article, i) => (
              <Link key={article.id} href={`/news/${article.id}`}>
                <NewsCard article={article} delay={i * 0.12} />
              </Link>
            ))}
          </div>
        )}

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
