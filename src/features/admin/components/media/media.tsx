"use client";

import { useRouter } from "next/navigation";
import { LayoutGrid, Video, ImageIcon, Newspaper } from "lucide-react";
import { SectionCard } from "./sectionCard";

export default function MediaUploadPage() {
  const router = useRouter();

  return (
    // মোবাইলে p-4 এবং বড় স্ক্রিনে p-8 প্যাডিং দেওয়া হয়েছে
    <div className="min-h-screen bg-[#0b0e14] p-4 md:p-8">
      
      {/* মোবাইলে ১টি কলাম (grid-cols-1) এবং মাঝারি বা বড় স্ক্রিনে ২টি কলাম (md:grid-cols-2 বা xl:grid-cols-2) হবে।
        এতে মোবাইলে কার্ডগুলো সুন্দরভাবে একটির নিচে আরেকটি নেমে আসবে।
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* প্রতিটি কার্ডে তার নির্দিষ্ট ম্যানেজমেন্ট পেজে যাওয়ার লিঙ্ক */}
        <SectionCard title="প্রধান প্রকল্প" icon={LayoutGrid} onSeeAll={() => router.push('/dashboard/media/projects')}>
           <input className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600" placeholder="প্রকল্পের নাম" />
           <textarea className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 h-20 text-white text-sm md:text-base placeholder:text-gray-600 resize-none" placeholder="বিস্তারিত বর্ণনা" />
           <button className="w-full bg-emerald-600 py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base hover:bg-emerald-700 transition-colors cursor-pointer">আপলোড প্রজেক্ট</button>
        </SectionCard>

        <SectionCard title="ব্লগ ও সংবাদ" icon={Newspaper} onSeeAll={() => router.push('/dashboard/media/blogs')}>
           <input className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600" placeholder="শিরোনাম" />
           <textarea className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 h-20 text-white text-sm md:text-base placeholder:text-gray-600 resize-none" placeholder="বিস্তারিত বর্ণনা" />
           <button className="w-full bg-emerald-600 py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base hover:bg-emerald-700 transition-colors cursor-pointer">পাবলিশ করুন</button>
        </SectionCard>

        <SectionCard title="ভিডিও গ্যালারি" icon={Video} onSeeAll={() => router.push('/dashboard/media/videos')}>
           <input className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600" placeholder="ভিডিও শিরোনাম" />
           <input className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600" placeholder="ইউটিউব লিঙ্ক" />
           <button className="w-full bg-emerald-600 py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base hover:bg-emerald-700 transition-colors cursor-pointer">ভিডিও সেভ করুন</button>
        </SectionCard>

        <SectionCard title="চিত্র গ্যালারি" icon={ImageIcon} onSeeAll={() => router.push('/dashboard/media/images')}>
           <input className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl p-3 mb-3 text-white text-sm md:text-base placeholder:text-gray-600" placeholder="ছবির ক্যাপশন" />
           <div className="w-full mb-3">
             <input type="file" className="w-full text-xs md:text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 file:cursor-pointer" />
           </div>
           <button className="w-full bg-emerald-600 py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base hover:bg-emerald-700 transition-colors cursor-pointer">ছবি আপলোড</button>
        </SectionCard>

      </div>
    </div>
  );
}