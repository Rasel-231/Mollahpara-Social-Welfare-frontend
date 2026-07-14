"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import OrangeSpinner from "@/components/shared/OrangeSpinner";
import { useState } from "react";
import { UserPlus, MapPin, Calendar, AlertCircle, Phone } from "lucide-react";
import {
  BloodRequestInput,
  BloodRequestSchema,
  DonorRegistrationSchema,
} from "../types/types";
import { useCreateBloodRequestMutation } from "@/Redux/api/bloodRequestApi";
import {
  useCreateDonorMutation,
  useGetAllDonorsQuery,
  IDonor,
  ICreateDonor,
} from "@/Redux/api/bloodDonorApi";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

const urgencyConfig = {
  critical: {
    label: "জরুরি",
    color: "bg-red-600",
    textColor: "text-red-600",
    borderColor: "border-red-400",
  },
  urgent: {
    label: "প্রয়োজনীয়",
    color: "bg-orange-500",
    textColor: "text-orange-500",
    borderColor: "border-orange-400",
  },
  normal: {
    label: "সাধারণ",
    color: "bg-welfare-green-600",
    textColor: "text-welfare-green-600",
    borderColor: "border-welfare-green-400",
  },
};

type ActiveTab = "request" | "register" | "donors";

function timeAgo(dateStr: string | Date | null) {
  if (!dateStr) return "তথ্য নেই";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "আজ";
  if (days < 30) return `${days} দিন আগে`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} মাস আগে`;
  return `${Math.floor(months / 12)} বছর আগে`;
}

export default function BloodDonationPageView() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("request");
  const [filterGroup, setFilterGroup] = useState<string>("all");
  const [createBloodRequest] = useCreateBloodRequestMutation();
  const [createBloodDoner] = useCreateDonorMutation();
  const { data: donorsData, isLoading: donorsLoading } = useGetAllDonorsQuery("");

  const donors: IDonor[] = donorsData?.data ?? [];

  const requestForm = useForm<BloodRequestInput>({
    resolver: zodResolver(BloodRequestSchema),
    defaultValues: {
      patientName: "",
      bloodGroup: undefined,
      hospitalName: "",
      requiredDate: "",
      unitsRequired: 1,
      contactPhone: "",
      urgency: "urgent",
      notes: "",
    },
  });

  const donorForm = useForm({
    resolver: zodResolver(DonorRegistrationSchema),
    defaultValues: {
      name: "",
      phone: "",
      bloodGroup: undefined,
      lastDonationDate: "",
      address: "",
      isAvailable: true,
    },
  });

  const handleBloodRequestSubmit = requestForm.handleSubmit(
    async (data: BloodRequestInput) => {
      try {
        await createBloodRequest(data).unwrap();

        toast.success(
          "রক্তের অনুরোধ সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।",
          {
            position: "top-right",
            autoClose: 5000,
          },
        );

        requestForm.reset();
      } catch {
        toast.error("কিছু সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।", {
          position: "top-right",
        });
      }
    },
  );

  const handleDonorSubmit = donorForm.handleSubmit(
    async (data: ICreateDonor) => {
      try {
        await createBloodDoner(data).unwrap();

        toast.success("রক্তদাতা হিসেবে নিবন্ধন সফল হয়েছে! আপনাকে ধন্যবাদ।", {
          position: "top-right",
          autoClose: 5000,
        });

        donorForm.reset();
      } catch {
        toast.error("নিবন্ধন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
      }
    },
  );

  const {
    register: regRequest,
    formState: { errors: requestErrors, isSubmitting: requestSubmitting },
  } = requestForm;

  const {
    register: regDonor,
    formState: { errors: donorErrors, isSubmitting: donorSubmitting },
  } = donorForm;

  const filteredDonors =
    filterGroup === "all"
      ? donors
      : donors.filter((d) => d.bloodGroup === filterGroup);

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-10 shadow-xl"
          style={{ minHeight: 240 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-800/80 to-welfare-green-900/70" />
          <div className="relative z-10 p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="text-4xl"
                >
                  🩸
                </motion.div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white font-bengali text-shadow-strong">
                  রক্তদান কর্মসূচি
                </h1>
              </div>
              <p className="text-white/85 font-bengali leading-7 max-w-xl text-sm lg:text-base">
                একটি রক্তদান তিনটি জীবন বাঁচাতে পারে। আসুন, মানবতার সেবায়
                এগিয়ে আসি। রক্তদান করুন, জীবন বাঁচান।
              </p>
            </div>
            {/* Quick stats */}
            <div className="flex gap-5">
              {[
                { value: "৫০০+", label: "মোট রক্তদান" },
                { value: "২০০+", label: "সক্রিয় দাতা" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/20"
                >
                  <div className="text-2xl font-bold text-welfare-gold-300 font-bengali">
                    {s.value}
                  </div>
                  <div className="text-white/75 text-xs font-bengali">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {(
            [
              { id: "request", label: "রক্তের অনুরোধ", icon: "🆘" },
              { id: "register", label: "দাতা হিসেবে নিবন্ধন", icon: "✋" },
              { id: "donors", label: "দাতার তালিকা", icon: "👥" },
            ] as { id: ActiveTab; label: string; icon: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold font-bengali text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-white shadow-lg"
                  : "text-welfare-green-700 bg-white/70 border border-welfare-green-200 hover:bg-welfare-green-50"
              }`}
              style={
                activeTab === tab.id
                  ? {
                      background: "linear-gradient(135deg, #166534, #15803d)",
                      boxShadow: "0 4px 14px rgba(22,101,52,0.3)",
                    }
                  : {}
              }
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Blood Request Form */}
          {activeTab === "request" && (
            <motion.div
              key="request"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="welfare-card p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-welfare-green-800 font-bengali">
                    রক্তের অনুরোধ করুন
                  </h2>
                  <p className="text-welfare-green-500 text-xs font-bengali">
                    জরুরি রক্তের প্রয়োজনে এখানে আবেদন করুন
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleBloodRequestSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Patient Name */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    রোগীর নাম *
                  </label>
                  <input
                    {...regRequest("patientName")}
                    placeholder="রোগীর পুরো নাম"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali transition-all"
                  />
                  {requestErrors.patientName && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {requestErrors.patientName.message}
                    </p>
                  )}
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    রক্তের গ্রুপ *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodGroups.map((bg) => (
                      <label
                        key={bg}
                        className="relative flex items-center justify-center cursor-pointer"
                      >
                        <input
                          {...regRequest("bloodGroup")}
                          type="radio"
                          value={bg}
                          className="sr-only peer"
                        />
                        <span className="w-full text-center py-2 rounded-lg border-2 border-welfare-green-200 text-welfare-green-700 text-xs font-bold transition-all duration-200 peer-checked:bg-red-600 peer-checked:border-red-600 peer-checked:text-white hover:border-red-400 cursor-pointer">
                          {bg}
                        </span>
                      </label>
                    ))}
                  </div>
                  {requestErrors.bloodGroup && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {requestErrors.bloodGroup.message}
                    </p>
                  )}
                </div>

                {/* Hospital */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    হাসপাতালের নাম *
                  </label>
                  <input
                    {...regRequest("hospitalName")}
                    placeholder="হাসপাতাল বা ক্লিনিকের নাম"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali transition-all"
                  />
                  {requestErrors.hospitalName && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {requestErrors.hospitalName.message}
                    </p>
                  )}
                </div>

                {/* Required Date */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    প্রয়োজনীয় তারিখ *
                  </label>
                  <input
                    {...regRequest("requiredDate")}
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm transition-all"
                  />
                  {requestErrors.requiredDate && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {requestErrors.requiredDate.message}
                    </p>
                  )}
                </div>

                {/* Units */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    কত ইউনিট প্রয়োজন *
                  </label>
                  <input
                    {...regRequest("unitsRequired", { valueAsNumber: true })}
                    type="number"
                    min={1}
                    max={10}
                    placeholder="১"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm transition-all"
                  />
                  {requestErrors.unitsRequired && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {requestErrors.unitsRequired.message}
                    </p>
                  )}
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    যোগাযোগের নম্বর *
                  </label>
                  <input
                    {...regRequest("contactPhone")}
                    placeholder="01XXXXXXXXX"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm transition-all"
                  />
                  {requestErrors.contactPhone && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {requestErrors.contactPhone.message}
                    </p>
                  )}
                </div>

                {/* Urgency */}
                <div className="md:col-span-2">
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-2">
                    জরুরি অবস্থা *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {(["critical", "urgent", "normal"] as const).map(
                      (level) => (
                        <label
                          key={level}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            {...regRequest("urgency")}
                            type="radio"
                            value={level}
                            className="sr-only peer"
                          />
                          <span
                            className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold font-bengali transition-all duration-200 cursor-pointer peer-checked:text-white peer-checked:border-transparent ${urgencyConfig[level].textColor} ${urgencyConfig[level].borderColor} peer-checked:${urgencyConfig[level].color} hover:opacity-80`}
                            style={{}}
                          >
                            {urgencyConfig[level].label}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    অতিরিক্ত তথ্য (ঐচ্ছিক)
                  </label>
                  <textarea
                    {...regRequest("notes")}
                    rows={3}
                    placeholder="অন্য কোনো প্রয়োজনীয় তথ্য..."
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                  <motion.button
                    type="submit"
                    disabled={requestSubmitting}
                    whileHover={{
                      scale: requestSubmitting ? 1 : 1.02,
                      y: requestSubmitting ? 0 : -2,
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-xl font-bold font-bengali text-white text-base transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-3"
                    style={{
                      background: requestSubmitting
                        ? "#9ca3af"
                        : "linear-gradient(135deg, #991b1b, #dc2626)",
                      boxShadow: requestSubmitting
                        ? "none"
                        : "0 6px 20px rgba(153,27,27,0.35)",
                    }}
                  >
                    {requestSubmitting ? (
                      <>
                        <OrangeSpinner size={20} />
                        জমা হচ্ছে...
                      </>
                    ) : (
                      <>🩸 রক্তের অনুরোধ পাঠান</>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Donor Registration */}
          {activeTab === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="welfare-card p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-welfare-green-100 flex items-center justify-center">
                  <UserPlus size={20} className="text-welfare-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-welfare-green-800 font-bengali">
                    রক্তদাতা হিসেবে নিবন্ধন করুন
                  </h2>
                  <p className="text-welfare-green-500 text-xs font-bengali">
                    আপনার রক্তদান একটি জীবন বাঁচাতে পারে
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: "❤️", text: "জীবন বাঁচান" },
                  { icon: "🏅", text: "সম্মাননা সনদ" },
                  { icon: "📞", text: "অগ্রাধিকার সেবা" },
                  { icon: "🌟", text: "সদস্যপদ" },
                ].map((b) => (
                  <div
                    key={b.text}
                    className="flex items-center gap-2 p-3 rounded-xl bg-welfare-green-50 border border-welfare-green-100"
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-welfare-green-700 text-xs font-semibold font-bengali">
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleDonorSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Name */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    নাম *
                  </label>
                  <input
                    {...regDonor("name")}
                    placeholder="আপনার পুরো নাম"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali transition-all"
                  />
                  {donorErrors.name && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {donorErrors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    ফোন নম্বর *
                  </label>
                  <input
                    {...regDonor("phone")}
                    placeholder="01XXXXXXXXX"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm transition-all"
                  />
                  {donorErrors.phone && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {donorErrors.phone.message}
                    </p>
                  )}
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    রক্তের গ্রুপ *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodGroups.map((bg) => (
                      <label key={bg} className="cursor-pointer">
                        <input
                          {...regDonor("bloodGroup")}
                          type="radio"
                          value={bg}
                          className="sr-only peer"
                        />
                        <span className="block text-center py-2 rounded-lg border-2 border-welfare-green-200 text-welfare-green-700 text-xs font-bold transition-all duration-200 peer-checked:bg-red-600 peer-checked:border-red-600 peer-checked:text-white hover:border-red-400 cursor-pointer">
                          {bg}
                        </span>
                      </label>
                    ))}
                  </div>
                  {donorErrors.bloodGroup && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {donorErrors.bloodGroup.message}
                    </p>
                  )}
                </div>

                {/* Last Donation */}
                <div>
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    শেষ রক্তদানের তারিখ
                  </label>
                  <input
                    {...regDonor("lastDonationDate")}
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm transition-all"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-welfare-green-700 text-sm font-semibold font-bengali mb-1.5">
                    ঠিকানা *
                  </label>
                  <input
                    {...regDonor("address")}
                    placeholder="গ্রাম/এলাকা, উপজেলা, জেলা"
                    className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali transition-all"
                  />
                  {donorErrors.address && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {donorErrors.address.message}
                    </p>
                  )}
                </div>

                {/* Availability toggle */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      {...regDonor("isAvailable")}
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded accent-welfare-green-600"
                    />
                    <span className="text-welfare-green-700 font-semibold text-sm font-bengali">
                      আমি এখন রক্তদানের জন্য উপলব্ধ
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                  <motion.button
                    type="submit"
                    disabled={donorSubmitting}
                    whileHover={{
                      scale: donorSubmitting ? 1 : 1.02,
                      y: donorSubmitting ? 0 : -2,
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-xl font-bold font-bengali text-white text-base disabled:opacity-60 flex items-center justify-center gap-3"
                    style={{
                      background: donorSubmitting
                        ? "#9ca3af"
                        : "linear-gradient(135deg, #166534, #15803d)",
                      boxShadow: donorSubmitting
                        ? "none"
                        : "0 6px 20px rgba(22,101,52,0.35)",
                    }}
                  >
                    {donorSubmitting ? (
                      <>
                        <OrangeSpinner size={20} />{" "}
                        নিবন্ধন হচ্ছে...
                      </>
                    ) : (
                      <>✋ রক্তদাতা হিসেবে নিবন্ধন করুন</>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Donor List */}
          {activeTab === "donors" && (
            <motion.div
              key="donors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Filter */}
              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  onClick={() => setFilterGroup("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${filterGroup === "all" ? "bg-welfare-green-700 text-white" : "bg-white border border-welfare-green-200 text-welfare-green-700 hover:bg-welfare-green-50"}`}
                >
                  সবাই
                </button>
                {bloodGroups.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setFilterGroup(bg)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${filterGroup === bg ? "bg-red-600 text-white" : "bg-white border border-welfare-green-200 text-welfare-green-700 hover:border-red-300"}`}
                  >
                    {bg}
                  </button>
                ))}
              </div>

              {donorsLoading ? (
                <div className="flex items-center justify-center py-16">
                  <OrangeSpinner />
                </div>
              ) : filteredDonors.length === 0 ? (
                <div className="text-center py-16 text-welfare-green-400 font-bengali text-sm">
                  কোনো দাতা পাওয়া যায়নি।
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDonors.map((donor, i) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="welfare-card p-5 flex items-center gap-4"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
                        style={{
                          background: "linear-gradient(135deg, #991b1b, #dc2626)",
                        }}
                      >
                        {donor.bloodGroup}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-welfare-green-800 text-sm font-bengali truncate">
                          {donor.name}
                        </h3>
                        <div className="flex items-center gap-1 text-welfare-green-500 text-xs mt-0.5">
                          <MapPin size={10} />{" "}
                          <span className="font-bengali">{donor.address}</span>
                        </div>
                        <div className="flex items-center gap-1 text-welfare-green-500 text-xs mt-0.5">
                          <Calendar size={10} />{" "}
                          <span className="font-bengali">
                            {timeAgo(donor.lastDonationDate ?? null)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-welfare-green-500 text-xs mt-0.5">
                          <Phone size={10} />{" "}
                          <span className="font-bengali" dir="ltr">{donor.phone}</span>
                        </div>
                      </div>
                      <div
                        className={`flex-shrink-0 w-3 h-3 rounded-full ${donor.isAvailable ? "bg-welfare-green-500" : "bg-gray-300"} shadow-sm`}
                        title={donor.isAvailable ? "উপলব্ধ" : "অনুপলব্ধ"}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
