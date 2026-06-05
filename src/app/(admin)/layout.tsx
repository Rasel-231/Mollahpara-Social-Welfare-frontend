"use client";

import { useState } from "react";
import AdminNavbar from "@/features/admin/components/adminNavbar/adminNavbar";
import AdminSidebar from "@/features/admin/components/adminSidebar/adminSidebar";
import ProtectedRoute from "@/features/admin/context/AuthProvider/AuthProvider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
    <div className="flex h-screen bg-[#121417]">
      {/* Sidebar: স্টেট পাঠানো হয়েছে */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile Overlay: সাইডবার ওপেন থাকলে বাইরে ক্লিক করলে বন্ধ হবে */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar: টগল ফাংশন পাঠানো হয়েছে */}
        <AdminNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
  
};

export default AdminLayout;