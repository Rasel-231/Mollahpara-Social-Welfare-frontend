"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useGetNewsByIdQuery } from "@/Redux/api/newsApi";
import OrangeSpinner from "@/components/shared/OrangeSpinner";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";

function formatDate(value?: string | Date | null): string {
  if (!value) return "উল্লেখ নেই";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "উল্লেখ নেই";
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: response, isLoading, isError } = useGetNewsByIdQuery(id);
  const news = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <OrangeSpinner />
      </div>
    );
  }

  if (isError || !news) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">📰</div>
          <h2 className="text-lg font-bold text-welfare-green-800 font-bengali mb-2">
            সংবাদ খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-sm text-welfare-green-500 font-bengali mb-6">
            এই আইডির কোনো সংবাদ পাওয়া যায়নি।
          </p>
          <button
            onClick={() => router.push("/news")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold font-bengali text-white shadow-md"
            style={{
              background: "linear-gradient(135deg, #166534, #15803d)",
            }}
          >
            সংবাদ তালিকায় ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/news")}
          className="flex items-center gap-2 text-welfare-green-600 hover:text-welfare-green-800 font-bengali text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          সংবাদ তালিকায় ফিরে যান
        </motion.button>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="welfare-card overflow-hidden"
        >
          {/* Image */}
          {news.image && (
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 lg:p-10">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {news.publishedAt && (
                <span className="flex items-center gap-1.5 text-welfare-green-500 text-xs font-bengali">
                  <Calendar size={12} />
                  {formatDate(news.publishedAt)}
                </span>
              )}
              {news.author && (
                <span className="flex items-center gap-1.5 text-welfare-green-500 text-xs font-bengali">
                  <User size={12} />
                  {news.author.name}
                </span>
              )}
              {!news.published && (
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-yellow-100 text-yellow-700 font-bengali">
                  খসড়া
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-welfare-green-800 font-bengali leading-tight mb-6">
              {news.title}
            </h1>

            {/* Divider */}
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-welfare-green-500 to-welfare-gold-500 mb-6" />

            {/* Body */}
            <div className="prose prose-lg max-w-none font-bengali text-welfare-green-700 leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>
          </div>
        </motion.article>

        {/* Bottom nav */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/news")}
            className="px-6 py-3 rounded-xl text-sm font-semibold font-bengali text-white shadow-md transition-all hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #166534, #15803d)",
            }}
          >
            সকল সংবাদ দেখুন
          </button>
        </div>
      </div>
    </div>
  );
}
