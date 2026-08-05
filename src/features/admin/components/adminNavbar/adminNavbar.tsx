"use client";

import { Bell, Settings, Menu, User } from "lucide-react";
import Image from "next/image";
import { useProfileQuery } from "@/Redux/api/authApi";
import Link from "next/link";

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
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center sm:gap-3 gap-1">
              <div className="w-9 h-9 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌿</span>
              </div>
              <span className="font-bold text-md text-white cursor-pointer">
                <Link href="/">মোল্লাপাড়া সোশ্যাল ক্লাব</Link>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 ml-auto">
            {/* Bell/Settings শুধু desktop-e দেখাবে */}
            <button className="hidden md:block text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <button className="hidden md:block text-gray-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>

            {/* User info — mobile e o দেখাবে */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 md:border-l border-gray-700">
              <div className="text-right hidden xs:block sm:block">
                <p className="text-xs text-gray-400">
                  {user?.data?.role ?? "User"}
                </p>
                <p className="text-sm font-bold text-white max-w-[100px] sm:max-w-none truncate">
                  {user?.data?.name ?? "User"}
                </p>
              </div>
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-500 shrink-0">
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
