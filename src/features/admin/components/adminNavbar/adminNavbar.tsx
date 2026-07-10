"use client";

import { Search, Bell, Settings, Menu, User } from "lucide-react";
import Image from "next/image";
import { useProfileQuery } from "@/Redux/api/authApi";

export default function AdminNavbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { data: user } = useProfileQuery();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1a1c21] border-b border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* মোবাইল মেনু বাটন - সাইডবার টগল করবে */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* লোগো (মোবাইলে কিছুটা স্পেস অ্যাডজাস্ট করা হয়েছে) */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌿</span>
            </div>
            <span className="hidden sm:block font-bold text-lg text-white">
              মোল্লাপাড়া সমাজ কল্যাণ সংস্থা
            </span>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#121417] border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <button className="text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
              <div className="text-right">
                <p className="text-xs text-gray-400">
                  {user?.data.role ?? "User"}
                </p>
                <p className="text-sm font-bold text-white">
                  {user?.data?.name ?? "User"}
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-500">
                {user?.data?.image ? (
                  <Image
                    src={user.data.image}
                    alt={user.data.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <User size={18} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
