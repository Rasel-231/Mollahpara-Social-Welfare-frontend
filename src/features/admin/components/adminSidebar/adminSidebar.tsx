"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Wallet, Users, Image as MediaIcon, 
   Bell, Settings 
} from "lucide-react";

const menuItems = [
  { name: "প্রকল্পসমূহ", icon: LayoutDashboard, href: "/dashboard" },
  { name: "আর্থিক ব্যবস্থাপনা", icon: Wallet, href: "/dashboard/finance" },
  { name: "সদস্য ডাটাবেজ", icon: Users, href: "/dashboard/members" },
  { name: "মিডিয়া সেন্টার", icon: MediaIcon, href: "/dashboard/media" },
 { name: "নোটিফিকেশন", icon: Bell, href: "/dashboard/notifications" },
  { name: "সেটিংস", icon: Settings, href: "/dashboard/#" },
];

export default function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const [active, setActive] = useState("প্রকল্পসমূহ");

  return (
    <>
      {/* সাইডবার কন্টেন্ট */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 h-screen bg-[#1a1c21] text-gray-300 p-6 flex flex-col justify-between border-r border-gray-800 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 mt-10 md:mt-0">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <h1 className="text-white font-bold text-lg">মোল্লাপাড়া সংস্থা</h1>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setActive(item.name);
                  setIsOpen(false); // মোবাইল মেনু বন্ধ হবে
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active === item.name 
                  ? "bg-emerald-600/20 text-emerald-400 border-l-4 border-emerald-500" 
                  : "hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
          Login
        </button>
      </aside>

      {/* মোবাইল overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}