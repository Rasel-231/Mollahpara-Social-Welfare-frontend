"use client";
import { useParams, useRouter } from "next/navigation";
import { LayoutGrid, Video, ImageIcon, Newspaper, LucideIcon } from "lucide-react";
import { MediaTable } from "@/features/admin/components/media/mediaTable";

export default function CategoryDetailsPage() {
  const { category } = useParams();
  const router = useRouter();

  // ইংরেজি ক্যাটাগরি নামগুলোকে বাংলায় রূপান্তর করার ম্যাপ
  const bengaliNameMap: Record<string, string> = {
    projects: "প্রকল্প",
    blogs: "ব্লগ ও সংবাদ",
    videos: "ভিডিও গ্যালারি",
    images: "চিত্র গ্যালারি",
  };

  const iconMap: Record<string, LucideIcon> = {
    projects: LayoutGrid,
    blogs: Newspaper,
    videos: Video,
    images: ImageIcon,
  };
  
  const SelectedIcon = iconMap[category as string] || Newspaper;
  const currentCategoryName = bengaliNameMap[category as string] || "মিডিয়া";

  // ডাটার শিরোনামও যাতে বাংলায় দেখায়
  const sampleData = [{ id: "1", title: `নমুনা ${currentCategoryName} আইটেম` }];

  return (
    // এখানে p-4 ব্যবহার করা হয়েছে মোবাইলের জন্য এবং md:p-8 বড় স্ক্রিনের জন্য
    <div className="min-h-screen bg-[#0b0e14] p-4 md:p-8 text-white">
      
      <MediaTable 
        title={`${currentCategoryName} ম্যানেজমেন্ট`} 
        icon={SelectedIcon} 
        data={sampleData} 
        onBack={() => router.back()} 
      />
    </div>
  );
}