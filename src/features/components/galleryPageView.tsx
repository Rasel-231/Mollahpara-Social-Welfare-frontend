"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, Image as ImageIcon } from "lucide-react";

import Image from "next/image";
import { GalleryItem } from "../types/types";

type Category = "all" | "bloodDonation" | "relief" | "education" | "event" | "other";

const categories: { id: Category; labelBn: string; icon: string }[] = [
  { id: "all", labelBn: "সবকিছু", icon: "🌿" },
  { id: "bloodDonation", labelBn: "রক্তদান", icon: "🩸" },
  { id: "relief", labelBn: "ত্রাণ", icon: "🎁" },
  { id: "education", labelBn: "শিক্ষা", icon: "📚" },
  { id: "event", labelBn: "অনুষ্ঠান", icon: "🎊" },
  { id: "other", labelBn: "অন্যান্য", icon: "📸" },
];

const allImages: GalleryItem[] = [
  { id: "1", title: "Blood donation camp", titleBn: "রক্তদান শিবির", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80", category: "bloodDonation", date: "2023-12-01" },
  { id: "2", title: "Winter relief", titleBn: "শীতকালীন ত্রাণ বিতরণ", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80", category: "relief", date: "2023-11-15" },
  { id: "3", title: "Medical camp", titleBn: "চিকিৎসা শিবির", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80", category: "event", date: "2023-10-20" },
  { id: "4", title: "Education support", titleBn: "শিক্ষা সহায়তা", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", category: "education", date: "2023-09-10" },
  { id: "5", title: "Food relief", titleBn: "খাদ্য সহায়তা", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80", category: "relief", date: "2023-08-05" },
  { id: "6", title: "Community event", titleBn: "সাংস্কৃতিক অনুষ্ঠান", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80", category: "event", date: "2023-07-15" },
  { id: "7", title: "Volunteers", titleBn: "স্বেচ্ছাসেবী দল", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80", category: "event", date: "2023-06-20" },
  { id: "8", title: "Health awareness", titleBn: "স্বাস্থ্য সচেতনতা", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", category: "other", date: "2023-05-12" },
  { id: "9", title: "Scholarship distribution", titleBn: "বৃত্তি বিতরণ", image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80", category: "education", date: "2023-04-08" },
  { id: "10", title: "Blood group testing", titleBn: "রক্তের গ্রুপ পরীক্ষা", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=80", category: "bloodDonation", date: "2023-03-22" },
  { id: "11", title: "Food relief 2", titleBn: "বন্যার্ত সহায়তা", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80", category: "relief", date: "2023-02-14" },
  { id: "12", title: "Annual meeting", titleBn: "বার্ষিক সভা", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80", category: "event", date: "2023-01-05" },
];

export default function GalleryPageView() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === "all" ? allImages : allImages.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-10 shadow-xl px-8 lg:px-12 py-12"
          style={{ background: "linear-gradient(135deg, #14532d, #166534, #15803d)" }}
        >
          <div className="absolute right-8 bottom-4 text-8xl opacity-10 select-none">📸</div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl animate-float">🌿</span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white font-bengali">গ্যালারি</h1>
            </div>
            <p className="text-welfare-green-200 font-bengali text-sm lg:text-base max-w-xl">
              আমাদের কার্যক্রমের স্মৃতিময় মুহূর্তগুলো
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold font-bengali text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "text-white shadow-lg"
                  : "bg-white/80 border border-welfare-green-200 text-welfare-green-700 hover:bg-welfare-green-50"
              }`}
              style={
                activeCategory === cat.id
                  ? { background: "linear-gradient(135deg, #166534, #15803d)", boxShadow: "0 4px 14px rgba(22,101,52,0.3)" }
                  : {}
              }
            >
              <span>{cat.icon}</span>
              {cat.labelBn}
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <p className="text-welfare-green-500 text-sm font-bengali mb-5">
          <span className="font-bold text-welfare-green-700">{filtered.length}</span> টি ছবি
        </p>

        {/* Masonry-style grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ delay: i * 0.04, duration: 0.45 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md"
                style={{ aspectRatio: i % 5 === 0 ? "1/1.3" : "4/3" }}
                onClick={() => setSelected(item)}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-welfare-green-900/0 group-hover:bg-welfare-green-900/50 transition-all duration-300 flex items-end p-3">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 w-full">
                    <p className="text-white text-xs font-bold font-bengali leading-4 truncate">{item.titleBn}</p>
                  </div>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
                    <ZoomIn size={14} className="text-welfare-green-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-welfare-green-400 font-bengali">
            <ImageIcon size={48} className="mx-auto mb-3 opacity-40" />
            <p>এই বিভাগে কোনো ছবি নেই</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <Image src={selected.image.replace("w=600", "w=1000")} alt={selected.titleBn} className="w-full h-auto block" fill width={100} height={100} />
              <div className="bg-welfare-green-900 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold font-bengali text-sm">{selected.titleBn}</p>
                  <p className="text-welfare-green-300 text-xs mt-0.5">{new Date(selected.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors ml-4">
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
