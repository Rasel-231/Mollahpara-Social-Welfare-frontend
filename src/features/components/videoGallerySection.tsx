"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Play, X, Eye, Clock } from "lucide-react";
import { useGetAllVideosQuery } from "@/Redux/api/videoApi";
import { extractYoutubeId } from "@/lib/utils";

const mockVideos = [
  {
    id: "v1",
    titleBn: "রক্তদান কর্মসূচি ২০২৩ — হাইলাইটস",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "৫:৩২",
    publishedAt: "2023-12-01",
    views: 1250,
  },
  {
    id: "v2",
    titleBn: "শীতবস্ত্র বিতরণ ২০২৩",
    thumbnailUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "৩:১৮",
    publishedAt: "2023-11-15",
    views: 890,
  },
  {
    id: "v3",
    titleBn: "স্বাস্থ্য সেবা শিবির ২০২৩",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "৭:০৫",
    publishedAt: "2023-10-20",
    views: 2100,
  },
];

function toBengaliNum(n: number): string {
  const d = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  return n.toString().split("").map(c => /\d/.test(c) ? d[parseInt(c)] : c).join("");
}

function VideoCard({ video, index }: { video: { id: string; titleBn: string; thumbnailUrl: string; youtubeId: string; duration: string; publishedAt: string; views: number }; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12, duration: 0.6 }}
        className="group rounded-2xl overflow-hidden shadow-md cursor-pointer"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.9) 100%)",
          border: "1px solid rgba(22,101,52,0.12)",
        }}
        whileHover={{ y: -5 }}
      >
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "16/9" }}
          onClick={() => setIsPlaying(true)}
        >
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-welfare-green-900/30 group-hover:bg-welfare-green-900/20 transition-colors duration-300" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(22,101,52,0.9), rgba(21,128,61,0.9))",
                backdropFilter: "blur(4px)",
                border: "2px solid rgba(255,255,255,0.4)",
              }}
            >
              <Play size={22} className="text-white fill-white ml-1" />
            </motion.div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-xs font-medium flex items-center gap-1">
            <Clock size={10} />
            <span>{video.duration}</span>
          </div>
        </div>

        {/* Meta */}
        <div className="p-4">
          <h4 className="font-bold text-welfare-green-800 text-sm font-bengali leading-5 mb-2 line-clamp-2 group-hover:text-welfare-green-600 transition-colors">
            {video.titleBn}
          </h4>
          <div className="flex items-center gap-3 text-welfare-green-500 text-xs">
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {toBengaliNum(video.views ?? 0)} বার দেখা হয়েছে
            </span>
          </div>
        </div>
      </motion.div>

      {/* Inline Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.titleBn}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
              >
                <X size={18} />
              </button>
              <div className="bg-welfare-green-900 px-4 py-3">
                <p className="text-white text-sm font-bengali font-semibold">{video.titleBn}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function VideoGallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { data: videosResponse } = useGetAllVideosQuery("");
  const apiVideos = (videosResponse?.data ?? []).map((v) => {
    const youtubeId = extractYoutubeId(v.videoUrl) ?? "";
    return {
      id: v.id,
      titleBn: v.title,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      youtubeId,
      duration: "",
      publishedAt: new Date(v.createdAt).toISOString().split("T")[0],
      views: 0,
    };
  });
  const videos = apiVideos.length > 0 ? apiVideos : mockVideos;

  return (
    <section ref={ref} className="py-12 lg:py-16 parchment-bg">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="section-divider mb-4">
            <span className="text-base animate-float">🍃</span>
            <h2 className="section-title-center">ভিডিও গ্যালারি</h2>
            <span className="text-base animate-float">🍃</span>
          </div>
          <p className="text-welfare-green-600 font-bengali text-sm">
            আমাদের কার্যক্রমের ভিডিও সংকলন
          </p>
        </motion.div>

        {/* Main featured video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
        >
          <VideoCard video={videos[0]} index={0} />
        </motion.div>

        {/* Sub videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {videos.slice(1).map((video, i) => (
            <VideoCard key={video.id} video={video} index={i + 1} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link href="/gallery#videos">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary font-bengali"
            >
              সব ভিডিও দেখুন
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
