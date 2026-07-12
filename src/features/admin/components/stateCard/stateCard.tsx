"use client";
import { useGetAllBloodRequestsQuery } from "@/Redux/api/bloodRequestApi";
import { useGetAllFundsQuery } from "@/Redux/api/fundsApi";
import { useGetAllUsersQuery } from "@/Redux/api/userApi";
import { HandCoins, Users, Droplet, ReceiptText } from "lucide-react";

const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBanglaDigits(text: string) {
  return text.replace(/[0-9]/g, (digit) => banglaDigits[Number(digit)]);
}

function toBanglaAmount(value: number) {
  const formatted = value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return toBanglaDigits(formatted);
}

function toBanglaCount(value: number) {
  const formatted = Math.trunc(value).toLocaleString("en-IN");
  return toBanglaDigits(formatted);
}

export default function StateSection() {
  const { data: fundsResponse, isLoading: fundsLoading } =
    useGetAllFundsQuery();
  const { data: bloodDonorResponse, isLoading: bloodDonorLoading } =
    useGetAllBloodRequestsQuery();
  const { data: usersResponse, isLoading: usersLoading } =
    useGetAllUsersQuery();

  if (fundsLoading || bloodDonorLoading || usersLoading) {
    return <div>Loading...</div>;
  }

  const bloodDonors = bloodDonorResponse?.data ?? [];
  const totalBloodDonors = bloodDonors.length;

  const funds = fundsResponse?.data ?? [];
  const totalFunds = funds.reduce(
    (total, fund) => total + Number(fund.amount),
    0,
  );

  const now = new Date();
  const currentMonthExpense = funds
    .filter((fund) => {
      const fundDate = new Date(fund.createdAt);
      return (
        fund.type === "expense" &&
        fundDate.getMonth() === now.getMonth() &&
        fundDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((total, fund) => total + Number(fund.amount), 0);

  const users = usersResponse?.data ?? [];
  const totalActiveUsers = users.length;

  const stats = [
    {
      label: "মোট অনুদান সংগ্রহ",
      value: toBanglaAmount(totalFunds),
      icon: HandCoins,
      color: "text-orange-500",
      dot: "bg-orange-500",
    },
    {
      label: "সক্রিয় সদস্য",
      value: `${toBanglaCount(totalActiveUsers)}+`,
      icon: Users,
      color: "text-green-500",
      dot: "bg-green-500",
    },
    {
      label: "রক্তদাতা রেজিস্টার্ড",
      value: `${toBanglaCount(totalBloodDonors)}+`,
      icon: Droplet,
      color: "text-red-500",
      dot: "bg-blue-500",
    },
    {
      label: "চলতি মাসের খরচ",
      value: toBanglaAmount(currentMonthExpense),
      icon: ReceiptText,
      color: "text-teal-500",
      dot: "bg-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#1a1c21] border border-gray-800 p-6 rounded-2xl flex items-center justify-between shadow-lg transition-all duration-300 hover:border-gray-600 hover:scale-[1.02]"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${stat.dot}`}></div>
              <span className="text-gray-400 text-sm font-medium">
                {stat.label}
              </span>
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">
              {stat.value}
            </h3>
          </div>
          <stat.icon size={36} className={`${stat.color} opacity-80`} />
        </div>
      ))}
    </div>
  );
}
