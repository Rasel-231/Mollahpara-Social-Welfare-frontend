"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Zod Schema for Loan Form
const LoanSchema = z.object({
  applicantName: z.string().min(2, "নাম লিখুন"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "সঠিক ফোন নম্বর দিন"),
  loanAmount: z.number().min(500, "ন্যূনতম ৫০০ টাকা"),
  purpose: z.string().min(1, "উদ্দেশ্য নির্বাচন করুন"),
  repaymentPeriod: z.string().min(1, "সময়সীমা নির্বাচন করুন"),
  nidNumber: z.string().optional(),
  address: z.string().min(5, "ঠিকানা লিখুন"),
  guarantorName: z.string().optional(),
  guarantorPhone: z.string().optional(),
  notes: z.string().optional(),
});

type LoanInput = z.infer<typeof LoanSchema>;

const programs = [
  {
    id: "blood",
    icon: "🩸",
    titleBn: "রক্তদান কর্মসূচি",
    tagline: "একটি রক্তদান তিনটি জীবন বাঁচায়",
    descBn: "আমাদের রক্তদান কর্মসূচি এলাকার রোগীদের জন্য জরুরি রক্ত সরবরাহ নিশ্চিত করে। স্বেচ্ছাসেবী রক্তদাতাদের একটি বৃহৎ নেটওয়ার্কের মাধ্যমে যেকোনো জরুরি পরিস্থিতিতে রক্ত সংগ্রহ করা হয়।",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=700&q=80",
    href: "/blood-donation",
    ctaBn: "রক্তদান পেজে যান",
    accentFrom: "#991b1b",
    accentTo: "#dc2626",
    features: ["২৪/৭ জরুরি রক্ত সরবরাহ", "সকল রক্তের গ্রুপ উপলব্ধ", "নিবন্ধিত স্বেচ্ছাসেবী দাতা", "হাসপাতাল সমন্বয়", "বিনামূল্যে রক্তের গ্রুপ পরীক্ষা", "দাতাদের স্বাস্থ্য সুরক্ষা"],
    stats: [{ value: "৫০০+", label: "মোট রক্তদান" }, { value: "২০০+", label: "নিবন্ধিত দাতা" }, { value: "৫০+", label: "হাসপাতাল সংযোগ" }],
  },
  {
    id: "education",
    icon: "📚",
    titleBn: "শিক্ষা সহায়তা কার্যক্রম",
    tagline: "শিক্ষার আলোয় আলোকিত ভবিষ্যৎ",
    descBn: "দরিদ্র ও মেধাবী শিক্ষার্থীদের জন্য আমাদের শিক্ষা বৃত্তি ও সহায়তা কার্যক্রম তাদের স্বপ্ন পূরণে সহায়তা করে। বই, খাতা, ইউনিফর্ম এবং মাসিক বৃত্তি প্রদান করা হয়।",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80",
    href: "#education",
    ctaBn: "আবেদন করুন",
    accentFrom: "#1e40af",
    accentTo: "#3b82f6",
    features: ["মাসিক শিক্ষা বৃত্তি", "বিনামূল্যে পাঠ্যপুস্তক", "ইউনিফর্ম সহায়তা", "পরীক্ষার ফি প্রদান", "কোচিং সুবিধা", "মেধা পুরস্কার"],
    stats: [{ value: "২০০+", label: "বৃত্তিপ্রাপ্ত" }, { value: "৫০+", label: "বিদ্যালয় সংযুক্ত" }, { value: "১০০%", label: "পাসের হার" }],
  },
  {
    id: "loans",
    icon: "🏦",
    titleBn: "ঋণ ও পুনর্বাসন কার্যক্রম",
    tagline: "স্বাবলম্বী জীবন গড়ার পথে",
    descBn: "দরিদ্র পরিবারগুলোকে আর্থিকভাবে স্বাবলম্বী করে তুলতে আমাদের ক্ষুদ্রঋণ ও পুনর্বাসন কার্যক্রম। বন্যা ও প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্তদের পুনর্বাসনেও সহায়তা করা হয়।",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&q=80",
    href: "#loans",
    ctaBn: "ঋণের আবেদন করুন",
    accentFrom: "#92400e",
    accentTo: "#d97706",
    features: ["সুদমুক্ত ক্ষুদ্রঋণ", "সহজ কিস্তিতে পরিশোধ", "দুর্যোগ পুনর্বাসন সহায়তা", "ব্যবসায়িক প্রশিক্ষণ", "গৃহ নির্মাণ সহায়তা", "কৃষি ঋণ সুবিধা"],
    stats: [{ value: "৫০০+", label: "পরিবার উপকৃত" }, { value: "৳২০L+", label: "ঋণ বিতরণ" }, { value: "৯৮%", label: "পরিশোধের হার" }],
  },
];

function ProgramCard({ prog, index }: { prog: typeof programs[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div ref={ref} id={prog.id} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="welfare-card overflow-hidden mb-10 scroll-mt-24">
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${prog.accentFrom}, ${prog.accentTo})` }} />
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        <div className="lg:w-5/12 relative overflow-hidden" style={{ minHeight: 280 }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${prog.image})` }} />
          <div className="absolute bottom-4 right-4 text-5xl opacity-60">{prog.icon}</div>
        </div>
        <div className="flex-1 p-7 lg:p-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-white text-xs font-bold mb-4" style={{ background: `linear-gradient(135deg, ${prog.accentFrom}, ${prog.accentTo})` }}>{prog.titleBn}</span>
          <p className="text-base font-semibold mb-3" style={{ color: prog.accentFrom }}>{prog.tagline}</p>
          <p className="text-welfare-green-700 text-sm mb-5 leading-7">{prog.descBn}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {prog.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-welfare-green-700">
                <span style={{ color: prog.accentTo }}>✔</span> {f}
              </li>
            ))}
          </ul>
          <Link href={prog.href}>
            <button className="px-6 py-3 rounded-xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${prog.accentFrom}, ${prog.accentTo})` }}>{prog.ctaBn}</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProgramsPageView() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoanInput>({ resolver: zodResolver(LoanSchema) });
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1200));
    toast.success("আবেদন জমা হয়েছে!");
    reset();
    setOpen(false);
  };

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-20">
      <div className="container mx-auto px-4">
        {/* Header content... (remains same) */}
        
        {programs.map((prog, i) => <ProgramCard key={prog.id} prog={prog} index={i} />)}

        <div className="mb-12">
          <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-7 py-5 rounded-2xl font-bold text-white mb-2" style={{ background: "linear-gradient(135deg, #92400e, #d97706)" }}>
            ঋণের আবেদন ফর্ম {open ? "▲" : "▼"}
          </button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="welfare-card p-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input {...register("applicantName")} placeholder="আবেদনকারীর নাম" className="p-3 border rounded-xl" />
                  {errors.applicantName && <p className="text-red-500">{errors.applicantName.message}</p>}
                  <input {...register("phone")} placeholder="ফোন নম্বর" className="p-3 border rounded-xl" />
                  <input {...register("loanAmount", { valueAsNumber: true })} type="number" placeholder="পরিমাণ" className="p-3 border rounded-xl" />
                  <button type="submit" disabled={isSubmitting} className="md:col-span-2 py-4 bg-orange-700 text-white rounded-xl">
                    {isSubmitting ? "জমা হচ্ছে..." : "আবেদন জমা দিন"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}