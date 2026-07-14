"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Search, UserPlus, X, Upload } from "lucide-react";
import Image from "next/image";
import {
  MemberRegistrationInput,
  MemberRegistrationSchema,
} from "../types/types";
import { IUser } from "@/Redux/types/types";
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
} from "@/Redux/api/userApi";

const bloodGroupMapping: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};

const reverseBloodGroupMapping: Record<string, string> = {
  "A+": "A_POSITIVE",
  "A-": "A_NEGATIVE",
  "B+": "B_POSITIVE",
  "B-": "B_NEGATIVE",
  "AB+": "AB_POSITIVE",
  "AB-": "AB_NEGATIVE",
  "O+": "O_POSITIVE",
  "O-": "O_NEGATIVE",
};

const memberRoleMapping: Record<string, string> = {
  PRESIDENT: "সভাপতি",
  VICE_PRESIDENT: "সহ-সভাপতি",
  SECRETARY: "সাধারণ সম্পাদক",
  JOINT_SECRETARY: "যুগ্ম সম্পাদক",
  TREASURER: "কোষাধ্যক্ষ",
  ORGANIZING_SEC: "সাংগঠনিক সম্পাদক",
  EXECUTIVE: "কার্যকরী সদস্য",
  GENERAL: "সাধারণ সদস্য",
  ADVISOR: "উপদেষ্টা",
  VOLUNTEER: "স্বেচ্ছাসেবক",
};

const badgeGradients: Record<string, string> = {
  gold: "from-yellow-400 to-amber-500",
  silver: "from-slate-300 to-slate-500",
  bronze: "from-amber-600 to-amber-800",
};

export default function MembersPageView() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: userResponse } = useGetAllUsersQuery("");
  const userData: IUser[] = userResponse?.data || [];
  const [createUser] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<MemberRegistrationInput>({
    resolver: zodResolver(MemberRegistrationSchema),
  });

  const filtered = userData.filter((m: IUser) => {
    const matchSearch =
      search === "" || m.name.toLowerCase().includes(search.toLowerCase());
    const matchBlood = bloodFilter === "all" || m.bloodGroup === bloodFilter;
    const matchType = typeFilter === "all" || m.memberType === typeFilter;
    return matchSearch && matchBlood && matchType;
  });

  const onSubmit = async (data: MemberRegistrationInput) => {
    try {
      const payload = {
        ...data,
        bloodGroup: data.bloodGroup
          ? reverseBloodGroupMapping[data.bloodGroup]
          : undefined,
        memberType: data.memberType || "GENERAL",
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      await createUser(formData).unwrap();
      toast.success("সদস্য নিবন্ধন সফল হয়েছে! আমরা শীঘ্রই যোগাযোগ করব। 🎉", {
        theme: "colored",
      });
      reset();
      setSelectedFile(null);
      setShowForm(false);
    } catch {
      toast.error("নিবন্ধনে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-10 shadow-xl py-12 px-8 lg:px-12"
          style={{
            background: "linear-gradient(135deg, #14532d, #166534, #15803d)",
          }}
        >
          <div className="absolute inset-0 opacity-10 text-9xl flex items-end justify-end p-8 select-none">
            👥
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white font-bengali mb-2">
                সদস্য তালিকা
              </h1>
              <p className="text-welfare-green-200 font-bengali text-sm lg:text-base max-w-lg">
                আমাদের নিবেদিতপ্রাণ সদস্যরা যারা সমাজের উন্নয়নে অক্লান্ত
                পরিশ্রম করে যাচ্ছেন
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold font-bengali text-welfare-green-900 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #d97706)",
                boxShadow: "0 4px 14px rgba(251,191,36,0.4)",
              }}
            >
              <UserPlus size={18} /> সদস্য হন
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="welfare-card p-5 mb-7 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-welfare-green-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="সদস্য খুঁজুন..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
            />
          </div>
          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-700 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-semibold"
          >
            <option value="all">সব রক্তের গ্রুপ</option>
            {Object.keys(bloodGroupMapping).map((bg) => (
              <option key={bg} value={bg}>
                {bloodGroupMapping[bg]}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-700 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
          >
            <option value="all">সব ধরনের সদস্য</option>
            {Object.keys(memberRoleMapping).map((role) => (
              <option key={role} value={role}>
                {memberRoleMapping[role]}
              </option>
            ))}
          </select>
        </motion.div>

        <p className="text-welfare-green-600 text-sm font-bengali mb-5">
          মোট{" "}
          <span className="font-bold text-welfare-green-800">
            {filtered.length}
          </span>{" "}
          জন সদস্য পাওয়া গেছে
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((member: IUser, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="welfare-card p-4 flex flex-col items-center text-center group relative"
            >
              <div
                className={`h-1 w-full bg-gradient-to-r ${badgeGradients["bronze"]} absolute top-0 left-0 rounded-t-2xl`}
              />
              <div className="relative mt-2 mb-3 w-16 h-16 rounded-full overflow-hidden ring-3 ring-welfare-gold-200 shadow-md">
                <Image
                  src={member.image || "/avatar.jpg"}
                  alt={member.name}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-400 group-hover:scale-110"
                />
                <div
                  className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${badgeGradients["bronze"]} flex items-center justify-center shadow text-xs`}
                >
                  🏅
                </div>
                {member.isActive && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-welfare-green-500 border-2 border-white" />
                )}
              </div>
              <h3 className="font-bold text-welfare-green-800 text-xs font-bengali leading-4 mb-1.5 line-clamp-2">
                {member.name}
              </h3>
              <span
                className="px-2.5 py-1 rounded-full text-white text-xs font-semibold font-bengali mb-2"
                style={{
                  background: "linear-gradient(135deg, #166534, #15803d)",
                }}
              >
                {member.memberType
                  ? memberRoleMapping[member.memberType] || member.memberType
                  : "সাধারণ সদস্য"}
              </span>
              <div className="flex items-center gap-1 text-xs text-red-500">
                <span>🩸</span>
                <span className="font-bold">
                  {member.bloodGroup
                    ? bloodGroupMapping[member.bloodGroup]
                    : "—"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-welfare-green-500 font-bengali">
            <div className="text-5xl mb-3">🔍</div>
            <p>কোনো সদস্য পাওয়া যায়নি</p>
          </div>
        )}

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="px-7 pt-7 pb-5 rounded-t-3xl flex items-center justify-between flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #14532d, #166534)",
                  }}
                >
                  <div>
                    <h2 className="text-xl font-bold text-white font-bengali">
                      সদস্য নিবন্ধন ফর্ম
                    </h2>
                    <p className="text-welfare-green-200 text-xs font-bengali mt-1">
                      আমাদের পরিবারের সাথে যুক্ত হন
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-7 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1"
                >
                  <div className="md:col-span-2">
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      নাম *
                    </label>
                    <input
                      {...register("name")}
                      placeholder="আপনার পুরো নাম"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                    />
                  </div>
                  <div>
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      ফোন নম্বর *
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      ইমেইল
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      পাসওয়ার্ড *
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      placeholder="কমপক্ষে ৬ অক্ষর"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      পদবী
                    </label>
                    <input
                      {...register("designation")}
                      placeholder="যেমন: সভাপতি, শিক্ষক, চাকরিজীবী"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                    />
                  </div>
                  <div>
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      রক্তের গ্রুপ
                    </label>
                    <select
                      {...register("bloodGroup")}
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-700 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {Object.keys(reverseBloodGroupMapping).map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      প্রোফাইল ছবি
                    </label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="w-full px-4 py-8 rounded-xl border-2 border-dashed border-welfare-green-300 bg-welfare-green-50/50 hover:bg-welfare-green-50 cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-welfare-green-400" />
                      <span className="text-sm text-welfare-green-500 font-bengali">
                        {selectedFile
                          ? selectedFile.name
                          : "ছবি আপলোড করতে ক্লিক করুন"}
                      </span>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      জাতীয় পরিচয়পত্র নম্বর
                    </label>
                    <input
                      {...register("nid")}
                      placeholder="NID নম্বর"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      ঠিকানা *
                    </label>
                    <input
                      {...register("village")}
                      placeholder="গ্রাম/মহল্লা, উপজেলা, জেলা"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-bold font-bengali text-white text-base flex items-center justify-center gap-3 disabled:opacity-60"
                      style={{
                        background: isSubmitting
                          ? "#9ca3af"
                          : "linear-gradient(135deg, #166534, #15803d)",
                      }}
                    >
                      {isSubmitting
                        ? "নিবন্ধন হচ্ছে..."
                        : "নিবন্ধন সম্পন্ন করুন"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
