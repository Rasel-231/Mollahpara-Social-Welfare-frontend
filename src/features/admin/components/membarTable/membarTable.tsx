"use client";

import { useState } from "react";
import { Search, Edit2, Trash2, Settings } from "lucide-react";
import Image from "next/image";
import AddMemberModal from "@/components/shared/Modal/addMemberModal";

const members = [
  { id: 1, name: "রাসেল হাসান", role: "সদস্য", phone: "০১৭১-১২৩৪৫৬৭", blood: "B+", status: "সক্রিয়", img: "/avatar.jpg" },
  { id: 2, name: "আদল নিধন", role: "এডমিন", phone: "০১৭১-৯৮৭৬৫৪৩", blood: "B-", status: "সক্রিয়", img: "/avatar.jpg" },
  { id: 3, name: "রাসেল হাসান", role: "সদস্য", phone: "০১৭২-১১২২৩৩৩", blood: "B", status: "নিষ্ক্রিয়", img: "/avatar.jpg" },
];

export default function MemberTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#1a1c21] border border-gray-800 rounded-2xl p-6 text-white">
      {/* Search & Header */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
          <input type="text" placeholder="সদস্য খুঁজুন..." className="w-full bg-[#121417] border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-sm" />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 px-6 rounded-lg font-bold text-sm"
        >
          + নতুন সদস্য
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-700/50">
              <th className="pb-4 font-normal">নাম</th>
              <th className="pb-4 font-normal">ভূমিকা</th>
              <th className="pb-4 font-normal">ফোন</th>
              <th className="pb-4 font-normal">রক্ত</th>
              <th className="pb-4 font-normal">অবস্থা</th>
              <th className="pb-4 font-normal text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600 relative">
                    <Image src={m.img} alt={m.name} fill className="object-cover" />
                  </div>
                  <span className="font-medium">{m.name}</span>
                </td>
                <td className="py-4">{m.role}</td>
                <td className="py-4">{m.phone}</td>
                <td className="py-4">{m.blood}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] ${m.status === "সক্রিয়" ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400"}`}>
                    {m.status}
                  </span>
                </td>
                <td className="py-4 text-right flex justify-end gap-2">
                  <button className="p-2 bg-gray-800 rounded-lg text-emerald-500"><Settings size={16}/></button>
                  <button className="p-2 bg-gray-800 rounded-lg text-emerald-500"><Edit2 size={16}/></button>
                  <button className="p-2 bg-red-900/30 rounded-lg text-red-500"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {members.map((m) => (
          <div key={m.id} className="bg-[#121417] p-4 rounded-xl border border-gray-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600 relative flex-shrink-0">
              <Image src={m.img} alt={m.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-bold">{m.name}</p>
              <p className="text-xs text-gray-400">{m.role} • {m.phone}</p>
            </div>
            <div className="flex gap-2">
               <button className="p-2 bg-gray-800 rounded-lg text-emerald-500"><Edit2 size={16}/></button>
               <button className="p-2 bg-red-900/30 rounded-lg text-red-500"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 text-sm">
        <button className="px-3 py-1 border border-gray-700 rounded-md hover:bg-gray-800">পূর্ববর্তী</button>
        {[1, 2, 3].map(n => (
          <button key={n} className={`w-8 h-8 rounded-md ${n === 1 ? 'bg-emerald-600' : 'bg-[#121417] hover:bg-gray-800'}`}>{n}</button>
        ))}
        <button className="px-3 py-1 border border-gray-700 rounded-md hover:bg-gray-800">পরবর্তী</button>
      </div>

      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}