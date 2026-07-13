"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCreateUserMutation } from "@/Redux/api/userApi";
import { toast } from "react-toastify";

interface MemberFormData {
  name: string;
  phone: string;
  email: string;
  designation: string;
  password: string;
  village: string;
  bloodGroup: string;
  role: string;
  image: FileList;
}

export default function AddMemberModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<MemberFormData>({
    defaultValues: {
      password: "Member@123",
    },
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const { onChange: registerImageOnChange, ...imageRegisterRest } =
    register("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerImageOnChange(e);
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<MemberFormData> = async (data) => {
    try {
      const formData = new FormData();

      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        designation: data.designation,
        village: data.village,
        bloodGroup: data.bloodGroup,
        role: data.role,
      };
      formData.append("data", JSON.stringify(payload));

      if (data.image?.[0]) {
        formData.append("file", data.image[0]);
      }

      await createUser(formData).unwrap();
      toast.success("সদস্য যোগ করা হয়েছে");
      reset();
      setPreview(null);
      onClose();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "সদস্য যোগ করা যায়নি");
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
            className="fixed inset-0 bg-black/70 z-[999] backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-[#1a1c21] border border-gray-700 rounded-3xl p-6 z-[1000] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                নতুন সদস্য যোগ করুন
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="relative w-24 h-24 mx-auto rounded-full bg-[#121417] border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer overflow-hidden mb-4 hover:border-emerald-500 transition-colors">
                {preview ? (
                  <Image
                    src={preview}
                    alt="প্রোফাইল ছবি"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <Upload className="text-gray-400" size={28} />
                )}
                <input
                  type="file"
                  {...imageRegisterRest}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <input
                  {...register("name", { required: true })}
                  placeholder="নাম *"
                  className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  {...register("phone", { required: true })}
                  placeholder="ফোন *"
                  className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <input
                {...register("email")}
                type="email"
                placeholder="ইমেইল (ঐচ্ছিক)"
                className="w-full p-3 bg-[#121417] rounded-xl border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="পাসওয়ার্ড * (ন্যূনতম ৬ অক্ষর)"
                className="w-full p-3 bg-[#121417] rounded-xl border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  {...register("designation")}
                  placeholder="পেশা"
                  className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  {...register("village")}
                  placeholder="গ্রাম/এলাকা"
                  className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  {...register("bloodGroup")}
                  className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">রক্তের গ্রুপ</option>
                  <option value="A_POSITIVE">A+</option>
                  <option value="A_NEGATIVE">A−</option>
                  <option value="B_POSITIVE">B+</option>
                  <option value="B_NEGATIVE">B−</option>
                  <option value="AB_POSITIVE">AB+</option>
                  <option value="AB_NEGATIVE">AB−</option>
                  <option value="O_POSITIVE">O+</option>
                  <option value="O_NEGATIVE">O−</option>
                </select>
                <select
                  {...register("role")}
                  className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="MEMBER">সদস্য</option>
                  <option value="ADMIN">এডমিন</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-bold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    যোগ করা হচ্ছে...
                  </span>
                ) : (
                  "জমা দিন"
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
