"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { X, ZoomIn } from "lucide-react";
import OrangeSpinner from "@/components/shared/OrangeSpinner";
import Image from "next/image";
import { useGetAllGalleriesQuery } from "@/Redux/api/galleryApi";

interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryImageItem;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md"
      style={{ aspectRatio: "4/3" }}
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(
    null,
  );
  const { data: galleryData, isLoading } = useGetAllGalleriesQuery("");

  const galleryImages: GalleryImageItem[] = (galleryData?.data ?? [])
    .slice(0, 12)
    .map((g) => ({
      id: g.id,
      src: g.image,
      alt: g.title,
      category: g.category?.name ?? "other",
    }));

  if (isLoading) {
    return (
      <section ref={ref} className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-center py-20">
          <OrangeSpinner />
        </div>
      </section>
    );
  }

  if (galleryImages.length === 0) return null;

  const row1 = galleryImages.slice(0, 6);
  const row2 = galleryImages.slice(6, 12);

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

        {/* Image Grid - Row 1 */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {row1.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <GalleryCard item={item} onClick={() => setSelectedImage(item)} />
            </motion.div>
          ))}
        </div>

        {/* Image Grid - Row 2 */}
        {row2.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mt-2 md:mt-3">
            {row2.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ delay: 0.5 + i * 0.06, duration: 0.5 }}
              >
                <GalleryCard
                  item={item}
                  onClick={() => setSelectedImage(item)}
                />
              </motion.div>
            ))}
          </div>
        )}
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
            className="relative w-[90vw] h-[90vh] max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors z-10"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
