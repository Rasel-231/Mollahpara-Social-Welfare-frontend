"use client";

import { useEffect } from "react";

export default function UserError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-lg font-bold text-welfare-green-800 font-bengali mb-2">
          কিছু সমস্যা হয়েছে
        </h2>
        <p className="text-sm text-welfare-green-500 font-bengali mb-6">
          পৃষ্ঠাটি লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-full text-sm font-semibold font-bengali text-white shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </div>
  );
}
