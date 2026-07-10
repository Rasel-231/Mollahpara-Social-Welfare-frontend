"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useUpdateUserMutation } from "@/Redux/api/userApi";
import { toast } from "react-toastify";
import { IUser } from "@/Redux/types/types";

interface EditMemberFormData {
  name: string;
  phone: string;
  email: string;
  designation: string;
  village: string;
  bloodGroup: string;
  role: string;
  memberType: string;
  isActive: boolean;
  password?: string;
  image?: FileList;
}

export default function EditMemberModal({
  isOpen,
  onClose,
  member,
}: {
  isOpen: boolean;
  onClose: () => void;
  member: IUser | null;
}) {
  const { register, handleSubmit, reset } = useForm<EditMemberFormData>();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (member) {
      reset({
        name: member.name ?? "",
        phone: member.phone ?? "",
        email: member.email ?? "",
        designation: member.designation ?? "",
        village: member.village ?? "",
        bloodGroup: member.bloodGroup ?? "",
        role: member.role ?? "MEMBER",
        isActive: member.isActive ?? true,
        memberType: member.memberType ?? "GENERAL",
        password: "",
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilePreview(null);
    }
  }, [member, reset, isOpen]);

  const preview = filePreview ?? member?.image ?? null;

  const { onChange: registerImageOnChange, ...imageRegisterRest } =
    register("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerImageOnChange(e);
    const file = e.target.files?.[0];
    if (file) setFilePreview(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<EditMemberFormData> = async (formValues) => {
    if (!member) return;

    try {
      const { password, image, ...rest } = formValues;
      const payload: Record<string, unknown> = { ...rest };
      if (password && password.trim().length > 0) {
        payload.password = password;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (image?.[0]) {
        formData.append("file", image[0]);
      }

      await updateUser({ id: member.id, formData }).unwrap();
      toast.success("সদস্যের তথ্য আপডেট হয়েছে");
      onClose();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      console.error("Error:", error);
      toast.error(err?.data?.message || "তথ্য আপডেট করা যায়নি");
    }
  };

  if (!member) return null;

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
                সদস্যের তথ্য সম্পাদনা করুন
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
                {...register("password", { minLength: 6 })}
                type="password"
                placeholder="নতুন পাসওয়ার্ড (ঐচ্ছিক)"
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
                  className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full"
                >
                  <option value="">রক্তের গ্রুপ</option>
                  <option value="A_POSITIVE">A+</option>
                  <option value="A_NEGATIVE">A-</option>
                  <option value="B_POSITIVE">B+</option>
                  <option value="B_NEGATIVE">B-</option>
                  <option value="AB_POSITIVE">AB+</option>
                  <option value="AB_NEGATIVE">AB-</option>
                  <option value="O_POSITIVE">O+</option>
                  <option value="O_NEGATIVE">O-</option>
                </select>
                <select
                  {...register("role")}
                  className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full"
                >
                  <option value="MEMBER">সদস্য (MEMBER)</option>
                  <option value="ADMIN">এডমিন (ADMIN)</option>
                </select>
              </div>

              <select
                {...register("memberType")}
                className="w-full p-3 bg-[#121417] rounded-xl border border-gray-700 text-white"
              >
                <option value="PRESIDENT">সভাপতি</option>
                <option value="VICE_PRESIDENT">সহ-সভাপতি</option>
                <option value="SECRETARY">সাধারণ সম্পাদক</option>
                <option value="JOINT_SECRETARY">যুগ্ম সম্পাদক</option>
                <option value="TREASURER">কোষাধ্যক্ষ</option>
                <option value="ORGANIZING_SEC">সাংগঠনিক সম্পাদক</option>
                <option value="EXECUTIVE">কার্যকরী সদস্য</option>
                <option value="GENERAL">সাধারণ সদস্য</option>
                <option value="ADVISOR">উপদেষ্টা</option>
                <option value="VOLUNTEER">স্বেচ্ছাসেবক</option>
              </select>

              <select
                {...register("isActive", {
                  setValueAs: (v) => v === "true",
                })}
                className="w-full p-3 bg-[#121417] rounded-xl border border-gray-700 text-white"
              >
                <option value="true">সক্রিয় (Active)</option>
                <option value="false">নিষ্ক্রিয় (Inactive)</option>
              </select>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-bold text-white transition-colors"
              >
                {isLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
