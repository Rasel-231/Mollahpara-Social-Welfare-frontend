"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useCreateContactMutation } from "@/Redux/api/contactApi";

const ContactSchema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "বৈধ ফোন নম্বর দিন"),
  email: z.string().email("বৈধ ইমেইল দিন").optional().or(z.literal("")),
  location: z.string().min(3, "এলাকার নাম দিন"),
  position: z.string().min(2, "পদবি দিন"),
  subject: z.string().min(3, "বিষয় কমপক্ষে ৩ অক্ষর হতে হবে"),
  message: z.string().min(10, "বার্তা কমপক্ষে ১০ অক্ষর হতে হবে"),
});

type ContactInput = z.infer<typeof ContactSchema>;

export default function ContactPageView() {
  const [createContact, { isLoading: isSubmitting }] = useCreateContactMutation();
  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<ContactInput>({ resolver: zodResolver(ContactSchema) });

  const onSubmit = async (data: ContactInput) => {
    try {
      await createContact({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        village: data.location,
        designation: data.position,
        subject: data.subject,
        message: data.message,
      }).unwrap();
      toast.success("আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই সাড়া দেব। 📩", { theme: "colored" });
      reset();
    } catch {
      toast.error("বার্তা পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।", { theme: "colored" });
    }
  };

  return (
    <div className="min-h-screen parchment-bg pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-12 shadow-xl px-8 lg:px-12 py-12"
          style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}
        >
          <div className="absolute right-8 text-8xl opacity-10 select-none top-1/2 -translate-y-1/2">📞</div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl animate-float">🌿</span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white font-bengali">যোগাযোগ করুন</h1>
            </div>
            <p className="text-welfare-green-200 font-bengali text-sm lg:text-base">
              আমাদের সাথে যোগাযোগ করতে নিচের ফর্মটি পূরণ করুন
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div className="welfare-card p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-welfare-gold-50 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-welfare-gold-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-welfare-green-800 text-sm font-bengali mb-0.5">ঠিকানা</h3>
                <p className="text-welfare-green-600 text-sm font-bengali">মোল্লাপাড়া, শ্রীপুর, গাজীপুর</p>
              </div>
            </motion.div>

            <motion.div className="welfare-card p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-welfare-green-50 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-welfare-green-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-welfare-green-800 text-sm font-bengali mb-0.5">ফোন</h3>
                <p className="text-welfare-green-600 text-sm">+880 1XXX-XXXXXX</p>
              </div>
            </motion.div>

            <motion.div className="welfare-card p-5">
              <h3 className="font-bold text-welfare-green-800 text-sm font-bengali mb-4">সোশ্যাল মিডিয়া</h3>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 rounded-xl flex items-center justify-center border-2" style={{ background: "rgba(24,119,242,0.1)", borderColor: "#1877F240", color: "#1877F2" }}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="#" className="w-12 h-12 rounded-xl flex items-center justify-center border-2" style={{ background: "rgba(255,0,0,0.1)", borderColor: "#FF000040", color: "#FF0000" }}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              </div>
            </motion.div>

            <motion.div className="welfare-card p-2 overflow-hidden rounded-2xl">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.536331908236!2d90.4010281!3d24.2574006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDE1JzI2LjYiTiA5MMKwMjQnMDMuNyJF!5e0!3m2!1sen!2sbd!4v1717550000000!5m2!1sen!2sbd" width="100%" height="250" style={{ border: 0, borderRadius: "12px" }} allowFullScreen loading="lazy"></iframe>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div className="lg:col-span-3 welfare-card p-6 lg:p-8">
            <h2 className="text-xl font-bold text-welfare-green-800 font-bengali mb-6">বার্তা পাঠান</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">নাম *</label>
                  <input {...register("name")} placeholder="আপনার পূর্ণ নাম লিখুন" className="w-full px-4 py-3 rounded-xl border border-welfare-green-200" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">ফোন *</label>
                  <input {...register("phone")} placeholder="01XXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-welfare-green-200" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">এলাকা *</label>
                  <input {...register("location")} placeholder="আপনার বর্তমান এলাকা" className="w-full px-4 py-3 rounded-xl border border-welfare-green-200" />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">পদবি *</label>
                  <input {...register("position")} placeholder="আপনার পদবি লিখুন" className="w-full px-4 py-3 rounded-xl border border-welfare-green-200" />
                  {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">ইমেইল</label>
                <input {...register("email")} placeholder="আপনার ইমেইল (ঐচ্ছিক)" className="w-full px-4 py-3 rounded-xl border border-welfare-green-200" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">বিষয় *</label>
                <input {...register("subject")} placeholder="বার্তার বিষয়বস্তু" className="w-full px-4 py-3 rounded-xl border border-welfare-green-200" />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">বার্তা *</label>
                <textarea {...register("message")} placeholder="আপনার বিস্তারিত বার্তা এখানে লিখুন..." className="w-full px-4 py-3 rounded-xl border border-welfare-green-200" rows={4}></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              
              <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl font-bold text-white transition-all" style={{ background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #166534, #15803d)" }}>
                {isSubmitting ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}