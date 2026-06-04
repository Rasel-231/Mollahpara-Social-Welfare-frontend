"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Member } from "../types/types";


const mockMembers: Member[] = [
  {
    id: "1",
    nameBn: "এনবি. সভাপতি সংস্থা",
    nameEn: "Organization President",
    role: "President",
    roleBn: "সভাপতি সংস্থা",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    bloodGroup: "B+",
    joinedAt: "2020-01-01",
    badgeType: "gold",
    memberType: "president",
    isActive: true,
  },
  {
    id: "2",
    nameBn: "মোহন. সরপতি বেন্তিনী",
    nameEn: "Vice President",
    role: "Secretary",
    roleBn: "সরপতি বেন্তিনী",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    bloodGroup: "A+",
    joinedAt: "2020-02-01",
    badgeType: "gold",
    memberType: "secretary",
    isActive: true,
  },
  {
    id: "3",
    nameBn: "নাম. মন্ত্রণদি বেন্তিনী",
    nameEn: "Treasurer",
    role: "Treasurer",
    roleBn: "মন্ত্রণদি বেন্তিনী",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    bloodGroup: "O+",
    joinedAt: "2020-03-01",
    badgeType: "silver",
    memberType: "treasurer",
    isActive: true,
  },
];

const badgeColors: Record<string, string> = {
  gold: "from-yellow-400 to-amber-500",
  silver: "from-slate-300 to-slate-400",
  bronze: "from-amber-600 to-amber-700",
};

function MemberCard({ member, delay }: { member: Member; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.9) 100%)",
        border: "1px solid rgba(22, 101, 52, 0.15)",
      }}
    >
      {/* Gold header bar */}
      <div
        className={`h-1.5 bg-gradient-to-r ${badgeColors[member.badgeType]}`}
      />

      <div className="p-5 flex flex-col items-center text-center">
        {/* Avatar with badge */}
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-welfare-gold-200 shadow-lg">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${member.avatar})` }}
            />
          </div>
          {/* Badge icon */}
          <div
            className={`absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br ${badgeColors[member.badgeType]} flex items-center justify-center shadow-md`}
          >
            <span className="text-white text-xs">🏅</span>
          </div>
          {/* Active indicator */}
          {member.isActive && (
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-welfare-green-500 border-2 border-white shadow-sm" />
          )}
        </div>

        {/* Name */}
        <h3 className="font-bold text-welfare-green-800 text-sm font-bengali leading-5 mb-1">
          {member.nameBn}
        </h3>

        {/* Role badge */}
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold font-bengali text-white"
          style={{
            background: "linear-gradient(135deg, #166534, #15803d)",
          }}
        >
          {member.roleBn}
        </span>

        {/* Blood group */}
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span className="text-red-500">🩸</span>
          <span className="text-welfare-green-600 font-medium">{member.bloodGroup}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MembersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="section-title">সদস্য তালিকা</h2>
          <Link
            href="/members"
            className="text-welfare-green-600 hover:text-welfare-green-800 font-medium text-sm font-bengali"
          >
            See all
          </Link>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {mockMembers.map((member, i) => (
            <Link key={member.id} href={`/members/${member.id}`}>
              <MemberCard member={member} delay={i * 0.12} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}