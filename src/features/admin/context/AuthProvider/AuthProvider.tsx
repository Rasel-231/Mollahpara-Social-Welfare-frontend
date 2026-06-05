"use client";


import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../AuthContext/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // লোডিং শেষ হওয়ার পর যদি টোকেন না থাকে, তবে লগইন পেজে রিডাইরেক্ট
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [token, loading, router]);

  // ডাটা চেক করার সময় সুন্দর গ্লাসমোরফিক ডার্ক লোডিং স্ক্রিন দেখাবে
  if (loading || !token) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center text-gray-400 gap-3">
        <Loader2 className="animate-spin text-emerald-400" size={40} />
        <p className="text-sm font-medium">নিরাপত্তা যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  // ইউজার অথেনটিকেটেড হলে মেইন পেজ রেন্ডার হবে
  return <>{children}</>;
}