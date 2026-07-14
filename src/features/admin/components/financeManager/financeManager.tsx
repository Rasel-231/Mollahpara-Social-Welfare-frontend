"use client";

import { useState } from "react";
import OrangeSpinner from "@/components/shared/OrangeSpinner";
import {
  HandCoins,
  Wallet,
  TrendingDown,
  Gift,
  Plus,
  X,
  PiggyBank,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllFundsQuery, useCreateDonationMutation } from "@/Redux/api/fundsApi";
import { useGetAllCostingsQuery, useCreateCostingMutation } from "@/Redux/api/costingApi";
import { useGetAllMonthlyChandasQuery, useCreateMonthlyChandaMutation } from "@/Redux/api/monthlyChandaApi";
import { useGetAllProjectFundsQuery, useCreateProjectFundMutation } from "@/Redux/api/projectFundApi";
import { toast } from "react-toastify";

const tabs = [
  { id: "fund", name: "ফান্ড সংগ্রহ", icon: HandCoins },
  { id: "monthly", name: "মাসিক চাঁদা", icon: Wallet },
  { id: "costing", name: "ক্লাব খরচ", icon: TrendingDown },
  { id: "donation", name: "প্রকল্প দান", icon: Gift },
];

const monthOptions = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

const paymentMethods = ["BKASH", "NAGAD", "ROCKET", "CREDIT_CARD", "BANK_TRANSFER"];
const paymentMethodBn: Record<string, string> = {
  BKASH: "বিকাশ", NAGAD: "নগদ", ROCKET: "রকেট", CREDIT_CARD: "ক্রেডিট কার্ড", BANK_TRANSFER: "ব্যাংক ট্রান্সফার",
};
const purposeOptions = ["GENERAL", "BLOOD_DONATION", "EDUCATION", "RELIEF", "OTHER"];
const purposeBn: Record<string, string> = {
  GENERAL: "সাধারণ", BLOOD_DONATION: "রক্তদান", EDUCATION: "শিক্ষা", RELIEF: "ত্রাণ", OTHER: "অন্যান্য",
};
const projectStatuses = ["PLANNING", "ONGOING", "COMPLETED", "CANCELLED"];
const projectStatusBn: Record<string, string> = {
  PLANNING: "পরিকল্পনা", ONGOING: "চলমান", COMPLETED: "সম্পন্ন", CANCELLED: "বাতিল",
};

type DonationMutation = ReturnType<typeof useCreateDonationMutation>[0];
type MonthlyChandaMutation = ReturnType<typeof useCreateMonthlyChandaMutation>[0];
type CostingMutation = ReturnType<typeof useCreateCostingMutation>[0];
type ProjectFundMutation = ReturnType<typeof useCreateProjectFundMutation>[0];

export default function FinanceManager() {
  const [activeTab, setActiveTab] = useState("fund");
  const [showModal, setShowModal] = useState(false);

  // ─── Data Fetching ──────────────────────────────
  const { data: fundData, isLoading: fundLoading } = useGetAllFundsQuery("");
  const { data: chandaData, isLoading: chandaLoading } = useGetAllMonthlyChandasQuery("");
  const { data: costingData, isLoading: costingLoading } = useGetAllCostingsQuery("");
  const { data: projectFundData, isLoading: pfLoading } = useGetAllProjectFundsQuery("");

  // ─── Mutations ──────────────────────────────────
  const [createDonation, { isLoading: creatingDonation }] = useCreateDonationMutation();
  const [createChanda, { isLoading: creatingChanda }] = useCreateMonthlyChandaMutation();
  const [createCosting, { isLoading: creatingCosting }] = useCreateCostingMutation();
  const [createProjectFund, { isLoading: creatingPF }] = useCreateProjectFundMutation();

  const funds = fundData?.data ?? [];
  const chandas = chandaData?.data ?? [];
  const costings = costingData?.data ?? [];
  const projectFunds = projectFundData?.data ?? [];

  const isLoading = fundLoading || chandaLoading || costingLoading || pfLoading;

  // ─── Summary Calculation ────────────────────────
  const totalVerifiedFunds = funds
    .filter((f) => f.status === "VERIFIED")
    .reduce((sum, f) => sum + Number(f.amount), 0);

  const totalPaidChanda = chandas
    .filter((c) => c.status === "PAID")
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const totalCostings = costings.reduce((sum, c) => sum + Number(c.costing), 0);

  const totalProjectRaised = projectFunds.reduce((sum, p) => sum + Number(p.raised), 0);

  const totalFundIn = totalVerifiedFunds + totalPaidChanda;
  const totalFundOut = totalCostings + totalProjectRaised;
  const availableBalance = totalFundIn - totalFundOut;

  const summaryCards = [
    {
      label: "মোট ফান্ড",
      value: totalVerifiedFunds,
      icon: HandCoins,
      color: "text-emerald-500",
    },
    {
      label: "মোট চাঁদা",
      value: totalPaidChanda,
      icon: Wallet,
      color: "text-blue-500",
    },
    {
      label: "মোট খরচ",
      value: totalCostings,
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      label: "প্রকল্প তহবিল",
      value: totalProjectRaised,
      icon: Gift,
      color: "text-purple-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="text-center py-20 flex items-center justify-center">
        <OrangeSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Available Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1c21] border border-gray-800 p-6 rounded-2xl flex items-center justify-between"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${availableBalance >= 0 ? "bg-emerald-500" : "bg-red-500"}`}></div>
            <span className="text-gray-400 text-sm font-medium">মোট তহবিল ব্যালেন্স</span>
          </div>
          <h3 className={`text-2xl md:text-3xl font-bold tracking-tight ${availableBalance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            ৳{availableBalance.toLocaleString("bn-BD")}
          </h3>
          <div className="flex gap-4 mt-1 text-xs text-gray-500">
            <span className="text-emerald-400">আয়: +৳{totalFundIn.toLocaleString("bn-BD")}</span>
            <span className="text-red-400">ব্যয়: -৳{totalFundOut.toLocaleString("bn-BD")}</span>
          </div>
        </div>
        <PiggyBank size={40} className={`${availableBalance >= 0 ? "text-emerald-500" : "text-red-500"} opacity-80`} />
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1a1c21] border border-gray-800 p-4 rounded-xl"
          >
            <card.icon size={20} className={`${card.color} mb-2`} />
            <p className="text-gray-500 text-xs">{card.label}</p>
            <h4 className="text-white font-bold text-lg">৳{card.value.toLocaleString("bn-BD")}</h4>
          </motion.div>
        ))}
      </div>

      {/* Tab System */}
      <div className="bg-[#1a1c21] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between border-b border-gray-800 mb-6">
          <div className="flex overflow-x-auto space-x-6">
            {tabs.map((tab) => (
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
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg text-sm font-bold text-white transition-colors shrink-0 ml-4"
          >
            <Plus size={16} />
            যোগ করুন
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Fund Table */}
              {activeTab === "fund" && (
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-gray-500 border-b border-gray-800">
                    <tr>
                      <th className="pb-3">নাম</th>
                      <th className="pb-3">ট্রানজেকশন আইডি</th>
                      <th className="pb-3">পদ্ধতি</th>
                      <th className="pb-3">পরিমাণ</th>
                      <th className="pb-3">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {funds.length === 0 ? (
                      <tr><td colSpan={5} className="py-8 text-center text-gray-500">কোনো ফান্ড নেই</td></tr>
                    ) : funds.map((f) => (
                      <tr key={f.id} className="hover:bg-gray-800/30">
                        <td className="py-4 font-medium text-white">{f.donorName}</td>
                        <td className="py-4 text-gray-400">{f.transactionId}</td>
                        <td className="py-4">{paymentMethodBn[f.paymentMethod] ?? f.paymentMethod}</td>
                        <td className="py-4 text-white font-bold">৳{Number(f.amount).toLocaleString("bn-BD")}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            f.status === "VERIFIED" ? "bg-emerald-900/50 text-emerald-400" :
                            f.status === "REJECTED" ? "bg-red-900/50 text-red-400" :
                            "bg-yellow-900/50 text-yellow-400"
                          }`}>{f.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Monthly Chanda Table */}
              {activeTab === "monthly" && (
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-gray-500 border-b border-gray-800">
                    <tr>
                      <th className="pb-3">নাম</th>
                      <th className="pb-3">মাস</th>
                      <th className="pb-3">পরিমাণ</th>
                      <th className="pb-3">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {chandas.length === 0 ? (
                      <tr><td colSpan={4} className="py-8 text-center text-gray-500">কোনো চাঁদা নেই</td></tr>
                    ) : chandas.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-800/30">
                        <td className="py-4 font-medium text-white">{c.name}</td>
                        <td className="py-4 text-gray-400">{c.month} {c.year}</td>
                        <td className="py-4 text-white font-bold">৳{Number(c.amount).toLocaleString("bn-BD")}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            c.status === "PAID" ? "bg-emerald-900/50 text-emerald-400" :
                            c.status === "OVERDUE" ? "bg-red-900/50 text-red-400" :
                            "bg-yellow-900/50 text-yellow-400"
                          }`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Costing Table */}
              {activeTab === "costing" && (
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-gray-500 border-b border-gray-800">
                    <tr>
                      <th className="pb-3">খাত</th>
                      <th className="pb-3">পরিমাণ</th>
                      <th className="pb-3">তারিখ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {costings.length === 0 ? (
                      <tr><td colSpan={3} className="py-8 text-center text-gray-500">কোনো খরচ নেই</td></tr>
                    ) : costings.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-800/30">
                        <td className="py-4 font-medium text-white">{c.projectName}</td>
                        <td className="py-4 text-red-400 font-bold">-৳{Number(c.costing).toLocaleString("bn-BD")}</td>
                        <td className="py-4 text-gray-400">{new Date(c.createdAt).toLocaleDateString("bn-BD")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Project Fund Table */}
              {activeTab === "donation" && (
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-gray-500 border-b border-gray-800">
                    <tr>
                      <th className="pb-3">প্রকল্প</th>
                      <th className="pb-3">লক্ষ্যমাত্রা</th>
                      <th className="pb-3">সংগৃহীত</th>
                      <th className="pb-3">ক্যাটাগরি</th>
                      <th className="pb-3">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {projectFunds.length === 0 ? (
                      <tr><td colSpan={5} className="py-8 text-center text-gray-500">কোনো প্রকল্প নেই</td></tr>
                    ) : projectFunds.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-800/30">
                        <td className="py-4 font-medium text-white">{p.title}</td>
                        <td className="py-4 text-gray-400">৳{Number(p.amount).toLocaleString("bn-BD")}</td>
                        <td className="py-4 text-emerald-400 font-bold">৳{Number(p.raised).toLocaleString("bn-BD")}</td>
                        <td className="py-4 text-gray-400">{p.category}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            p.status === "COMPLETED" ? "bg-emerald-900/50 text-emerald-400" :
                            p.status === "ONGOING" ? "bg-blue-900/50 text-blue-400" :
                            p.status === "CANCELLED" ? "bg-red-900/50 text-red-400" :
                            "bg-gray-800 text-gray-400"
                          }`}>{projectStatusBn[p.status] ?? p.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <AddModal
          tab={activeTab}
          onClose={() => setShowModal(false)}
          mutations={{
            createDonation, creatingDonation,
            createChanda, creatingChanda,
            createCosting, creatingCosting,
            createProjectFund, creatingPF,
          }}
        />
      )}
    </div>
  );
}

// ─── Reusable Add Modal ──────────────────────────
function AddModal({
  tab,
  onClose,
  mutations,
}: {
  tab: string;
  onClose: () => void;
  mutations: {
    createDonation: DonationMutation; creatingDonation: boolean;
    createChanda: MonthlyChandaMutation; creatingChanda: boolean;
    createCosting: CostingMutation; creatingCosting: boolean;
    createProjectFund: ProjectFundMutation; creatingPF: boolean;
  };
}) {
  const [donorName, setDonorName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BKASH");
  const [purpose, setPurpose] = useState("GENERAL");
  const [message, setMessage] = useState("");

  const [chandaName, setChandaName] = useState("");
  const [chandaPhone, setChandaPhone] = useState("");
  const [chandaMonth, setChandaMonth] = useState(monthOptions[new Date().getMonth()]);
  const [chandaYear, setChandaYear] = useState(new Date().getFullYear().toString());
  const [chandaAmount, setChandaAmount] = useState("");
  const [chandaStatus, setChandaStatus] = useState("PENDING");
  const [chandaNote, setChandaNote] = useState("");

  const [costingName, setCostingName] = useState("");
  const [costingDesc, setCostingDesc] = useState("");
  const [costingAmount, setCostingAmount] = useState("");

  const [pfTitle, setPfTitle] = useState("");
  const [pfDesc, setPfDesc] = useState("");
  const [pfAmount, setPfAmount] = useState("");
  const [pfCategory, setPfCategory] = useState("");
  const [pfStatus, setPfStatus] = useState("PLANNING");

  const isSaving = mutations.creatingDonation || mutations.creatingChanda || mutations.creatingCosting || mutations.creatingPF;

  const handleSave = async () => {
    try {
      if (tab === "fund") {
        if (!donorName.trim() || !amount || !transactionId.trim()) { toast.error("নাম, পরিমাণ ও ট্রানজেকশন আইডি প্রয়োজন।"); return; }
        await mutations.createDonation({ donorName, phone, email: email || undefined, amount: Number(amount), paymentMethod, transactionId, purpose, message: message || undefined }).unwrap();
        toast.success("ফান্ড যোগ হয়েছে।");
      } else if (tab === "monthly") {
        if (!chandaName.trim() || !chandaAmount) { toast.error("নাম ও পরিমাণ প্রয়োজন।"); return; }
        await mutations.createChanda({ name: chandaName, phone: chandaPhone || undefined, month: chandaMonth, year: Number(chandaYear), amount: Number(chandaAmount), status: chandaStatus, note: chandaNote || undefined }).unwrap();
        toast.success("চাঁদা যোগ হয়েছে।");
      } else if (tab === "costing") {
        if (!costingName.trim() || !costingAmount) { toast.error("খাত ও পরিমাণ প্রয়োজন।"); return; }
        await mutations.createCosting({ projectName: costingName, description: costingDesc || undefined, costing: Number(costingAmount) }).unwrap();
        toast.success("খরচ যোগ হয়েছে।");
      } else if (tab === "donation") {
        if (!pfTitle.trim() || !pfAmount || !pfCategory.trim()) { toast.error("প্রকল্প, পরিমাণ ও ক্যাটাগরি প্রয়োজন।"); return; }
        await mutations.createProjectFund({ title: pfTitle, description: pfDesc || undefined, amount: Number(pfAmount), raised: 0, category: pfCategory, status: pfStatus }).unwrap();
        toast.success("প্রকল্প যোগ হয়েছে।");
      }
      onClose();
    } catch {
      toast.error("সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1c21] border border-gray-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-3">
          <h3 className="text-lg font-bold text-white">
            {tab === "fund" && "ফান্ড যোগ করুন"}
            {tab === "monthly" && "মাসিক চাঁদা যোগ করুন"}
            {tab === "costing" && "খরচ যোগ করুন"}
            {tab === "donation" && "প্রকল্প যোগ করুন"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>

        {/* Fund Form */}
        {tab === "fund" && (
          <div className="space-y-3">
            <Input label="দাতার নাম *" value={donorName} onChange={setDonorName} placeholder="নাম লিখুন" />
            <Input label="ফোন" value={phone} onChange={setPhone} placeholder="01XXXXXXXXX" />
            <Input label="ইমেইল" value={email} onChange={setEmail} placeholder="email@example.com" />
            <Input label="পরিমাণ *" value={amount} onChange={setAmount} placeholder="০" type="number" />
            <Input label="ট্রানজেকশন আইডি *" value={transactionId} onChange={setTransactionId} placeholder="TXN..." />
            <Select label="পেমেন্ট পদ্ধতি" value={paymentMethod} onChange={setPaymentMethod} options={paymentMethods.map(m => ({ value: m, label: paymentMethodBn[m] ?? m }))} />
            <Select label="উদ্দেশ্য" value={purpose} onChange={setPurpose} options={purposeOptions.map(p => ({ value: p, label: purposeBn[p] ?? p }))} />
            <Input label="বার্তা" value={message} onChange={setMessage} placeholder="ঐচ্ছিক" />
          </div>
        )}

        {/* Monthly Form */}
        {tab === "monthly" && (
          <div className="space-y-3">
            <Input label="নাম *" value={chandaName} onChange={setChandaName} placeholder="সদস্যের নাম" />
            <Input label="ফোন" value={chandaPhone} onChange={setChandaPhone} placeholder="01XXXXXXXXX" />
            <div className="grid grid-cols-2 gap-3">
              <Select label="মাস" value={chandaMonth} onChange={setChandaMonth} options={monthOptions.map(m => ({ value: m, label: m }))} />
              <Input label="বছর" value={chandaYear} onChange={setChandaYear} type="number" />
            </div>
            <Input label="পরিমাণ *" value={chandaAmount} onChange={setChandaAmount} placeholder="০" type="number" />
            <Select label="স্ট্যাটাস" value={chandaStatus} onChange={setChandaStatus} options={[{ value: "PAID", label: "Paid" }, { value: "PENDING", label: "Pending" }, { value: "OVERDUE", label: "Overdue" }]} />
            <Input label="নোট" value={chandaNote} onChange={setChandaNote} placeholder="ঐচ্ছিক" />
          </div>
        )}

        {/* Costing Form */}
        {tab === "costing" && (
          <div className="space-y-3">
            <Input label="খাতের নাম *" value={costingName} onChange={setCostingName} placeholder="যেমন: অফিস ভাড়া" />
            <Input label="বিবরণ" value={costingDesc} onChange={setCostingDesc} placeholder="ঐচ্ছিক" />
            <Input label="পরিমাণ *" value={costingAmount} onChange={setCostingAmount} placeholder="০" type="number" />
          </div>
        )}

        {/* Project Fund Form */}
        {tab === "donation" && (
          <div className="space-y-3">
            <Input label="প্রকল্পের নাম *" value={pfTitle} onChange={setPfTitle} placeholder="যেমন: রক্তদান কর্মসূচি" />
            <Input label="বিবরণ" value={pfDesc} onChange={setPfDesc} placeholder="ঐচ্ছিক" />
            <Input label="লক্ষ্যমাত্রা পরিমাণ *" value={pfAmount} onChange={setPfAmount} placeholder="০" type="number" />
            <Input label="ক্যাটাগরি *" value={pfCategory} onChange={setPfCategory} placeholder="যেমন: রক্তদান" />
            <Select label="স্ট্যাটাস" value={pfStatus} onChange={setPfStatus} options={projectStatuses.map(s => ({ value: s, label: projectStatusBn[s] ?? s }))} />
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 bg-gray-700 py-2.5 rounded-xl font-bold text-white hover:bg-gray-600 transition-colors">
            বাতিল
          </button>
          <button onClick={handleSave} disabled={isSaving} className="flex-1 bg-emerald-600 py-2.5 rounded-xl font-bold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50">
            {isSaving ? "সেভ হচ্ছে..." : "সেভ করুন"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Reusable Input ──────────────────────────────
function Input({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0b0e14] border border-gray-700 rounded-xl p-3 text-white text-sm"
      />
    </div>
  );
}

// ─── Reusable Select ─────────────────────────────
function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0b0e14] border border-gray-700 rounded-xl p-3 text-white text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
