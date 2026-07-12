"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Video, ImageIcon, Newspaper } from "lucide-react";
import { SectionCard } from "./sectionCard";
import { useCreateVideoMutation } from "@/Redux/api/videoApi";
import { useCreateNewsMutation } from "@/Redux/api/newsApi";
import { useCreateGalleryMutation } from "@/Redux/api/galleryApi";
import { useCreateEventMutation } from "@/Redux/api/upcomingEventApi";
import { useProfileQuery } from "@/Redux/api/authApi";
import { toast } from "react-toastify";

export default function MediaUploadPage() {
  const router = useRouter();
  const { data: user } = useProfileQuery();
  const authorId = user?.data?.id;

  // ─── Video ─────────────────────────────────────
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [createVideo, { isLoading: creatingVideo }] = useCreateVideoMutation();

  // ─── Project ────────────────────────────────────
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [createEvent, { isLoading: creatingEvent }] = useCreateEventMutation();

  // ─── Blog ──────────────────────────────────────
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogFile, setBlogFile] = useState<File | null>(null);
  const blogFileRef = useRef<HTMLInputElement>(null);
  const [createNews, { isLoading: creatingNews }] = useCreateNewsMutation();

  // ─── Gallery ────────────────────────────────────
  const [galleryCaption, setGalleryCaption] = useState("");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const [createGallery, { isLoading: creatingGallery }] =
    useCreateGalleryMutation();

  // ─── Handlers ──────────────────────────────────

  const handleSaveVideo = async () => {
    if (!videoTitle.trim() || !videoUrl.trim()) {
      toast.error("শিরোনাম এবং লিঙ্ক উভয়ই প্রয়োজন।");
      return;
    }
    try {
      await createVideo({ title: videoTitle, videoUrl }).unwrap();
      toast.success("ভিডিও সংরক্ষণ করা হয়েছে।");
      setVideoTitle("");
      setVideoUrl("");
    } catch {
      toast.error("ভিডিও সেভ করতে সমস্যা হয়েছে।");
    }
  };

  const handleSaveProject = async () => {
    if (!projectTitle.trim()) {
      toast.error("প্রকল্পের নাম প্রয়োজন।");
      return;
    }
    if (!authorId) {
      toast.error("লগইন তথ্য পাওয়া যায়নি।");
      return;
    }
    try {
      await createEvent({
        title: projectTitle,
        description: projectDesc,
        date: new Date().toISOString(),
        createdBy: authorId,
      }).unwrap();
      toast.success("প্রকল্প সংরক্ষণ করা হয়েছে।");
      setProjectTitle("");
      setProjectDesc("");
    } catch {
      toast.error("প্রকল্প সেভ করতে সমস্যা হয়েছে।");
    }
  };

  const handlePublishBlog = async () => {
    if (!blogTitle.trim() || !blogContent.trim()) {
      toast.error("শিরোনাম এবং বিবরণ প্রয়োজন।");
      return;
    }
    if (!authorId) {
      toast.error("লগইন তথ্য পাওয়া যায়নি।");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("title", blogTitle);
      fd.append("content", blogContent);
      fd.append("authorId", authorId);
      if (blogFile) fd.append("file", blogFile);
      await createNews(fd).unwrap();
      toast.success("ব্লগ প্রকাশিত হয়েছে।");
      setBlogTitle("");
      setBlogContent("");
      setBlogFile(null);
      if (blogFileRef.current) blogFileRef.current.value = "";
    } catch {
      toast.error("ব্লগ পাবলিশ করতে সমস্যা হয়েছে।");
    }
  };

  const handleUploadGallery = async () => {
    if (!galleryCaption.trim() || !galleryFile) {
      toast.error("ক্যাপশন এবং ছবি উভয়ই প্রয়োজন।");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("title", galleryCaption);
      fd.append("file", galleryFile);
      await createGallery(fd).unwrap();
      toast.success("ছবি আপলোড করা হয়েছে।");
      setGalleryCaption("");
      setGalleryFile(null);
      if (galleryFileRef.current) galleryFileRef.current.value = "";
    } catch {
      toast.error("ছবি আপলোড করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <SectionCard
          title="প্রধান প্রকল্প"
          icon={LayoutGrid}
          onSeeAll={() => router.push("/dashboard/media/projects")}
        >
          <input
            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600"
            placeholder="প্রকল্পের নাম"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <textarea
            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 h-20 text-white text-sm md:text-base placeholder:text-gray-600 resize-none"
            placeholder="বিস্তারিত বর্ণনা"
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
          />
          <button
            onClick={handleSaveProject}
            disabled={creatingEvent}
            className="w-full bg-emerald-600 py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            {creatingEvent ? "সেভ হচ্ছে..." : "আপলোড প্রজেক্ট"}
          </button>
        </SectionCard>

        <SectionCard
          title="ব্লগ ও সংবাদ"
          icon={Newspaper}
          onSeeAll={() => router.push("/dashboard/media/blogs")}
        >
          <input
            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600"
            placeholder="শিরোনাম"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <textarea
            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 h-20 text-white text-sm md:text-base placeholder:text-gray-600 resize-none"
            placeholder="বিস্তারিত বর্ণনা"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <div className="w-full mb-3">
            <input
              ref={blogFileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setBlogFile(e.target.files?.[0] ?? null)}
              className="w-full text-xs md:text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 file:cursor-pointer"
            />
          </div>
          <button
            onClick={handlePublishBlog}
            disabled={creatingNews}
            className="w-full bg-emerald-600 py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            {creatingNews ? "পাবলিশ হচ্ছে..." : "পাবলিশ করুন"}
          </button>
        </SectionCard>

        <SectionCard
          title="ভিডিও গ্যালারি"
          icon={Video}
          onSeeAll={() => router.push("/dashboard/media/videos")}
        >
          <input
            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600"
            placeholder="ভিডিও শিরোনাম"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
          <input
            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600"
            placeholder="ইউটিউব লিঙ্ক"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button
            onClick={handleSaveVideo}
            disabled={creatingVideo}
            className="w-full bg-emerald-600 py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            {creatingVideo ? "সেভ হচ্ছে..." : "ভিডিও সেভ করুন"}
          </button>
        </SectionCard>

        <SectionCard
          title="চিত্র গ্যালারি"
          icon={ImageIcon}
          onSeeAll={() => router.push("/dashboard/media/images")}
        >
          <input
            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600"
            placeholder="ছবির ক্যাপশন"
            value={galleryCaption}
            onChange={(e) => setGalleryCaption(e.target.value)}
          />
          <div className="w-full mb-3">
            <input
              ref={galleryFileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setGalleryFile(e.target.files?.[0] ?? null)}
              className="w-full text-xs md:text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 file:cursor-pointer"
            />
          </div>
          <button
            onClick={handleUploadGallery}
            disabled={creatingGallery}
            className="w-full bg-emerald-600 py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            {creatingGallery ? "আপলোড হচ্ছে..." : "ছবি আপলোড"}
          </button>
        </SectionCard>
      </div>
    </div>
  );
}
