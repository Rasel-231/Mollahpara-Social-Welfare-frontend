import React from 'react';
import type { Metadata } from "next";
import GalleryPageView from '@/features/components/galleryPageView';
import VideoGallerySection from '@/features/components/videoGallerySection';
export const metadata: Metadata = {
  title: "গ্যালারি | মোল্লাপাড়া সমাজ কল্যাণ সংস্থা",
  description:
    "আমাদের কার্যক্রমের ছবি ও ভিডিও গ্যালারি। রক্তদান, ত্রাণ বিতরণ ও সামাজিক কার্যক্রমের স্মৃতি।",
};
const GalleryPages = () => {
    return (
        <div>
        <GalleryPageView />
        <VideoGallerySection />
        </div>
    );
};

export default GalleryPages;


