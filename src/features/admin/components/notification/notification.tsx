"use client";

import { Bell, Users, HeartHandshake } from "lucide-react";
import MembershipRequest from "../membarTable/membarshipRequest";
import DonationRequest from "../transection/transection";



export default function NotificationsPage() {
  // ১. মেম্বারশিপ অনুরোধের স্যাম্পল ডাটা (ডাটাবেজ থেকে আসবে)
  const pendingUsers = [
    {
      name: "রাসেল হাসান",
      phone: "017XXXXXXXX",
      blood: "A+",
      address: "গাজীপুর, ঢাকা",
    },
  ];

  // ২. ডোনেশন অনুরোধের স্যাম্পল ডাটা (ডাটাবেজ থেকে আসবে)
  const pendingDonations = [
    {
      senderName: "আশা আক্তার",
      amount: 12000,
      method: "bKash",
      txId: "BKX987654321",
      date: "05 Jun 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0e14] p-4 md:p-8 text-white">
      
      {/* পেজ হেডার */}
      <div className="flex items-center gap-3 mb-8 border-b border-white/[0.05] pb-4">
        <Bell className="text-emerald-400" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold">নোটিফিকেশন সেন্টার</h1>
      </div>

      <div className="space-y-10">
        
        {/* সেকশন ১: মেম্বারশিপ অনুরোধ */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-blue-400" size={20} />
            <h2 className="text-lg font-bold text-gray-300">নতুন মেম্বারশিপ অনুরোধ ({pendingUsers.length})</h2>
          </div>
          
          {pendingUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingUsers.map((user, index) => (
                <MembershipRequest key={index} user={user} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-[#161a22]/30 p-4 rounded-xl border border-white/[0.02]">কোনো নতুন মেম্বারশিপ অনুরোধ নেই।</p>
          )}
        </div>

        {/* সেকশন ২: অনুদান বা পেমেন্ট অনুরোধ */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HeartHandshake className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-gray-300">নতুন অনুদান অনুরোধ ({pendingDonations.length})</h2>
          </div>

          {pendingDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingDonations.map((donation, index) => (
                <DonationRequest key={index} donation={donation} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-[#161a22]/30 p-4 rounded-xl border border-white/[0.02]">কোনo নতুন অনুদান অনুরোধ নেই।</p>
          )}
        </div>

      </div>
    </div>
  );
}