"use client";

import { useEffect } from "react";

export default function AdminError({
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
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          Dashboard Error
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Something went wrong. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md bg-slate-900 hover:bg-slate-800 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
