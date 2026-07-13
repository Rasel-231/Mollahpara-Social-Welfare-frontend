"use client";
import { useGetAllBloodRequestsQuery } from "@/Redux/api/bloodRequestApi";
import { useGetAllFundsQuery } from "@/Redux/api/fundsApi";
import { useGetAllUsersQuery } from "@/Redux/api/userApi";
import { useGetAllCostingsQuery } from "@/Redux/api/costingApi";
import { useGetAllMonthlyChandasQuery } from "@/Redux/api/monthlyChandaApi";
import { useGetAllProjectFundsQuery } from "@/Redux/api/projectFundApi";
import { HandCoins, Users, Droplet, TrendingDown, Wallet, Gift } from "lucide-react";

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
  const { data: fundsResponse, isLoading: fundsLoading } = useGetAllFundsQuery();
  const { data: bloodDonorResponse, isLoading: bloodDonorLoading } = useGetAllBloodRequestsQuery();
  const { data: usersResponse, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: costingResponse, isLoading: costingLoading } = useGetAllCostingsQuery();
  const { data: chandaResponse, isLoading: chandaLoading } = useGetAllMonthlyChandasQuery();
  const { data: projectFundResponse, isLoading: pfLoading } = useGetAllProjectFundsQuery();

  if (fundsLoading || bloodDonorLoading || usersLoading || costingLoading || chandaLoading || pfLoading) {
    return <div>Loading...</div>;
  }

  const bloodDonors = bloodDonorResponse?.data ?? [];
  const totalBloodDonors = bloodDonors.length;

  const funds = fundsResponse?.data ?? [];
  const costings = costingResponse?.data ?? [];
  const chandas = chandaResponse?.data ?? [];
  const projectFunds = projectFundResponse?.data ?? [];

  const totalVerifiedFunds = funds
    .filter((f) => f.status === "VERIFIED")
    .reduce((total, fund) => total + Number(fund.amount), 0);

  const totalPaidChanda = chandas
    .filter((c) => c.status === "PAID")
    .reduce((total, c) => total + Number(c.amount), 0);

  const totalCostings = costings.reduce(
    (total, c) => total + Number(c.costing),
    0,
  );

  const totalProjectRaised = projectFunds.reduce(
    (total, p) => total + Number(p.raised),
    0,
  );

  const totalFundIn = totalVerifiedFunds + totalPaidChanda;
  const totalFundOut = totalCostings + totalProjectRaised;
  const availableBalance = totalFundIn - totalFundOut;

  const users = usersResponse?.data ?? [];
  const totalActiveUsers = users.length;

  const stats = [
    {
      label: "মোট তহবিল ব্যালেন্স",
      value: toBanglaAmount(availableBalance),
      icon: HandCoins,
      color: availableBalance >= 0 ? "text-emerald-500" : "text-red-500",
      dot: availableBalance >= 0 ? "bg-emerald-500" : "bg-red-500",
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
      label: "মোট আয়",
      value: toBanglaAmount(totalFundIn),
      icon: Wallet,
      color: "text-blue-500",
      dot: "bg-blue-500",
    },
    {
      label: "মোট ব্যয়",
      value: toBanglaAmount(totalFundOut),
      icon: TrendingDown,
      color: "text-red-500",
      dot: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-[#1a1c21] border border-gray-800 p-6 rounded-2xl flex items-center justify-between shadow-lg transition-all duration-300 hover:border-gray-600 hover:scale-[1.01]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${availableBalance >= 0 ? "bg-emerald-500" : "bg-red-500"}`}></div>
            <span className="text-gray-400 text-sm font-medium">মোট তহবিল ব্যালেন্স</span>
          </div>
          <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${availableBalance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            ৳{toBanglaAmount(availableBalance)}
          </h3>
          <div className="flex gap-4 mt-1 text-xs text-gray-500">
            <span>আয়: ৳{toBanglaAmount(totalFundIn)}</span>
            <span>ব্যয়: ৳{toBanglaAmount(totalFundOut)}</span>
          </div>
        </div>
        <HandCoins size={40} className={`${availableBalance >= 0 ? "text-emerald-500" : "text-red-500"} opacity-80`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.slice(1).map((stat, index) => (
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
    </div>
  );
}
