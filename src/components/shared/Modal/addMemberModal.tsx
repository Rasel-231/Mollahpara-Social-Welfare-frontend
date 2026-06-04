"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

// ১. আপনার দেওয়া সব ইনফরমেশনসহ ইন্টারফেস
interface MemberFormData {
  name: string;
  phone: string;
  email: string;
  profession: string;
  area: string;
  bloodGroup: string;
  role: string;
  profileImage: FileList;
}

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const { register, handleSubmit, reset } = useForm<MemberFormData>();
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<MemberFormData> = (data) => {
    console.log("Full Member Info:", { ...data, imagePreview: preview });
    reset();
    setPreview(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 z-[999] backdrop-blur-sm" />
          
          <motion.div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-[#1a1c21] border border-gray-700 rounded-3xl p-8 z-[1000] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">নতুন সদস্য যোগ করুন</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Image Upload */}
              <label className="relative w-24 h-24 mx-auto rounded-full bg-[#121417] border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer overflow-hidden mb-4">
                {preview ? <Image src={preview} alt="preview" fill className="object-cover" /> : <Upload className="text-gray-500" />}
                <input type="file" {...register("profileImage")} className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>

              {/* Grid Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <input {...register("name", { required: true })} placeholder="নাম" className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full" />
                <input {...register("phone", { required: true })} placeholder="ফোন" className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full" />
              </div>

              <input {...register("email")} type="email" placeholder="ইমেইল" className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full" />

              <div className="grid grid-cols-2 gap-4">
                <input {...register("profession")} placeholder="পেশা" className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full" />
                <input {...register("area")} placeholder="এলাকা" className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select {...register("bloodGroup")} className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full">
                  <option value="">রক্তের গ্রুপ</option>
                  <option value="A+">A+</option><option value="B+">B+</option><option value="O+">O+</option>
                </select>
                <select {...register("role")} className="p-3 bg-[#121417] rounded-xl border border-gray-700 text-white w-full">
                  <option value="সদস্য">সদস্য</option>
                  <option value="এডমিন">এডমিন</option>
                </select>
              </div>
              
              <button type="submit" className="w-full bg-emerald-600 py-3 rounded-xl font-bold text-white hover:bg-emerald-700">
                জমা দিন
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}