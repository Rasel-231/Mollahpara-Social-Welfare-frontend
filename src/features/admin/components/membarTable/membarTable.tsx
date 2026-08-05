"use client";

import { useState } from "react";
import {
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import AddMemberModal from "@/components/shared/Modal/addMemberModal";
import EditMemberModal from "@/components/shared/Modal/editMemberModal";
import OrangeSpinner from "@/components/shared/OrangeSpinner";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "@/Redux/api/userApi";
import { toast } from "react-toastify";
import { IUser } from "@/Redux/types/types";

const PAGE_SIZE = 10;

const bloodGroupLabel: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

export default function MemberTable() {
  const [page, setPage] = useState(1);
  const { data: userResponse, isLoading } = useGetAllUsersQuery({
    page,
    limit: PAGE_SIZE,
  });
  const [deleteUser] = useDeleteUserMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IUser | null>(null);

  const users = userResponse?.data || [];
  const total = userResponse?.meta?.total ?? users.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("সদস্য সফলভাবে মুছে ফেলা হয়েছে");
      if (users.length === 1 && page > 1) setPage(page - 1);
    } catch {
      toast.error("সদস্য মোছা যায়নি");
    }
  };
  const handleEditClick = (member: IUser) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <OrangeSpinner />
      </div>
    );

  return (
    <div className="bg-[#1a1c21] border border-gray-800 rounded-2xl p-6 text-white">
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="সদস্য খুঁজুন..."
            className="w-full bg-[#121417] border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-sm"
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 px-6 rounded-lg font-bold text-sm"
        >
          + নতুন সদস্য
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-500 text-sm bg-[#121417] p-4 rounded-xl text-center">
          কোনো সদস্য নেই।
        </p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-700/50">
                  <th className="pb-4 font-normal">নাম</th>
                  <th className="pb-4 font-normal">ভূমিকা</th>
                  <th className="pb-4 font-normal">ফোন</th>
                  <th className="pb-4 font-normal">রক্ত</th>
                  <th className="pb-4 font-normal">ইমেইল</th>
                  <th className="pb-4 font-normal text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {users.map((m: IUser) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600 relative shrink-0">
                          <Image
                            src={m.image || "/avatar.jpg"}
                            alt={m.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{m.name}</span>
                      </div>
                    </td>
                    <td className="py-4">{m.designation || "—"}</td>
                    <td className="py-4">{m.phone || "—"}</td>
                    <td className="py-4">
                      {bloodGroupLabel[m.bloodGroup ?? ""] ??
                        m.bloodGroup ??
                        "—"}
                    </td>
                    <td className="py-4">{m.email || "—"}</td>

                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(m)}
                          className="p-2 bg-gray-800 rounded-lg text-emerald-500"
                          title="সম্পাদনা করুন"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="p-2 bg-red-900/30 rounded-lg text-red-500"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {users.map((m: IUser) => (
              <div
                key={m.id}
                className="bg-[#121417] p-4 rounded-xl border border-gray-800"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600 relative shrink-0">
                    <Image
                      src={m.image || "/avatar.jpg"}
                      alt={m.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{m.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {m.designation || "—"} · {m.phone || "—"}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded-full">
                        {bloodGroupLabel[m.bloodGroup ?? ""] ??
                          m.bloodGroup ??
                          "—"}
                      </span>
                      <span className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded-full truncate">
                        {m.email || "—"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleEditClick(m)}
                      className="p-2 bg-gray-800 rounded-lg text-emerald-500"
                      title="সম্পাদনা করুন"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="p-2 bg-red-900/30 rounded-lg text-red-500"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1 border border-gray-700 rounded-md hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                পূর্ববর্তী
              </button>
              {getPageNumbers(page, totalPages).map((n, idx) =>
                n === "..." ? (
                  <span key={`gap-${idx}`} className="px-1 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded-md ${
                      n === page
                        ? "bg-emerald-600"
                        : "bg-[#121417] hover:bg-gray-800"
                    }`}
                  >
                    {n}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1 border border-gray-700 rounded-md hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1"
              >
                পরবর্তী
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}

      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
      />
    </div>
  );
}
