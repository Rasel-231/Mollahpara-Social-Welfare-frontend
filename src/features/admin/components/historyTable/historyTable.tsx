"use client";

import { Edit2, Trash2 } from "lucide-react";

const projects = [
  { name: "রক্তদান কর্মসূচি", desc: "জরুরী রক্ত সরবরাহ", date: "০৩/০৬/২০২৬", totalSpent: "৫,০০০" },
  { name: "ত্রাণ ও পুনর্বাসন", desc: "বন্যা দূর্গতদের সহায়তা", date: "০৩/০৬/২০২৬", totalSpent: "১২,০০০" },
  { name: "শিক্ষা সহায়তা", desc: "দরিদ্র শিক্ষার্থীদের উপকরণ", date: "০২/০৬/২০২৬", totalSpent: "৮,৫০০" },
];

export default function RecentProjectsTable() {
  return (
    <div className="bg-[#1a1c21] border border-gray-800 rounded-2xl p-4 md:p-6 shadow-sm mt-6">
      <h2 className="text-white text-lg md:text-xl font-bold mb-4">প্রকল্প ও খরচের হিসাব</h2>

      {/* ডেস্কটপের জন্য টেবিল */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-800">
              <th className="pb-4 font-normal">প্রকল্পের নাম</th>
              <th className="pb-4 font-normal">বিবরণ</th>
              <th className="pb-4 font-normal">তারিখ</th>
              <th className="pb-4 font-normal">খরচ</th>
              <th className="pb-4 font-normal text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {projects.map((p, i) => (
              <tr key={i} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                <td className="py-4 font-medium">{p.name}</td>
                <td className="py-4 text-gray-400 text-sm">{p.desc}</td>
                <td className="py-4 text-gray-400">{p.date}</td>
                <td className="py-4 font-bold text-emerald-400">৳ {p.totalSpent}</td>
                <td className="py-4 text-right flex justify-end gap-3">
                  <button className="text-blue-400"><Edit2 size={16} /></button>
                  <button className="text-red-400"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* মোবাইলের জন্য কার্ড ভিউ */}
      <div className="md:hidden space-y-4">
        {projects.map((p, i) => (
          <div key={i} className="bg-[#121417] p-4 rounded-xl border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-bold">{p.name}</h3>
              <span className="text-emerald-400 font-bold text-sm">৳ {p.totalSpent}</span>
            </div>
            <p className="text-gray-400 text-xs mb-3">{p.desc} • {p.date}</p>
            <div className="flex justify-end gap-4 border-t border-gray-800 pt-3">
              <button className="text-blue-400 text-xs flex items-center gap-1"><Edit2 size={14} /> এডিট</button>
              <button className="text-red-400 text-xs flex items-center gap-1"><Trash2 size={14} /> ডিলিট</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}