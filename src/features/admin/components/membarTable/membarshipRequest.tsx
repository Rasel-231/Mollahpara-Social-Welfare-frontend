"use client";

import { useState } from "react";
import { User, XCircle, Info, ShieldCheck } from "lucide-react";
import {
  useApproveUserMutation,
  useDeleteUserMutation,
} from "@/Redux/api/userApi";
import { toast } from "react-toastify";
import Image from "next/image";

interface MembershipRequestUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  village: string;
  image: string;
  designation: string;
  bloodGroup: string;
  role: string;
  memberType: string;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  nid: string;
  donorId: string;
}

interface MembershipRequestProps {
  user: MembershipRequestUser;
}

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

export default function MembershipRequest({ user }: MembershipRequestProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [approveUser, { isLoading: approving }] = useApproveUserMutation();
  const [deleteUser, { isLoading: rejecting }] = useDeleteUserMutation();

  const handleAction = async (action: "accept" | "reject"): Promise<void> => {
    try {
      if (action === "accept") {
        await approveUser(user.id).unwrap();
      } else {
        await deleteUser(user.id).unwrap();
      }
      toast.success(
        action === "accept"
          ? "সদস্য গ্রহণ করা হয়েছে ✅"
          : "সদস্য বাতিল করা হয়েছে ❌",
      );
      setIsModalOpen(false);
    } catch {
      toast.error("কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন ⚠️");
    }
  };

  return (
    <>
      <div className="bg-[#1a1c21] border border-gray-700 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-gray-500 transition-all">
        <div className="flex items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
              width={48}
              height={48}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="text-gray-300" />
            </div>
          )}
          <div>
            <h4 className="text-white font-bold">{user.name}</h4>
            <p className="text-gray-400 text-xs">
              {bloodGroupLabel[user.bloodGroup] ?? user.bloodGroup} ·{" "}
              {user.village}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white transition-all"
            title="বিস্তারিত দেখুন"
          >
            <Info size={18} />
          </button>

          <button
            onClick={() => handleAction("reject")}
            className="bg-red-900/50 hover:bg-red-900 p-2 rounded-lg text-red-400 transition-all"
            title="বাতিল করুন"
          >
            <XCircle size={18} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c21] border border-gray-700 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" size={24} />
                <h3 className="text-xl font-bold">সদস্যের তথ্য যাচাই</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center mb-5">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500 mb-3"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-3">
                  <User className="text-gray-300" size={32} />
                </div>
              )}
              <h4 className="text-white font-bold text-lg">{user.name}</h4>
            </div>

            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <div className="flex justify-between">
                <span>ইমেইল:</span>
                <span className="text-white font-semibold">
                  {user.email || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ফোন:</span>
                <span className="text-white font-semibold">
                  {user.phone || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>রক্তের গ্রুপ:</span>
                <span className="text-white font-semibold">
                  {bloodGroupLabel[user.bloodGroup] ?? user.bloodGroup ?? "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ঠিকানা:</span>
                <span className="text-white font-semibold">
                  {user.village || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>পদবি:</span>
                <span className="text-white font-semibold">
                  {user.designation || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>পদ:</span>
                <span className="text-white font-semibold">
                  {user.memberType || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>রোল:</span>
                <span className="text-white font-semibold">{user.role}</span>
              </div>
              {user.nid && (
                <div className="flex justify-between">
                  <span>জাতীয় পরিচয়পত্র:</span>
                  <span className="text-white font-semibold">{user.nid}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>রেজিস্ট্রেশন:</span>
                <span className="text-white font-semibold">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAction("accept")}
                disabled={approving || rejecting}
                className="flex-1 bg-emerald-600 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all disabled:opacity-50"
              >
                {approving ? "..." : "Accept"}
              </button>
              <button
                onClick={() => handleAction("reject")}
                disabled={approving || rejecting}
                className="flex-1 bg-red-600/70 py-2 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {rejecting ? "..." : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
