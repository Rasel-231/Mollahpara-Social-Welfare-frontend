"use client";

import { useState } from "react";
import {
  Droplets,
  XCircle,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useDeleteBloodRequestMutation } from "@/Redux/api/bloodRequestApi";
import { toast } from "react-toastify";

interface BloodRequestData {
  id: string;
  patientName: string;
  bloodGroup: string;
  hospital: string;
  phone: string;
  date: string;
  units: number;
  urgency: string;
  status: string;
}

interface BloodRequestCardProps {
  request: BloodRequestData;
}

const urgencyColor: Record<string, string> = {
  HIGH: "text-red-400",
  MEDIUM: "text-yellow-400",
  LOW: "text-green-400",
};

export default function BloodRequestCard({ request }: BloodRequestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteBloodRequest, { isLoading }] =
    useDeleteBloodRequestMutation();

  const handleDelete = async () => {
    try {
      await deleteBloodRequest(request.id).unwrap();
      toast.success("রক্তের অনুরোধটি মুছে ফেলা হয়েছে।", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setIsModalOpen(false);
    } catch {
      toast.error("মুছতে সমস্যা হয়েছে।", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="bg-[#1a1c21] border border-gray-700 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-red-500/50 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center">
            <Droplets className="text-red-500" />
          </div>
          <div>
            <h4 className="text-white font-bold">{request.patientName}</h4>
            <p className="text-gray-400 text-xs">
              {request.bloodGroup} · {request.hospital} ·{" "}
              <span className={urgencyColor[request.urgency] ?? "text-gray-400"}>
                {request.urgency}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white transition-all"
            title="বিস্তারিত দেখুন"
          >
            <AlertTriangle size={18} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c21] border border-red-500/50 w-full max-w-sm rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
              <div className="flex items-center gap-3">
                <Droplets className="text-red-500" size={24} />
                <h3 className="text-xl font-bold">রক্তের অনুরোধ</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <p>
                রোগী:{" "}
                <span className="text-white font-semibold">
                  {request.patientName}
                </span>
              </p>
              <p>
                রক্তের গ্রুপ:{" "}
                <span className="text-red-400 font-bold">
                  {request.bloodGroup}
                </span>
              </p>
              <p>
                হাসপাতাল:{" "}
                <span className="text-white">{request.hospital}</span>
              </p>
              <p>
                ফোন:{" "}
                <span className="text-white">{request.phone}</span>
              </p>
              <p>
                প্রয়োজনীয় তারিখ:{" "}
                <span className="text-white">{request.date}</span>
              </p>
              <p>
                প্রয়োজনীয় ইউনিট:{" "}
                <span className="text-white">{request.units}</span>
              </p>
              <p>
                জরুরিতা:{" "}
                <span
                  className={
                    urgencyColor[request.urgency] ?? "text-gray-400"
                  }
                >
                  {request.urgency}
                </span>
              </p>
              <p>
                স্ট্যাটাস:{" "}
                <span className="text-white">{request.status}</span>
              </p>
            </div>

            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="w-full bg-red-600 py-2 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}{" "}
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
