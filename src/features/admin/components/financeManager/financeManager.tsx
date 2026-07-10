"use client";

import { useState } from "react";
import { HandCoins, Wallet, TrendingDown, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const data = {
  fund: [
    { name: "আব্দুর রহিম", txn: "TXN101", method: "বিকাশ", amount: "৫,০০০" },
    { name: "ফাতেমা বেগম", txn: "TXN102", method: "নগদ", amount: "৩,০০০" },
  ],
  monthly: [
    { name: "আব্দুর রহিম", month: "জুন ২০২৬", amount: "৫০০", status: "Paid" },
    {
      name: "ফাতেমা বেগম",
      month: "জুন ২০২৬",
      amount: "৫০০",
      status: "Pending",
    },
  ],
  costing: [
    { purpose: "অফিস ভাড়া", amount: "৪,০০০", date: "০১/০৬/২০২৬" },
    { purpose: "ইন্টারনেট বিল", amount: "১,৫০০", date: "০২/০৬/২০২৬" },
  ],
  donation: [
    {
      project: "রক্তদান কর্মসূচি",
      amount: "২,০০০",
      date: "০৩/০৬/২০২৬",
      note: "খাবার খরচ",
    },
    {
      project: "ত্রাণ সহায়তা",
      amount: "৮,০০০",
      date: "০৪/০৬/২০২৬",
      note: "বন্যা ত্রান",
    },
  ],
};

export default function FinanceManager() {
  const [activeTab, setActiveTab] = useState("fund");

  return (
    <div className="space-y-6">
      {/* সামারি সেকশন (হালকা এন্ট্রি অ্যানিমেশন) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[HandCoins, Wallet, TrendingDown, Gift].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1a1c21] border border-gray-800 p-4 rounded-xl"
          >
            <Icon size={20} className="text-blue-500 mb-2" />
            <h4 className="text-white font-bold text-lg">৳১০,০০০</h4>
          </motion.div>
        ))}
      </div>

      {/* ট্যাব সিস্টেম */}
      <div className="bg-[#1a1c21] border border-gray-800 rounded-2xl p-6">
        <div className="flex overflow-x-auto space-x-6 border-b border-gray-800 mb-6">
          {[
            { id: "fund", name: "ফান্ড সংগ্রহ" },
            { id: "monthly", name: "মাসিক চাঁদা" },
            { id: "costing", name: "ক্লাব খরচ" },
            { id: "donation", name: "প্রকল্প দান" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative pb-4 text-sm font-medium whitespace-nowrap text-gray-400"
            >
              {tab.name}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* টেবিল অ্যানিমেশন */}
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.table
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full text-left text-sm text-gray-300"
            >
              <thead className="text-gray-500 border-b border-gray-800">
                <tr>
                  {activeTab === "fund" && (
                    <>
                      <th>নাম</th>
                      <th>ট্রানজেকশন আইডি</th>
                      <th>পদ্ধতি</th>
                      <th>পরিমাণ</th>
                    </>
                  )}
                  {activeTab === "monthly" && (
                    <>
                      <th>নাম</th>
                      <th>মাস</th>
                      <th>পরিমাণ</th>
                      <th>স্ট্যাটাস</th>
                    </>
                  )}
                  {activeTab === "costing" && (
                    <>
                      <th>খাত</th>
                      <th>পরিমাণ</th>
                      <th>তারিখ</th>
                    </>
                  )}
                  {activeTab === "donation" && (
                    <>
                      <th>প্রকল্প</th>
                      <th>পরিমাণ</th>
                      <th>তারিখ</th>
                      <th>নোট</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {data[activeTab as keyof typeof data].map(
                  (item: Record<string, string>, i) => (
                    <tr key={i} className="hover:bg-gray-800/30">
                      {Object.values(item).map((val, j) => (
                        <td key={j} className="py-4 font-medium text-white">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ),
                )}
              </tbody>
            </motion.table>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
