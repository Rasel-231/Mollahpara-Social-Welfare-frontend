"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",
    alt: "রক্তদান কার্যক্রম",
    category: "bloodDonation",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    alt: "ত্রাণ বিতরণ",
    category: "relief",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80",
    alt: "সেবা কার্যক্রম",
    category: "event",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    alt: "চিকিৎসা সেবা",
    category: "relief",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80",
    alt: "সম্প্রদায় উন্নয়ন",
    category: "event",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
    alt: "শিক্ষা কার্যক্রম",
    category: "education",
  },
];

interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

function GalleryCard({ item, onClick }: { item: GalleryImageItem; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md"
      style={{ aspectRatio: "4/3" }}
      onClick={onClick}
    >
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${item.src})` }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-welfare-green-900/0 group-hover:bg-welfare-green-900/50 transition-all duration-300 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <ZoomIn size={18} className="text-welfare-green-800" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(null);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl animate-float">🌿</span>
            <h2 className="section-title">গ্যালারি</h2>
          </div>
          <Link
            href="/gallery"
            className="text-welfare-green-600 hover:text-welfare-green-800 font-medium text-sm font-bengali flex items-center gap-1 hover:gap-2 transition-all duration-200"
          >
            See all →
          </Link>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {galleryImages.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <GalleryCard item={item} onClick={() => setSelectedImage(item)} />
            </motion.div>
          ))}
        </div>

        {/* Second row of same images for demo */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mt-2 md:mt-3">
          {[...galleryImages].reverse().map((item, i) => (
            <motion.div
              key={`${item.id}-rev`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.5 }}
            >
              <GalleryCard
                item={{ ...item, id: `${item.id}-r` }}
                onClick={() => setSelectedImage(item)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src.replace("w=400", "w=900")}
              alt={selectedImage.alt}
              className="w-full h-auto"
                width={900}
                height={675}
                fill

            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}