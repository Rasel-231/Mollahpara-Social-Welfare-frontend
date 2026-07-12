import { FC } from "react";
import { Edit, Trash, Eye, LucideIcon, Image as ImageIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";

export interface DataRow {
  id: string;
  title: string;
  imageUrl?: string;
  categoryId?: string | null;
  categoryName?: string | null;
  categoryIcon?: string | null;
}

interface MediaTableProps {
  title: string;
  icon: LucideIcon;
  data: DataRow[];
  onBack?: () => void;
  onView?: (item: DataRow) => void;
  onEdit?: (item: DataRow) => void;
  onDelete?: (item: DataRow) => void;
}

export const MediaTable: FC<MediaTableProps> = ({ title, icon: Icon, data, onBack, onView, onEdit, onDelete }) => (
  // মোবাইলের জন্য p-4 এবং বড় স্ক্রিনে p-6 করা হয়েছে
  <div className="bg-[#161a22]/50 border border-white/[0.05] rounded-2xl md:rounded-3xl p-4 md:p-6 backdrop-blur-xl">
    
    {/* হেডার সেকশন: মোবাইলে উপর-নিচ (flex-col) হবে এবং ছোট স্ক্রিনে লেখা ছোট হবে */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-3">
        <Icon className="text-emerald-400 shrink-0" size={20} />
        <h2 className="text-white font-bold text-base md:text-lg">{title}</h2>
      </div>

      {/* ফিরে যান বাটন: মোবাইলে পুরো চওড়া (w-full) যেন না হয় তাই sm:w-auto করা হয়েছে */}
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-4 py-2 text-xs md:text-sm font-medium text-gray-400 bg-white/[0.03] border border-white/[0.05] rounded-xl hover:bg-white/[0.08] hover:text-white transition-all duration-200 cursor-pointer w-fit"
        >
          <ArrowLeft size={16} />
          <span>ফিরে যান</span>
        </button>
      )}
    </div>

    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800">
      <table className="w-full text-left text-gray-400 min-w-[500px]">
        <thead className="text-xs uppercase border-b border-white/[0.05]">
          <tr>
            <th className="pb-3 text-gray-500 font-semibold w-[100px]">থাম্বনেইল</th>
            <th className="pb-3 text-gray-500 font-semibold">শিরোনাম / নাম</th>
            <th className="pb-3 text-right text-gray-500 font-semibold w-[120px]">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-white/[0.02]">
              <td className="py-3">
                <div className="w-12 h-8 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                  {item.imageUrl && item.imageUrl.trim() !== "" ? (
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title || "মিডিয়া থাম্বনেইল"} 
                      className="w-full h-full object-cover" 
                      height={32} 
                      width={48} 
                    />
                  ) : (
                    <ImageIcon className="text-gray-500" size={16} />
                  )}
                </div>
              </td>
              <td className="py-4 font-medium text-white text-sm md:text-base break-words max-w-[200px] md:max-w-none">
                {item.title}
              </td>
              <td className="py-4 text-right">
                <div className="flex justify-end gap-1 md:gap-2">
                  <button onClick={() => onView?.(item)} className="p-2 hover:text-emerald-400 transition-colors" title="দেখুন"><Eye size={16} /></button>
                  <button onClick={() => onEdit?.(item)} className="p-2 hover:text-blue-400 transition-colors" title="এডিট করুন"><Edit size={16} /></button>
                  <button onClick={() => onDelete?.(item)} className="p-2 hover:text-red-400 transition-colors" title="ডিলিট করুন"><Trash size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);