"use client";

import React, { useState, useEffect, useRef } from "react";
import OrangeSpinner from "@/components/shared/OrangeSpinner";
import {
  Bell,
  X,
  AlertCircle,
  Trash2,
  CheckCircle,
  User,
  Mail,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetAllComplainsQuery,
  useGetSingleComplainQuery,
  useDeleteComplainMutation,
} from "@/Redux/api/complainApi";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} মিনিট আগে`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} ঘণ্টা আগে`;
  return `${Math.floor(hrs / 24)} দিন আগে`;
}

/* ─── Notification Bell ─── */
function NotificationBell({
  complaints,
  onSelect,
  activeId,
}: {
  complaints: { id: string; subject: string; name: string; createdAt: string }[];
  onSelect: (id: string) => void;
  activeId: string | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <Bell size={19} className="text-slate-300" />
        {complaints.length > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-slate-950 animate-pulse">
            {complaints.length}
          </span>
        )}
      </button>

      <div
        className={`absolute left-0 top-full mt-2 w-[340px] origin-top-left transition-all duration-200 ease-out ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/95 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-slate-100">
              অভিযোগসমূহ
            </h3>
            <span className="text-xs text-slate-500">
              {complaints.length} টি
            </span>
          </div>
          <div className="max-h-[360px] overflow-y-auto">
            {complaints.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-slate-500">
                কোনো অভিযোগ নেই
              </p>
            )}
            {complaints.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelect(c.id);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 flex gap-3 border-b border-slate-800/60 last:border-0 hover:bg-slate-800/50 transition-colors ${
                  activeId === c.id ? "bg-slate-800/70" : ""
                }`}
              >
                <span className="mt-1.5 w-2 h-2 rounded-full shrink-0 bg-amber-400" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-slate-100 truncate">
                    {c.subject}
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    {c.name} · {timeAgo(c.createdAt)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Complaint Detail Drawer ─── */
function ComplaintDrawer({
  id,
  onClose,
}: {
  id: string | null;
  onClose: () => void;
}) {
  const { data: response, isLoading, isError } = useGetSingleComplainQuery(id!, {
    skip: !id,
  });
  const data = response?.data;
  const [deleteComplain, { isLoading: isDeleting }] =
    useDeleteComplainMutation();
  const [confirmAction, setConfirmAction] = useState<"approve" | "reject" | null>(null);

  useEffect(() => {
    setConfirmAction(null);
  }, [id]);

  const handleAction = async () => {
    if (!confirmAction || !id) return;
    try {
      await deleteComplain(id).unwrap();
      toast.success(
        confirmAction === "approve"
          ? "অভিযোগটি অনুমোদন করা হয়েছে"
          : "অভিযোগটি প্রত্যাখ্যান করা হয়েছে"
      );
      onClose();
    } catch {
      toast.error("কাজটি সম্পন্ন হয়নি, আবার চেষ্টা করুন");
    }
  };

  const open = id != null;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 z-40 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-slate-900 border-l border-slate-800 z-50 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-base font-semibold text-slate-100">
              অভিযোগের বিস্তারিত
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <OrangeSpinner />
              </div>
            )}

            {isError && !isLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-2 text-slate-500">
                <AlertCircle size={22} className="text-rose-400" />
                <p className="text-sm">অভিযোগটি খুঁজে পাওয়া যায়নি</p>
              </div>
            )}

            {data && !isLoading && (
              <div>
                <h3 className="text-lg font-semibold text-slate-50 leading-snug">
                  {data.subject}
                </h3>

                <div className="mt-4 flex flex-col gap-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-500" />
                    {data.name}
                  </div>
                  {data.user?.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-500" />
                      {data.user.email}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-500" />
                    {new Date(data.createdAt).toLocaleString("bn-BD")}
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-slate-800/50 border border-slate-800 p-4">
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {data.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          {data && !isLoading && (
            <div className="border-t border-slate-800 px-5 py-4">
              {!confirmAction ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmAction("reject")}
                    disabled={isDeleting}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-rose-900/60 bg-rose-950/30 text-rose-400 hover:bg-rose-950/60 hover:text-rose-300 px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                    প্রত্যাখ্যান
                  </button>
                  <button
                    onClick={() => setConfirmAction("approve")}
                    disabled={isDeleting}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-emerald-900/60 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-950/60 hover:text-emerald-300 px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <CheckCircle size={15} />
                    অনুমোদন
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="flex-1 text-xs text-slate-400">
                    {confirmAction === "approve"
                      ? "অনুমোদন করতে চান?"
                      : "প্রত্যাখ্যান করতে চান?"}
                  </p>
                  <button
                    onClick={() => setConfirmAction(null)}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={handleAction}
                    disabled={isDeleting}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white transition-colors disabled:opacity-60 ${
                      confirmAction === "approve"
                        ? "bg-emerald-600 hover:bg-emerald-500"
                        : "bg-rose-600 hover:bg-rose-500"
                    }`}
                  >
                    {isDeleting ? (
                      <OrangeSpinner size={13} />
                    ) : confirmAction === "approve" ? (
                      <CheckCircle size={13} />
                    ) : (
                      <Trash2 size={13} />
                    )}
                    হ্যাঁ, {confirmAction === "approve" ? "অনুমোদন" : "প্রত্যাখ্যান"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── Main Complain Page ─── */
export default function ComplainPage() {
  const { data: response, isLoading } = useGetAllComplainsQuery("");
  const complaints = response?.data ?? [];
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0b0e14] p-4 md:p-8 text-white">
      <div className="flex items-center justify-between mb-8 border-b border-white/[0.05] pb-4">
        <div className="flex items-center gap-3">
          <Bell className="text-emerald-400" size={28} />
          <h1 className="text-2xl md:text-3xl font-bold">অভিযোগ ব্যবস্থাপনা</h1>
        </div>
        <NotificationBell
          complaints={complaints}
          onSelect={setActiveId}
          activeId={activeId}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <OrangeSpinner size={24} />
        </div>
      ) : complaints.length === 0 ? (
        <p className="text-gray-500 text-sm bg-[#161a22]/30 p-4 rounded-xl border border-white/[0.02]">
          কোনো অভিযোগ নেই।
        </p>
      ) : (
        <div className="grid gap-2">
          {complaints.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/50 px-4 py-3 text-left transition-colors ${
                activeId === c.id ? "bg-slate-800/70 border-slate-700" : ""
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-medium truncate text-white">
                  {c.subject}
                </span>
                <span className="block text-xs text-slate-500">
                  {c.name} · {timeAgo(c.createdAt)}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      <ComplaintDrawer
        id={activeId}
        onClose={() => setActiveId(null)}
      />
    </div>
  );
}
