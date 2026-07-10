"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Copy,
  CreditCard,
  Smartphone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DonationFormInput, DonationFormSchema } from "../types/types";
import { useCreateDonationMutation } from "@/Redux/api/fundsApi";

/* ─── Payment method data ─── */
const paymentMethods = [
  {
    id: "BKASH" as const,
    name: "bKash",
    logo: "bKash",
    icon: <Smartphone size={24} />,
    primaryColor: "#E20074",
    bgColor: "rgba(226,0,116,0.08)",
    borderActive: "#E20074",
    accountNumber: "01XXXXXXXXX (Personal)",
    instruction:
      "বিকাশ অ্যাপ → Send Money → নম্বরটি দিন → পরিমাণ দিন → PIN দিন → TrxID কপি করুন",
  },
  {
    id: "NAGAD" as const,
    name: "Nagad",
    logo: "Nagad",
    icon: <Smartphone size={24} />,
    primaryColor: "#F5821F",
    bgColor: "rgba(245,130,31,0.08)",
    borderActive: "#F5821F",
    accountNumber: "01XXXXXXXXX (Personal)",
    instruction:
      "নগদ অ্যাপ → Send Money → নম্বরটি দিন → পরিমাণ দিন → PIN দিন → TrxID কপি করুন",
  },
  {
    id: "ROCKET" as const,
    name: "Rocket",
    logo: "Rocket",
    icon: <Smartphone size={24} />,
    primaryColor: "#7B2D8B",
    bgColor: "rgba(123,45,139,0.08)",
    borderActive: "#7B2D8B",
    accountNumber: "01XXXXXXXXX-5 (Personal)",
    instruction:
      "রকেট অ্যাপ → Send Money → নম্বরটি দিন → পরিমাণ দিন → PIN দিন → TrxID কপি করুন",
  },
  {
    id: "CREDIT_CARD" as const,
    name: "Credit/Debit Card",
    logo: "Card",
    icon: <CreditCard size={24} />,
    primaryColor: "#1A56DB",
    bgColor: "rgba(26,86,219,0.08)",
    borderActive: "#1A56DB",
    accountNumber: "ব্যাংক অ্যাকাউন্ট নম্বর: XXXXXXXXXXXX",
    instruction:
      "অনলাইন ব্যাংকিং বা মোবাইল ব্যাংকিং অ্যাপ ব্যবহার করে ট্রান্সফার করুন।",
  },
];

/* ─── Quick donation amounts ─── */
const quickAmounts = [50, 100, 200, 500, 1000, 2000, 5000, 10000];

/* ─── Impact calculator ─── */
const impactBreakdown = [
  { amount: 100, impact: "একটি শিশুর এক সপ্তাহের পাঠ্যপুস্তক", icon: "📚" },
  { amount: 200, impact: "একটি পরিবারের এক দিনের খাবার", icon: "🍚" },
  {
    amount: 500,
    impact: "একজন দরিদ্র শিক্ষার্থীর এক মাসের বৃত্তি",
    icon: "🎓",
  },
  { amount: 1000, impact: "একটি পরিবারের শীতবস্ত্র সহায়তা", icon: "🧥" },
  { amount: 2000, impact: "একজন রোগীর জরুরি চিকিৎসা সহায়তা", icon: "🏥" },
  { amount: 5000, impact: "একটি পরিবারের মাসিক জীবিকা সহায়তা", icon: "🏠" },
];

/* ─── FAQ items ─── */
const faqs = [
  {
    q: "অনুদান কীভাবে ব্যবহার করা হয়?",
    a: "আপনার অনুদান সরাসরি রক্তদান কর্মসূচি, শিক্ষা বৃত্তি, ত্রাণ বিতরণ ও পুনর্বাসন কার্যক্রমে ব্যবহৃত হয়। প্রতিটি টাকার হিসাব আমাদের বার্ষিক রিপোর্টে প্রকাশিত হয়।",
  },
  {
    q: "অনুদানের রশিদ পাব কি?",
    a: "হ্যাঁ। ফর্ম জমা দেওয়ার পর আমরা আপনাকে ফোন বা ইমেইলে যোগাযোগ করে রশিদ পাঠাব।",
  },
  {
    q: "ন্যূনতম কত টাকা অনুদান দেওয়া যায়?",
    a: "সর্বনিম্ন ১০ টাকা থেকে অনুদান দেওয়া যায়। ছোট অবদানও আমাদের কাছে অনেক মূল্যবান।",
  },
  {
    q: "নিয়মিত মাসিক অনুদান দেওয়া সম্ভব?",
    a: "হ্যাঁ, আমাদের সাথে যোগাযোগ করলে আমরা মাসিক অনুদানের ব্যবস্থা করতে পারব।",
  },
];

/* ─── FAQ Accordion item ─── */
function FaqItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07 }}
      className="border border-welfare-green-200 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-welfare-green-50 transition-colors text-left"
      >
        <span className="font-semibold text-welfare-green-800 font-bengali text-sm pr-4">
          {faq.q}
        </span>
        <div className="flex-shrink-0 text-welfare-green-500">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 py-4 text-welfare-green-600 text-sm font-bengali leading-6 bg-welfare-green-50/60 border-t border-welfare-green-100">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main component ─── */
export default function DonatePageView() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [createDonation, { isLoading }] = useCreateDonationMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DonationFormInput>({
    resolver: zodResolver(DonationFormSchema),
    defaultValues: { purpose: "GENERAL" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedAmount = watch("amount");

  const impactMsg = impactBreakdown
    .slice()
    .reverse()
    .find((b) => (watchedAmount ?? 0) >= b.amount);

  const handleAmountSelect = (amt: number) => {
    setSelectedAmount(amt);
    setValue("amount", amt);
  };

  const handleMethodSelect = (id: string) => {
    setSelectedMethod(id);
    setValue("paymentMethod", id as DonationFormInput["paymentMethod"]);
  };

  const copyAccountNumber = (num: string) => {
    navigator.clipboard.writeText(num).catch(() => {});
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const onSubmit = async (data: DonationFormInput) => {
    try {
      await createDonation(data).unwrap();
      toast.success(
        `আপনার ৳${data.amount} অনুদান গৃহীত হয়েছে! আন্তরিক ধন্যবাদ। 💚`,
        { position: "top-right", autoClose: 7000, theme: "colored" },
      );
      reset();
      setSelectedMethod(null);
      setSelectedAmount(null);
    } catch {
      toast.error("অনুদান জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const activeMethod = paymentMethods.find((m) => m.id === selectedMethod);

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-20">
      <div className="container mx-auto px-4 lg:px-6">
        {/* ── Hero Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-14 shadow-2xl"
          style={{ minHeight: 280 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1400&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-welfare-green-900/92 via-welfare-green-800/82 to-welfare-gold-900/70" />

          {/* Floating hearts */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute select-none text-2xl opacity-20"
              style={{ left: `${15 + i * 22}%`, top: `${20 + (i % 2) * 40}%` }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            >
              💚
            </motion.div>
          ))}

          <div className="relative z-10 p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart
                    size={36}
                    className="text-welfare-gold-300 fill-welfare-gold-300"
                  />
                </motion.div>
                <h1 className="text-3xl lg:text-5xl font-bold text-white font-bengali leading-tight">
                  অনুদান করুন
                </h1>
              </div>
              <p className="text-welfare-green-100 font-bengali text-base leading-8">
                আপনার প্রতিটি টাকা একটি পরিবারের মুখে হাসি ফোটায়। আজই আমাদের
                কল্যাণমূলক কার্যক্রমে অংশীদার হন।
              </p>
            </div>

            {/* Floating stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { value: "৳২০L+", label: "মোট অনুদান" },
                { value: "১০০০+", label: "অনুদানকারী" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center px-6 py-4 rounded-2xl border border-white/20 bg-white/15 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-welfare-gold-300 font-bengali">
                    {s.value}
                  </div>
                  <div className="text-white/70 text-xs font-bengali">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Main Grid: Form + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          {/* ── Donation Form (2/3) ── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="welfare-card overflow-hidden">
              {/* Card header stripe */}
              <div className="h-1.5 bg-gradient-to-r from-welfare-green-600 via-welfare-gold-400 to-welfare-green-600" />

              <div className="p-7 lg:p-9">
                <h2 className="text-xl font-bold text-welfare-green-800 font-bengali mb-7 flex items-center gap-2">
                  <Heart size={20} className="text-welfare-green-600" />
                  অনুদান ফর্ম
                </h2>

                {/* Step 1 — Payment method */}
                <div className="mb-8">
                  <p className="text-welfare-green-700 font-bold font-bengali text-sm mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-welfare-green-700 text-white text-xs flex items-center justify-center flex-shrink-0">
                      ১
                    </span>
                    পেমেন্ট পদ্ধতি নির্বাচন করুন
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {paymentMethods.map((m) => (
                      <motion.button
                        key={m.id}
                        type="button"
                        onClick={() => handleMethodSelect(m.id)}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative py-5 px-3 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all duration-300 text-sm font-bold"
                        style={{
                          background:
                            selectedMethod === m.id
                              ? m.bgColor
                              : "rgba(255,255,255,0.9)",
                          borderColor:
                            selectedMethod === m.id
                              ? m.primaryColor
                              : "rgba(22,101,52,0.15)",
                          color: m.primaryColor,
                          boxShadow:
                            selectedMethod === m.id
                              ? `0 4px 16px ${m.bgColor}`
                              : "none",
                        }}
                      >
                        <span className="text-2xl">{m.icon}</span>
                        <span
                          className="text-xs font-extrabold"
                          style={{ color: m.primaryColor }}
                        >
                          {m.logo}
                        </span>
                        {selectedMethod === m.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-welfare-green-500 flex items-center justify-center shadow-md"
                          >
                            <CheckCircle2 size={14} className="text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-xs mt-2 font-bengali">
                      {errors.paymentMethod.message}
                    </p>
                  )}

                  {/* Account info reveal */}
                  <AnimatePresence>
                    {activeMethod && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden mt-4"
                      >
                        <div
                          className="rounded-xl p-4 border"
                          style={{
                            background: activeMethod.bgColor,
                            borderColor: `${activeMethod.primaryColor}30`,
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="font-bold text-sm"
                              style={{ color: activeMethod.primaryColor }}
                            >
                              {activeMethod.name} অ্যাকাউন্ট নম্বর:
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                copyAccountNumber(activeMethod.accountNumber)
                              }
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              {copiedAccount ? (
                                <CheckCircle2
                                  size={12}
                                  className="text-welfare-green-500"
                                />
                              ) : (
                                <Copy size={12} />
                              )}
                              {copiedAccount ? "কপি হয়েছে!" : "কপি করুন"}
                            </button>
                          </div>
                          <p
                            className="font-bold text-lg font-mono mb-3"
                            style={{ color: activeMethod.primaryColor }}
                          >
                            {activeMethod.accountNumber}
                          </p>
                          <p className="text-welfare-green-700 text-xs font-bengali leading-5 bg-white/70 rounded-lg p-3">
                            📌 {activeMethod.instruction}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Step 2 — Amount */}
                <div className="mb-8">
                  <p className="text-welfare-green-700 font-bold font-bengali text-sm mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-welfare-green-700 text-white text-xs flex items-center justify-center flex-shrink-0">
                      ২
                    </span>
                    অনুদানের পরিমাণ নির্বাচন করুন
                  </p>

                  {/* Quick amounts */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {quickAmounts.map((amt) => (
                      <motion.button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountSelect(amt)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 font-bengali"
                        style={{
                          background:
                            selectedAmount === amt
                              ? "linear-gradient(135deg, #166534, #15803d)"
                              : "white",
                          borderColor:
                            selectedAmount === amt
                              ? "#166534"
                              : "rgba(22,101,52,0.2)",
                          color: selectedAmount === amt ? "white" : "#166534",
                        }}
                      >
                        ৳{amt.toLocaleString()}
                      </motion.button>
                    ))}
                  </div>

                  {/* Manual amount input */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-welfare-green-600 text-base">
                      ৳
                    </span>
                    <input
                      {...register("amount", { valueAsNumber: true })}
                      type="number"
                      placeholder="অন্য পরিমাণ লিখুন"
                      onChange={(e) => {
                        setSelectedAmount(null);
                        setValue("amount", Number(e.target.value));
                      }}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1 font-bengali">
                      {errors.amount.message}
                    </p>
                  )}

                  {/* Impact preview */}
                  <AnimatePresence>
                    {impactMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-3 flex items-center gap-3 px-4 py-3 rounded-xl bg-welfare-green-50 border border-welfare-green-200"
                      >
                        <span className="text-2xl">{impactMsg.icon}</span>
                        <p className="text-welfare-green-700 text-xs font-bengali">
                          আপনার এই অনুদান দিয়ে সম্ভব:{" "}
                          <span className="font-bold">{impactMsg.impact}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Step 3 — Donor details */}
                <div className="mb-8">
                  <p className="text-welfare-green-700 font-bold font-bengali text-sm mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-welfare-green-700 text-white text-xs flex items-center justify-center flex-shrink-0">
                      ৩
                    </span>
                    আপনার তথ্য দিন
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-welfare-green-700 text-xs font-semibold font-bengali mb-1.5">
                        নাম *
                      </label>
                      <input
                        {...register("donorName")}
                        placeholder="আপনার পুরো নাম"
                        className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                      />
                      {errors.donorName && (
                        <p className="text-red-500 text-xs mt-1 font-bengali">
                          {errors.donorName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-welfare-green-700 text-xs font-semibold font-bengali mb-1.5">
                        ফোন নম্বর *
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="01XXXXXXXXX"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-bengali">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-welfare-green-700 text-xs font-semibold font-bengali mb-1.5">
                        ইমেইল (ঐচ্ছিক)
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="example@email.com"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-welfare-green-700 text-xs font-semibold font-bengali mb-1.5">
                        লেনদেন আইডি (TrxID) *
                      </label>
                      <input
                        {...register("transactionId")}
                        placeholder="TrxID / Ref No"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-mono"
                      />
                      {errors.transactionId && (
                        <p className="text-red-500 text-xs mt-1 font-bengali">
                          {errors.transactionId.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-welfare-green-700 text-xs font-semibold font-bengali mb-1.5">
                        অনুদানের উদ্দেশ্য
                      </label>
                      <select
                        {...register("purpose")}
                        className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                      >
                        <option value="GENERAL">সাধারণ অনুদান</option>
                        <option value="BLOOD_DONATION">রক্তদান কর্মসূচি</option>
                        <option value="EDUCATION">শিক্ষা সহায়তা</option>
                        <option value="RELIEF">ত্রাণ কার্যক্রম</option>
                        <option value="OTHER">অন্যান্য</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-welfare-green-700 text-xs font-semibold font-bengali mb-1.5">
                        বার্তা (ঐচ্ছিক)
                      </label>
                      <input
                        {...register("message")}
                        placeholder="কোনো বিশেষ বার্তা..."
                        className="w-full px-4 py-3 rounded-xl border border-welfare-green-200 bg-white text-welfare-green-800 placeholder-welfare-green-300 focus:outline-none focus:ring-2 focus:ring-welfare-green-400 text-sm font-bengali"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting || isLoading}
                  whileHover={{
                    scale: isSubmitting || isLoading ? 1 : 1.02,
                    y: isSubmitting || isLoading ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-5 rounded-2xl font-bold font-bengali text-white text-base flex items-center justify-center gap-3 disabled:opacity-60 transition-all"
                  style={{
                    background:
                      isSubmitting || isLoading
                        ? "#9ca3af"
                        : "linear-gradient(135deg, #b45309 0%, #d97706 50%, #fbbf24 100%)",
                    boxShadow:
                      isSubmitting || isLoading
                        ? "none"
                        : "0 6px 24px rgba(180,83,9,0.4)",
                  }}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      প্রক্রিয়াকরণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Heart size={20} className="fill-white" />
                      অনুদান জমা দিন
                    </>
                  )}
                </motion.button>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 mt-4 text-welfare-green-500 text-xs font-bengali">
                  <ShieldCheck size={14} />
                  আপনার তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Sidebar (1/3) ── */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Why donate */}
            <div className="welfare-card p-6">
              <h3 className="font-bold text-welfare-green-800 font-bengali mb-4 flex items-center gap-2">
                <span>💚</span> কেন অনুদান দেবেন?
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: "🩸", text: "জরুরি রক্ত সংগ্রহে সহায়তা" },
                  { icon: "📚", text: "শিক্ষার্থীদের বৃত্তি প্রদান" },
                  { icon: "🏠", text: "দুর্যোগ পুনর্বাসন কার্যক্রম" },
                  { icon: "🤝", text: "দরিদ্র পরিবারের ক্ষুদ্রঋণ" },
                  { icon: "🏥", text: "বিনামূল্যে স্বাস্থ্য সেবা" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 text-welfare-green-700 text-sm font-bengali"
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact calculator */}
            <div className="welfare-card p-6">
              <h3 className="font-bold text-welfare-green-800 font-bengali mb-4 flex items-center gap-2">
                <span>📊</span> আপনার অনুদানের প্রভাব
              </h3>
              <div className="space-y-2.5">
                {impactBreakdown.map((b) => (
                  <div
                    key={b.amount}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all text-sm ${
                      (watchedAmount ?? 0) >= b.amount
                        ? "bg-welfare-green-50 border border-welfare-green-200"
                        : "opacity-40"
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{b.icon}</span>
                    <div>
                      <span className="font-bold text-welfare-green-700 font-bengali">
                        ৳{b.amount}:{" "}
                      </span>
                      <span className="text-welfare-green-600 font-bengali">
                        {b.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="welfare-card p-5 text-center">
              <div className="flex justify-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-welfare-green-50 flex items-center justify-center">
                  <ShieldCheck size={22} className="text-welfare-green-600" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-welfare-gold-50 flex items-center justify-center">
                  <CheckCircle2 size={22} className="text-welfare-gold-600" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <CreditCard size={22} className="text-blue-600" />
                </div>
              </div>
              <p className="text-welfare-green-600 text-xs font-bengali leading-5">
                আমরা নিবন্ধিত সমাজসেবী সংগঠন। আপনার অনুদান স্বচ্ছভাবে পরিচালিত
                হয়।
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── FAQ Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="section-title-center mb-8 font-bengali">
            <span className="animate-float">🍃</span>
            প্রায়ই জিজ্ঞাসিত প্রশ্ন
            <span className="animate-float">🍃</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-xl text-center py-14 px-8"
          style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}
        >
          <div className="absolute inset-0 opacity-5 text-9xl flex items-center justify-center select-none">
            💚
          </div>
          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-5xl mb-4 select-none"
            >
              💚
            </motion.div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white font-bengali mb-3">
              একসাথে সুন্দর সমাজ গড়ি
            </h2>
            <p className="text-welfare-green-200 font-bengali mb-6 max-w-lg mx-auto text-sm lg:text-base">
              আপনার সহায়তায় আমরা আরও বেশি মানুষের পাশে দাঁড়াতে পারব। ধন্যবাদ
              আমাদের সাথে থাকার জন্য।
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/members" className="btn-gold font-bengali">
                সদস্য হন
              </a>
              <a
                href="/blood-donation"
                className="px-6 py-3 rounded-xl font-semibold font-bengali text-white border-2 border-red-400/50 hover:bg-red-900/30 transition-all"
              >
                🩸 রক্ত দিন
              </a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-xl font-semibold font-bengali text-white border-2 border-white/30 hover:bg-white/15 transition-all"
              >
                📞 যোগাযোগ করুন
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
