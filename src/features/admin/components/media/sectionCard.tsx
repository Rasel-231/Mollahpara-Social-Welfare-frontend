import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  onSeeAll: () => void;
}

export const SectionCard = ({ title, icon: Icon, children, onSeeAll }: SectionCardProps) => (
  <div className="group bg-[#161a22]/50 border border-white/[0.05] backdrop-blur-xl rounded-3xl p-7 transition-all duration-300 hover:border-emerald-500/30">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-400">
          <Icon size={20} />
        </div>
        <h2 className="text-white font-bold tracking-tight">{title}</h2>
      </div>
      <button onClick={onSeeAll} className="text-xs uppercase font-bold text-gray-500 hover:text-emerald-400 flex items-center gap-1 transition-colors">
        Manage All
      </button>
    </div>
    {children}
  </div>
);