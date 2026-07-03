"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Search, UserPlus, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import {
  Member,
  MemberRegistrationInput,
  MemberRegistrationSchema,
} from "../types/types";
import { useGetAllUsersQuery } from "@/Redux/api/userApi";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
const { data: userResponse } = useGetAllUsersQuery();
const userData = userResponse?.data || [];

const allMembers: Member[] = [
  {
    id: "1",
    nameBn: "আলহাজ্ব মোঃ রফিকুল ইসলাম",
    nameEn: "Rafiqul Islam",
    role: "President",
    roleBn: "সভাপতি",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    bloodGroup: "B+",
    joinedAt: "2019-01-01",
    badgeType: "gold",
    memberType: "president",
    isActive: true,
  },
  {
    id: "2",
    nameBn: "মোহাম্মদ আব্দুল করিম",
    nameEn: "Abdul Karim",
    role: "Secretary",
    roleBn: "সাধারণ সম্পাদক",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    bloodGroup: "A+",
    joinedAt: "2019-02-01",
    badgeType: "gold",
    memberType: "secretary",
    isActive: true,
  },
  {
    id: "3",
    nameBn: "মোছাঃ নূরজাহান বেগম",
    nameEn: "Nurjahan Begum",
    role: "Treasurer",
    roleBn: "কোষাধ্যক্ষ",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    bloodGroup: "O+",
    joinedAt: "2019-03-01",
    badgeType: "gold",
    memberType: "treasurer",
    isActive: true,
  },
  {
    id: "4",
    nameBn: "মোঃ সালাউদ্দিন আহমেদ",
    nameEn: "Salauddin Ahmed",
    role: "Executive",
    roleBn: "কার্যকরী সদস্য",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    bloodGroup: "AB+",
    joinedAt: "2020-01-01",
    badgeType: "silver",
    memberType: "executive",
    isActive: true,
  },
  {
    id: "5",
    nameBn: "রাহেলা খাতুন",
    nameEn: "Rahela Khatun",
    role: "Executive",
    roleBn: "কার্যকরী সদস্য",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    bloodGroup: "B-",
    joinedAt: "2020-04-01",
    badgeType: "silver",
    memberType: "executive",
    isActive: true,
  },
  {
    id: "6",
    nameBn: "মোঃ জাহাঙ্গীর আলম",
    nameEn: "Jahangir Alam",
    role: "General Member",
    roleBn: "সাধারণ সদস্য",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80",
    bloodGroup: "O-",
    joinedAt: "2021-01-01",
    badgeType: "bronze",
    memberType: "general",
    isActive: true,
  },
  {
    id: "7",
    nameBn: "সুমাইয়া আক্তার",
    nameEn: "Sumaiya Akter",
    role: "General Member",
    roleBn: "সাধারণ সদস্য",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    bloodGroup: "A-",
    joinedAt: "2021-06-01",
    badgeType: "bronze",
    memberType: "general",
    isActive: false,
  },
  {
    id: "8",
    nameBn: "মোঃ হাসানুজ্জামান",
    nameEn: "Hasanuzzaman",
    role: "General Member",
    roleBn: "সাধারণ সদস্য",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80",
    bloodGroup: "B+",
    joinedAt: "2022-01-01",
    badgeType: "bronze",
    memberType: "general",
    isActive: true,
  },
  {
    id: "9",
    nameBn: "ফাতেমা তুজ জোহরা",
    nameEn: "Fatema Tuz Johra",
    role: "General Member",
    roleBn: "সাধারণ সদস্য",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    bloodGroup: "AB-",
    joinedAt: "2022-08-01",
    badgeType: "bronze",
    memberType: "general",
    isActive: true,
  },
];

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MemberRegistrationInput>({
    resolver: zodResolver(MemberRegistrationSchema),
  });

  const filtered = allMembers.filter((m) => {
    const matchSearch =
      search === "" ||
      m.nameBn.includes(search) ||
      (m.nameEn?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchBlood = bloodFilter === "all" || m.bloodGroup === bloodFilter;
    const matchType = typeFilter === "all" || m.memberType === typeFilter;
    return matchSearch && matchBlood && matchType;
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("সদস্য নিবন্ধন সফল হয়েছে! আমরা শীঘ্রই যোগাযোগ করব। 🎉", {
      theme: "colored",
    });
    reset();
    setShowForm(false);
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
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-700 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
          >
            <option value="all">সব ধরনের সদস্য</option>
            <option value="president">সভাপতি</option>
            <option value="secretary">সম্পাদক</option>
            <option value="treasurer">কোষাধ্যক্ষ</option>
            <option value="executive">কার্যকরী সদস্য</option>
            <option value="general">সাধারণ সদস্য</option>
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
          {filtered.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="welfare-card p-4 flex flex-col items-center text-center group"
            >
              <div
                className={`h-1 w-full bg-gradient-to-r ${badgeGradients[member.badgeType]} absolute top-0 left-0 rounded-t-2xl`}
              />
              <div className="relative mt-2 mb-3 w-16 h-16 rounded-full overflow-hidden ring-3 ring-welfare-gold-200 shadow-md">
                <Image
                  src={member.avatar}
                  alt={member.nameBn}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-400 group-hover:scale-110"
                />
                <div
                  className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${badgeGradients[member.badgeType]} flex items-center justify-center shadow text-xs`}
                >
                  🏅
                </div>
                {member.isActive && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-welfare-green-500 border-2 border-white" />
                )}
              </div>
              <h3 className="font-bold text-welfare-green-800 text-xs font-bengali leading-4 mb-1.5 line-clamp-2">
                {member.nameBn}
              </h3>
              <span
                className="px-2.5 py-1 rounded-full text-white text-xs font-semibold font-bengali mb-2"
                style={{
                  background: "linear-gradient(135deg, #166534, #15803d)",
                }}
              >
                {member.roleBn}
              </span>
              <div className="flex items-center gap-1 text-xs text-red-500">
                <span>🩸</span>
                <span className="font-bold">{member.bloodGroup}</span>
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
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="px-7 pt-7 pb-5 rounded-t-3xl flex items-center justify-between"
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
                  className="p-7 grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  <div className="md:col-span-2">
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      বাংলা নাম *
                    </label>
                    <input
                      {...register("nameBn")}
                      placeholder="আপনার পুরো নাম (বাংলায়)"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                    />
                    {errors.nameBn && (
                      <p className="text-red-500 text-xs mt-1 font-bengali">
                        {errors.nameBn.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      ফোন নম্বর *
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="01XXXXXXXXX"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 font-bengali">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      ইমেইল
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="example@email.com"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 font-bengali">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-2">
                      রক্তের গ্রুপ *
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {bloodGroups.map((bg) => (
                        <label key={bg} className="cursor-pointer">
                          <input
                            {...register("bloodGroup")}
                            type="radio"
                            value={bg}
                            className="sr-only peer"
                          />
                          <span className="block text-center py-2 rounded-lg border-2 border-welfare-green-200 text-welfare-green-700 text-xs font-bold transition-all peer-checked:bg-red-600 peer-checked:border-red-600 peer-checked:text-white hover:border-red-400 cursor-pointer">
                            {bg}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.bloodGroup && (
                      <p className="text-red-500 text-xs mt-1 font-bengali">
                        {errors.bloodGroup.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      ঠিকানা *
                    </label>
                    <input
                      {...register("address")}
                      placeholder="গ্রাম/মহল্লা, উপজেলা, জেলা"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1 font-bengali">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      জাতীয় পরিচয়পত্র নম্বর
                    </label>
                    <input
                      {...register("nidNumber")}
                      placeholder="NID নম্বর"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                      পেশা
                    </label>
                    <input
                      {...register("occupation")}
                      placeholder="আপনার পেশা"
                      className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{
                        scale: isSubmitting ? 1 : 1.02,
                        y: isSubmitting ? 0 : -2,
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-xl font-bold font-bengali text-white text-base flex items-center justify-center gap-3 disabled:opacity-60"
                      style={{
                        background: isSubmitting
                          ? "#9ca3af"
                          : "linear-gradient(135deg, #166534, #15803d)",
                        boxShadow: isSubmitting
                          ? "none"
                          : "0 6px 20px rgba(22,101,52,0.35)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />{" "}
                          নিবন্ধন হচ্ছে...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={18} /> নিবন্ধন সম্পন্ন করুন
                        </>
                      )}
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
