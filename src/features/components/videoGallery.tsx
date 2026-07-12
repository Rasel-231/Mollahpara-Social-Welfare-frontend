"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useGetAllVideosQuery } from "@/Redux/api/videoApi";
import { extractYoutubeId } from "@/lib/utils";

export default function VideoGallery() {
  const { data: videosResponse } = useGetAllVideosQuery();
  const videos = videosResponse?.data ?? [];
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = videos[0]
    ? extractYoutubeId(videos[0].videoUrl) ?? "Q5bx9AEHeuE"
    : "Q5bx9AEHeuE";

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C5A86] inline-flex items-center gap-3">
            <span>🌿</span> ভিডিও গ্যালারি <span>🌿</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-video w-full group"
        >
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?si=fnrQVf0qK0ywZIVU&autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              {/* next/image ব্যবহার করা হয়েছে */}
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video Thumbnail"
                fill
                className="object-cover opacity-80"
                priority
              />
              
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <div className="w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}