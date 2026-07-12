"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  Video,
  ImageIcon,
  Newspaper,
  LucideIcon,
  X,
  Eye,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { MediaTable, DataRow } from "./mediaTable";
import {
  useGetAllVideosQuery,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  IVideo,
} from "@/Redux/api/videoApi";
import {
  useGetAllNewsQuery,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  INews,
} from "@/Redux/api/newsApi";
import {
  useGetAllGalleriesQuery,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
  IGallery,
} from "@/Redux/api/galleryApi";
import {
  useGetAllGalleryCategoriesQuery,
  IGalleryCategory,
} from "@/Redux/api/galleryCategoryApi";
import {
  useGetAllEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  IUpcomingEvent,
} from "@/Redux/api/upcomingEventApi";
import { toast } from "react-toastify";

type Category = "videos" | "blogs" | "images" | "projects";

const categoryConfig: Record<
  Category,
  {
    label: string;
    icon: LucideIcon;
  }
> = {
  videos: { label: "ভিডিও গ্যালারি", icon: Video },
  blogs: { label: "ব্লগ ও সংবাদ", icon: Newspaper },
  images: { label: "চিত্র গ্যালারি", icon: ImageIcon },
  projects: { label: "প্রকল্প", icon: LayoutGrid },
};



export default function MediaCrudPage({ category }: { category: string }) {
  const router = useRouter();
  const cat = category as Category;
  const config = categoryConfig[cat] ?? categoryConfig.videos;

  const [viewItem, setViewItem] = useState<DataRow | null>(null);
  const [editItem, setEditItem] = useState<DataRow | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [deleteItem, setDeleteItem] = useState<DataRow | null>(null);

  const { data: categoriesData } = useGetAllGalleryCategoriesQuery();
  const galleryCategories: IGalleryCategory[] = categoriesData?.data ?? [];

  // ─── Data fetching ───────────────────────────────
  const videosQ = useGetAllVideosQuery(undefined, { skip: cat !== "videos" });
  const newsQ = useGetAllNewsQuery(undefined, { skip: cat !== "blogs" });
  const galleryQ = useGetAllGalleriesQuery(undefined, {
    skip: cat !== "images",
  });
  const projectsQ = useGetAllEventsQuery(undefined, {
    skip: cat !== "projects",
  });

  // ─── Mutations ───────────────────────────────────
  const [updateVideo, { isLoading: updatingVideo }] =
    useUpdateVideoMutation();
  const [deleteVideo, { isLoading: deletingVideo }] =
    useDeleteVideoMutation();
  const [updateNews, { isLoading: updatingNews }] = useUpdateNewsMutation();
  const [deleteNews, { isLoading: deletingNews }] = useDeleteNewsMutation();
  const [updateGallery, { isLoading: updatingGallery }] =
    useUpdateGalleryMutation();
  const [deleteGallery, { isLoading: deletingGallery }] =
    useDeleteGalleryMutation();
  const [updateEvent, { isLoading: updatingEvent }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: deletingEvent }] = useDeleteEventMutation();

  const isLoading =
    videosQ.isLoading || newsQ.isLoading || galleryQ.isLoading || projectsQ.isLoading;

  // ─── Map to DataRow ──────────────────────────────
  const mapToRows = (): DataRow[] => {
    switch (cat) {
      case "videos": {
        const items = (videosQ.data?.data ?? []) as IVideo[];
        return items.map((v) => ({
          id: v.id,
          title: v.title,
          imageUrl: `https://img.youtube.com/vi/${extractYoutubeId(v.videoUrl)}/mqdefault.jpg`,
        }));
      }
      case "blogs": {
        const items = (newsQ.data?.data ?? []) as INews[];
        return items.map((n) => ({
          id: n.id,
          title: n.title,
          imageUrl: n.image ?? undefined,
        }));
      }
      case "images": {
        const items = (galleryQ.data?.data ?? []) as IGallery[];
        return items.map((g) => ({
          id: g.id,
          title: g.title,
          imageUrl: g.image,
          categoryId: g.categoryId,
          categoryName: g.category?.label ?? null,
          categoryIcon: g.category?.icon ?? null,
        }));
      }
      case "projects": {
        const items = (projectsQ.data?.data ?? []) as IUpcomingEvent[];
        return items.map((p) => ({
          id: p.id,
          title: p.title,
          imageUrl: p.image ?? undefined,
        }));
      }
      default:
        return [];
    }
  };

  // ─── View ─────────────────────────────────────────
  const viewModal = viewItem && (
    <Modal onClose={() => setViewItem(null)}>
      <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-3">
        <Eye className="text-emerald-400" size={22} />
        <h3 className="text-lg font-bold text-white">বিবরণ</h3>
      </div>
      <div className="space-y-2 text-sm text-gray-300">
        <p>
          <span className="text-gray-500">আইডি:</span>{" "}
          <span className="text-white">{viewItem.id}</span>
        </p>
        <p>
          <span className="text-gray-500">শিরোনাম:</span>{" "}
          <span className="text-white">{viewItem.title}</span>
        </p>
        {cat === "images" && viewItem.categoryName && (
          <p>
            <span className="text-gray-500">ক্যাটাগরি:</span>{" "}
            <span className="text-white">{viewItem.categoryIcon} {viewItem.categoryName}</span>
          </p>
        )}
        <p>
          <span className="text-gray-500">ধরণ:</span>{" "}
          <span className="text-white">{config.label}</span>
        </p>
      </div>
    </Modal>
  );

  // ─── Edit ─────────────────────────────────────────
  const handleEditOpen = (item: DataRow) => {
    setEditItem(item);
    setEditTitle(item.title);
    setEditCategoryId(item.categoryId ?? "");
  };

  const handleEditSave = async () => {
    if (!editItem || !editTitle.trim()) return;
    try {
      switch (cat) {
        case "videos":
          await updateVideo({
            id: editItem.id,
            data: { title: editTitle } as Partial<IVideo>,
          }).unwrap();
          break;
        case "blogs": {
          const fd = new FormData();
          fd.append("title", editTitle);
          await updateNews({ id: editItem.id, data: fd }).unwrap();
          break;
        }
        case "images": {
          const fd = new FormData();
          fd.append("title", editTitle);
          if (editCategoryId) fd.append("categoryId", editCategoryId);
          await updateGallery({ id: editItem.id, data: fd }).unwrap();
          break;
        }
        case "projects":
          await updateEvent({
            id: editItem.id,
            data: { title: editTitle } as Partial<IUpcomingEvent>,
          }).unwrap();
          break;
      }
      toast.success("আপডেট করা হয়েছে।", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setEditItem(null);
    } catch {
      toast.error("আপডেট করতে সমস্যা হয়েছে।", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const editModal = editItem && (
    <Modal onClose={() => setEditItem(null)}>
      <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-3">
        <Edit className="text-blue-400" size={22} />
        <h3 className="text-lg font-bold text-white">এডিট করুন</h3>
      </div>
      <label className="text-sm text-gray-400 mb-1 block">শিরোনাম</label>
      <input
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full bg-[#0b0e14] border border-gray-700 rounded-xl p-3 mb-4 text-white text-sm"
      />
      {cat === "images" && (
        <>
          <label className="text-sm text-gray-400 mb-1 block">ক্যাটাগরি</label>
          <select
            value={editCategoryId}
            onChange={(e) => setEditCategoryId(e.target.value)}
            className="w-full bg-[#0b0e14] border border-gray-700 rounded-xl p-3 mb-4 text-white text-sm"
          >
            <option value="">ক্যাটাগরি নির্বাচন করুন</option>
            {galleryCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </>
      )}
      <button
        onClick={handleEditSave}
        disabled={updatingVideo || updatingNews || updatingGallery || updatingEvent}
        className="w-full bg-blue-600 py-2.5 rounded-xl font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        সেভ করুন
      </button>
    </Modal>
  );

  // ─── Delete ───────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    try {
      switch (cat) {
        case "videos":
          await deleteVideo(deleteItem.id).unwrap();
          break;
        case "blogs":
          await deleteNews(deleteItem.id).unwrap();
          break;
        case "images":
          await deleteGallery(deleteItem.id).unwrap();
          break;
        case "projects":
          await deleteEvent(deleteItem.id).unwrap();
          break;
      }
      toast.success("মুছে ফেলা হয়েছে।", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setDeleteItem(null);
    } catch {
      toast.error("মুছতে সমস্যা হয়েছে।", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const deleteModal = deleteItem && (
    <Modal onClose={() => setDeleteItem(null)}>
      <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-3">
        <Trash2 className="text-red-400" size={22} />
        <h3 className="text-lg font-bold text-white">নিশ্চিত করুন</h3>
      </div>
      <p className="text-gray-300 text-sm mb-6">
        আপনি কি নিশ্চিতভাবে <strong className="text-white">{deleteItem.title}</strong> মুছতে চান?
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setDeleteItem(null)}
          className="flex-1 bg-gray-700 py-2.5 rounded-xl font-bold text-white hover:bg-gray-600 transition-colors"
        >
          বাতিল
        </button>
        <button
          onClick={handleDeleteConfirm}
          disabled={deletingVideo || deletingNews || deletingGallery || deletingEvent}
          className="flex-1 bg-red-600 py-2.5 rounded-xl font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          মুছুন
        </button>
      </div>
    </Modal>
  );

  // ─── Render ──────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center">
        <Loader2 className="text-emerald-400 animate-spin" size={32} />
      </div>
    );
  }

  const rows = mapToRows();
  const SelectedIcon = config.icon;

  return (
    <div className="min-h-screen bg-[#0b0e14] p-4 md:p-8 text-white">
      <MediaTable
        title={`${config.label} ম্যানেজমেন্ট`}
        icon={SelectedIcon}
        data={rows}
        onBack={() => router.back()}
        onView={(item) => setViewItem(item)}
        onEdit={handleEditOpen}
        onDelete={(item) => setDeleteItem(item)}
      />
      {viewModal}
      {editModal}
      {deleteModal}
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1c21] border border-gray-700 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="float-right text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

function extractYoutubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/\s]+)/
  );
  return match ? match[1] : "";
}
