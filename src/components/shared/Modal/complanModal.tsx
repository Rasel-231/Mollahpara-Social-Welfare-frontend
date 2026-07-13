"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useCreateComplainMutation } from "@/Redux/api/complainApi";

const ComplainSchema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "বৈধ ফোন নম্বর দিন"),
  email: z.string().email("বৈধ ইমেইল দিন").optional().or(z.literal("")),
  location: z.string().min(3, "এলাকার নাম দিন"),
  subject: z.string().min(3, "বিষয় কমপক্ষে ৩ অক্ষর হতে হবে"),
  details: z.string().min(10, "বিস্তারিত কমপক্ষে ১০ অক্ষর হতে হবে"),
});

type ComplainFormValues = z.infer<typeof ComplainSchema>;

export default function ComplainModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ComplainFormValues>({
    resolver: zodResolver(ComplainSchema),
  });
  const [createComplain, { isLoading }] = useCreateComplainMutation();

  const onSubmit = async (data: ComplainFormValues) => {
    try {
      await createComplain({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        village: data.location,
        subject: data.subject,
        message: data.details,
      }).unwrap();
      toast.success("আপনার অভিযোগটি সফলভাবে জমা হয়েছে।");
      reset();
      onClose();
    } catch {
      toast.error("অভিযোগ জমা দিতে ব্যর্থ হয়েছে, আবার চেষ্টা করুন।");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[999] backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-3xl p-8 z-[1000] shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-blue-950 mb-6 font-bengali">
              📢 অভিযোগ করুন
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("name")}
                    placeholder="আপনার নাম"
                    className="p-3 rounded-xl border border-gray-300 w-full text-black"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input
                    {...register("phone")}
                    placeholder="ফোন নম্বর"
                    className="p-3 rounded-xl border border-gray-300 w-full text-black"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <input
                  {...register("email")}
                  placeholder="ইমেইল (ঐচ্ছিক)"
                  className="p-3 rounded-xl border border-gray-300 w-full text-black"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <input
                  {...register("location")}
                  placeholder="এলাকা"
                  className="p-3 rounded-xl border border-gray-300 w-full text-black"
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
              </div>
              <div>
                <input
                  {...register("subject")}
                  placeholder="বিষয়"
                  className="p-3 rounded-xl border border-gray-300 w-full text-black"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <textarea
                  {...register("details")}
                  placeholder="বিস্তারিত অভিযোগ..."
                  className="p-3 rounded-xl border border-gray-300 w-full h-24 text-black"
                />
                {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-950 text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    জমা হচ্ছে...
                  </>
                ) : (
                  "জমা দিন"
                )}
              </button>
            </form>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ✕
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
