"use client";

import { useGetAllCostingsQuery } from "@/Redux/api/costingApi";
import { useGetAllProjectFundsQuery } from "@/Redux/api/projectFundApi";
import { Loader2 } from "lucide-react";

const projectStatusBn: Record<string, string> = {
  PLANNING: "পরিকল্পনা",
  ONGOING: "চলমান",
  COMPLETED: "সম্পন্ন",
  CANCELLED: "বাতিল",
};

const projectStatusColor: Record<string, string> = {
  COMPLETED: "bg-emerald-900/50 text-emerald-400",
  ONGOING: "bg-blue-900/50 text-blue-400",
  CANCELLED: "bg-red-900/50 text-red-400",
  PLANNING: "bg-gray-800 text-gray-400",
};

export default function RecentProjectsTable() {
  const { data: costingResponse, isLoading: costingLoading } = useGetAllCostingsQuery();
  const { data: projectFundResponse, isLoading: pfLoading } = useGetAllProjectFundsQuery();

  if (costingLoading || pfLoading) {
    return (
      <div className="bg-[#1a1c21] border border-gray-800 rounded-2xl p-4 md:p-6 shadow-sm mt-6">
        <div className="text-center py-10 flex items-center justify-center gap-3">
          <Loader2 className="text-emerald-400 animate-spin" size={20} />
          <span className="text-gray-400 text-sm">লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  const costings = costingResponse?.data ?? [];
  const projectFunds = projectFundResponse?.data ?? [];

  const recentCostings = [...costings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentProjects = [...projectFunds]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Recent Costings */}
      <div className="bg-[#1a1c21] border border-gray-800 rounded-2xl p-4 md:p-6 shadow-sm">
        <h2 className="text-white text-lg md:text-xl font-bold mb-4">সাম্প্রতিক খরচের হিসাব</h2>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-800">
                <th className="pb-4 font-normal">খাত</th>
                <th className="pb-4 font-normal">বিবরণ</th>
                <th className="pb-4 font-normal">তারিখ</th>
                <th className="pb-4 font-normal">পরিমাণ</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {recentCostings.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-gray-500">কোনো খরচ নেই</td></tr>
              ) : recentCostings.map((c) => (
                <tr key={c.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                  <td className="py-4 font-medium">{c.projectName}</td>
                  <td className="py-4 text-gray-400 text-sm">{c.description || "—"}</td>
                  <td className="py-4 text-gray-400">{new Date(c.createdAt).toLocaleDateString("bn-BD")}</td>
                  <td className="py-4 font-bold text-red-400">-৳{Number(c.costing).toLocaleString("bn-BD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {recentCostings.length === 0 ? (
            <p className="text-center text-gray-500 py-6">কোনো খরচ নেই</p>
          ) : recentCostings.map((c) => (
            <div key={c.id} className="bg-[#121417] p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-bold">{c.projectName}</h3>
                <span className="text-red-400 font-bold text-sm">-৳{Number(c.costing).toLocaleString("bn-BD")}</span>
              </div>
              <p className="text-gray-400 text-xs">{c.description || "—"} • {new Date(c.createdAt).toLocaleDateString("bn-BD")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-[#1a1c21] border border-gray-800 rounded-2xl p-4 md:p-6 shadow-sm">
        <h2 className="text-white text-lg md:text-xl font-bold mb-4">প্রকল্প ও তহবিল</h2>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-800">
                <th className="pb-4 font-normal">প্রকল্প</th>
                <th className="pb-4 font-normal">লক্ষ্যমাত্রা</th>
                <th className="pb-4 font-normal">সংগৃহীত</th>
                <th className="pb-4 font-normal">ক্যাটাগরি</th>
                <th className="pb-4 font-normal">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {recentProjects.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500">কোনো প্রকল্প নেই</td></tr>
              ) : recentProjects.map((p) => (
                <tr key={p.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                  <td className="py-4 font-medium">{p.title}</td>
                  <td className="py-4 text-gray-400">৳{Number(p.amount).toLocaleString("bn-BD")}</td>
                  <td className="py-4 text-emerald-400 font-bold">৳{Number(p.raised).toLocaleString("bn-BD")}</td>
                  <td className="py-4 text-gray-400">{p.category}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${projectStatusColor[p.status] ?? "bg-gray-800 text-gray-400"}`}>
                      {projectStatusBn[p.status] ?? p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {recentProjects.length === 0 ? (
            <p className="text-center text-gray-500 py-6">কোনো প্রকল্প নেই</p>
          ) : recentProjects.map((p) => (
            <div key={p.id} className="bg-[#121417] p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-bold">{p.title}</h3>
                <span className="text-emerald-400 font-bold text-sm">৳{Number(p.raised).toLocaleString("bn-BD")}</span>
              </div>
              <p className="text-gray-400 text-xs">{p.category} • ৳{Number(p.amount).toLocaleString("bn-BD")} লক্ষ্যমাত্রা</p>
              <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-bold ${projectStatusColor[p.status] ?? "bg-gray-800 text-gray-400"}`}>
                {projectStatusBn[p.status] ?? p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}