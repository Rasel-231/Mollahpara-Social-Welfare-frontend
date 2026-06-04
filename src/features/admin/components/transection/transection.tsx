"use client";

import { useState } from "react";
import { HandCoins, CheckCircle2, XCircle, Receipt } from "lucide-react"; // Info বাদ দিয়ে এখানে আইকনগুলো সাজানো

interface Donation {
  senderName: string;
  amount: string | number;
  method: string;
  txId: string;
  date: string;
}

export default function DonationRequest({ donation }: { donation: Donation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (action: string) => {
    console.log(`Donation of ${donation.amount} ${action}ed`);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* কার্ড UI */}
      <div className="bg-[#1a1c21] border border-gray-700 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-emerald-500/50 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center">
            <HandCoins className="text-emerald-500" />
          </div>
          <div>
            <h4 className="text-white font-bold">{donation.senderName}</h4>
            <p className="text-emerald-400 font-semibold text-sm">{donation.amount} টাকা পাঠিয়েছেন</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {/* এখানে নির্দিষ্ট বাটন হিসেবে CheckCircle2 ব্যবহার করা হয়েছে */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded-lg text-white transition-all"
            title="View Details"
          >
            <CheckCircle2 size={18} />
          </button>
        </div>
      </div>

      {/* পেমেন্ট ডিটেইলস পপআপ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c21] border border-emerald-500/50 w-full max-w-sm rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
              <div className="flex items-center gap-3">
                <Receipt className="text-emerald-500" size={24} />
                <h3 className="text-xl font-bold">লেনদেনের তথ্য</h3>
              </div>
              {/* ক্লোজ করার জন্য XCircle আইকন */}
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <p>প্রেরক: <span className="text-white font-semibold">{donation.senderName}</span></p>
              <p>পরিমাণ: <span className="text-emerald-400 font-bold text-lg">{donation.amount} টাকা</span></p>
              <p>পদ্ধতি: <span className="text-white">{donation.method}</span></p>
              <p>ট্রানজেকশন আইডি: <span className="text-white font-mono">{donation.txId}</span></p>
              <p>তারিখ: <span className="text-white">{donation.date}</span></p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => handleAction("accept")} 
                className="flex-1 bg-emerald-600 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} /> Confirm
              </button>
              {/* এখানেও XCircle ব্যবহার করা হয়েছে */}
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="flex-1 bg-gray-700 py-2 rounded-lg font-bold hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <XCircle size={18} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}