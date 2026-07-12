"use client";

import { useState } from "react";
import {
  GraduationCap,
  XCircle,
  Trash2,
  FileText,
  User,
  Calendar,
  MapPin,
  DollarSign,
  BookOpen,
  Hash,
  Clock,
} from "lucide-react";
import { useDeleteScholarshipMutation } from "@/Redux/api/scholarshipApi";
import { IScholarship } from "@/Redux/api/scholarshipApi";
import { toast } from "react-toastify";

interface ScholarshipRequestCardProps {
  scholarship: IScholarship;
}

export default function ScholarshipRequestCard({
  scholarship,
}: ScholarshipRequestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteScholarship, { isLoading }] = useDeleteScholarshipMutation();

  const handleDelete = async () => {
    try {
      await deleteScholarship(scholarship.id).unwrap();
      toast.success("স্কলারশিপ আবেদনটি মুছে ফেলা হয়েছে।", {
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
      <div className="bg-[#1a1c21] border border-gray-700 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-emerald-500/50 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center overflow-hidden">
            {scholarship.photoUrl ? (
              <img
                src={scholarship.photoUrl}
                alt={scholarship.studentName}
                className="w-full h-full object-cover"
              />
            ) : (
              <GraduationCap className="text-emerald-500" />
            )}
          </div>
          <div>
            <h4 className="text-white font-bold">{scholarship.studentName}</h4>
            <p className="text-gray-400 text-xs">
              {scholarship.institutionName} · ক্লাস: {scholarship.className} · GPA:{" "}
              {scholarship.gpa}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded-lg text-white transition-all"
            title="বিস্তারিত দেখুন"
          >
            <FileText size={18} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c21] border border-emerald-500/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-emerald-500" size={24} />
                <h3 className="text-xl font-bold">স্কলারশিপ আবেদন</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700">
              {scholarship.photoUrl && (
                <img
                  src={scholarship.photoUrl}
                  alt={scholarship.studentName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-emerald-500/30"
                />
              )}
              <div>
                <h4 className="text-xl font-bold">{scholarship.studentName}</h4>
                <p className="text-gray-400 text-sm font-mono">
                  ID: {scholarship.id}
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-emerald-900/40 text-emerald-300 text-xs px-2 py-1 rounded-full">
                    {scholarship.className}
                  </span>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    Roll: {scholarship.rollNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InfoItem
                icon={<User size={16} />}
                label="অভিভাবক"
                value={scholarship.guardianName}
              />
              <InfoItem
                icon={<Calendar size={16} />}
                label="জন্ম তারিখ"
                value={scholarship.dateOfBirth}
              />
              <InfoItem
                icon={<MapPin size={16} />}
                label="বর্তমান ঠিকানা"
                value={scholarship.currentAddress}
              />
              <InfoItem
                icon={<DollarSign size={16} />}
                label="মাসিক আয়"
                value={`${scholarship.monthlyIncome} BDT`}
              />
              <InfoItem
                icon={<BookOpen size={16} />}
                label="প্রতিষ্ঠান"
                value={scholarship.institutionName}
              />
              <InfoItem
                icon={<GraduationCap size={16} />}
                label="GPA"
                value={String(scholarship.gpa)}
              />
              <InfoItem
                icon={<Hash size={16} />}
                label="NID/জন্ম নিবন্ধন"
                value={scholarship.nidOrBirthReg}
              />
            </div>

            <div className="flex gap-3 mb-6">
              {scholarship.marksheetUrl && (
                <button
                  onClick={() => window.open(scholarship.marksheetUrl!, "_blank")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={18} /> মার্কশিট দেখুন
                </button>
              )}
              {scholarship.recommendationUrl && (
                <button
                  onClick={() =>
                    window.open(scholarship.recommendationUrl!, "_blank")
                  }
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={18} /> সুপারিশপত্র দেখুন
                </button>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4 border-t border-gray-700 pt-3">
              <span className="flex items-center gap-1">
                <Clock size={12} /> তৈরি:{" "}
                {new Date(scholarship.createdAt).toLocaleDateString("bn-BD")}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> আপডেট:{" "}
                {new Date(scholarship.updatedAt).toLocaleDateString("bn-BD")}
              </span>
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

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-emerald-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
          {label}
        </p>
        <p className="font-medium text-gray-200">{value}</p>
      </div>
    </div>
  );
}
