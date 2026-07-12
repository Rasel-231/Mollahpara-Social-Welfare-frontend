"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Loader2,
  GripVertical,
  Tag,
} from "lucide-react";
import {
  useGetAllGalleryCategoriesQuery,
  useCreateGalleryCategoryMutation,
  useUpdateGalleryCategoryMutation,
  useDeleteGalleryCategoryMutation,
  IGalleryCategory,
} from "@/Redux/api/galleryCategoryApi";
import { toast } from "react-toastify";

const defaultIcons = ["🩸", "🎁", "📚", "🎊", "📸", "🌿", "❤️", "🏫", "🏥", "🎯"];

export default function GalleryCategoryManager() {
  const router = useRouter();
  const { data: categoriesData, isLoading } = useGetAllGalleryCategoriesQuery();
  const [createCategory, { isLoading: creating }] =
    useCreateGalleryCategoryMutation();
  const [updateCategory, { isLoading: updating }] =
    useUpdateGalleryCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] =
    useDeleteGalleryCategoryMutation();

  const categories: IGalleryCategory[] = categoriesData?.data ?? [];

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<IGalleryCategory | null>(null);
  const [deleteItem, setDeleteItem] = useState<IGalleryCategory | null>(null);

  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [icon, setIcon] = useState("📸");
  const [sortOrder, setSortOrder] = useState(0);

  const resetForm = () => {
    setName("");
    setLabel("");
    setIcon("📸");
    setSortOrder(0);
    setShowForm(false);
    setEditItem(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const handleOpenEdit = (cat: IGalleryCategory) => {
    setEditItem(cat);
    setName(cat.name);
    setLabel(cat.label);
    setIcon(cat.icon ?? "📸");
    setSortOrder(cat.sortOrder);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!name.trim() || !label.trim()) {
      toast.error("নাম এবং লেবেল প্রয়োজন।");
      return;
    }
    try {
      if (editItem) {
        await updateCategory({
          id: editItem.id,
          data: { name: name.trim(), label: label.trim(), icon, sortOrder },
        }).unwrap();
        toast.success("ক্যাটাগরি আপডেট হয়েছে।");
      } else {
        await createCategory({
          name: name.trim(),
          label: label.trim(),
          icon,
          sortOrder,
        }).unwrap();
        toast.success("ক্যাটাগরি তৈরি হয়েছে।");
      }
      resetForm();
    } catch {
      toast.error("সমস্যা হয়েছে।");
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await deleteCategory(deleteItem.id).unwrap();
      toast.success("মুছে ফেলা হয়েছে।");
      setDeleteItem(null);
    } catch {
      toast.error("মুছতে সমস্যা হয়েছে।");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center">
        <Loader2 className="text-emerald-400 animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] p-4 md:p-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <Tag size={22} className="text-emerald-400" />
          <h1 className="text-xl font-bold">গ্যালারি ক্যাটাগরি ম্যানেজমেন্ট</h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
        >
          <Plus size={18} />
          নতুন ক্যাটাগরি
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c21] border border-gray-700 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">
              {editItem ? "ক্যাটাগরি এডিট করুন" : "নতুন ক্যাটাগরি তৈরি করুন"}
            </h3>

            <label className="text-sm text-gray-400 mb-1 block">
              নাম (ইংরেজি slug) *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: bloodDonation"
              className="w-full bg-[#0b0e14] border border-gray-700 rounded-xl p-3 mb-3 text-white text-sm"
            />

            <label className="text-sm text-gray-400 mb-1 block">
              লেবেল (বাংলা) *
            </label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="যেমন: রক্তদান"
              className="w-full bg-[#0b0e14] border border-gray-700 rounded-xl p-3 mb-3 text-white text-sm"
            />

            <label className="text-sm text-gray-400 mb-1 block">আইকন</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {defaultIcons.map((ic) => (
                <button
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                    icon === ic
                      ? "bg-emerald-600 ring-2 ring-emerald-400"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>

            <label className="text-sm text-gray-400 mb-1 block">
              সাজানোর ক্রম
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full bg-[#0b0e14] border border-gray-700 rounded-xl p-3 mb-4 text-white text-sm"
            />

            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-700 py-2.5 rounded-xl font-bold text-white hover:bg-gray-600 transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={handleSave}
                disabled={creating || updating}
                className="flex-1 bg-emerald-600 py-2.5 rounded-xl font-bold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {creating || updating ? "সেভ হচ্ছে..." : "সেভ করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c21] border border-gray-700 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-2">নিশ্চিত করুন</h3>
            <p className="text-gray-300 text-sm mb-6">
              আপনি কি নিশ্চিতভাবে{" "}
              <strong className="text-white">
                {deleteItem.icon} {deleteItem.label}
              </strong>{" "}
              মুছতে চান? এতে এই ক্যাটাগরির সব ছবি আনক্যাটাগরাইজড হয়ে যাবে।
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteItem(null)}
                className="flex-1 bg-gray-700 py-2.5 rounded-xl font-bold text-white hover:bg-gray-600 transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 py-2.5 rounded-xl font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                মুছুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      {categories.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Tag size={48} className="mx-auto mb-3 opacity-40" />
          <p>কোনো ক্যাটাগরি নেই। একটি তৈরি করুন!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#1a1c21] border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-4">
                <GripVertical size={18} className="text-gray-600" />
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="font-bold text-white">{cat.label}</p>
                  <p className="text-gray-500 text-xs">
                    {cat.name} • ক্রম: {cat.sortOrder}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setDeleteItem(cat)}
                  className="p-2 rounded-lg hover:bg-red-900/30 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
