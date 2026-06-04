import { 
  HandCoins, 
  Users, 
  Droplet, 
  ReceiptText 
} from "lucide-react";

const stats = [
  { label: "মোট অনুদান সংগ্রহ", value: "৮৪,৬,৭৬০.৮৯", icon: HandCoins, color: "text-orange-500", dot: "bg-orange-500" },
  { label: "সক্রিয় সদস্য", value: "২০০+", icon: Users, color: "text-green-500", dot: "bg-green-500" },
  { label: "রক্তদাতা রেজিস্টার্ড", value: "৫০০+", icon: Droplet, color: "text-red-500", dot: "bg-blue-500" },
  { label: "চলতি মাসের খরচ", value: "৮৩৫,১২৮.০০", icon: ReceiptText, color: "text-teal-500", dot: "bg-teal-500" },
];

export default function StateSection() {
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
              <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">{stat.value}</h3>
          </div>
          <stat.icon size={36} className={`${stat.color} opacity-80`} />
        </div>
      ))}
    </div>
  );
}