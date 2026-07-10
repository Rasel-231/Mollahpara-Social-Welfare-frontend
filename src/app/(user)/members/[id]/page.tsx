"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useGetAllUsersQuery } from "@/Redux/api/userApi";
import { IUser, Role, BloodGroup } from "@/Redux/types/types";

const roleBnMap: Record<Role, string> = {
  [Role.ADMIN]: "এডমিন",
  [Role.MODERATOR]: "মডারেটর",
  [Role.MEMBER]: "সদস্য",
  [Role.USER]: "ব্যবহারকারী",
};

const bloodGroupMap: Record<BloodGroup, string> = {
  [BloodGroup.A_POSITIVE]: "A+",
  [BloodGroup.A_NEGATIVE]: "A-",
  [BloodGroup.B_POSITIVE]: "B+",
  [BloodGroup.B_NEGATIVE]: "B-",
  [BloodGroup.AB_POSITIVE]: "AB+",
  [BloodGroup.AB_NEGATIVE]: "AB-",
  [BloodGroup.O_POSITIVE]: "O+",
  [BloodGroup.O_NEGATIVE]: "O-",
};

function formatDate(value?: string | Date | null): string {
  if (!value) return "উল্লেখ নেই";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "উল্লেখ নেই";
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-welfare-green-100 last:border-0">
      <span className="text-lg mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-welfare-green-500 font-bengali mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-welfare-green-900 font-bengali break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function MemberDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: response, isLoading, isError } = useGetAllUsersQuery();
  const users: IUser[] = response?.data || [];
  const user = users.find((u) => u.id === id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-welfare-green-200 border-t-welfare-green-600 rounded-full animate-spin" />
          <p className="text-welfare-green-600 font-bengali text-sm">
            তথ্য লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-lg font-bold text-welfare-green-800 font-bengali mb-2">
            সদস্য খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-sm text-welfare-green-500 font-bengali mb-6">
            এই আইডির কোনো সদস্যের তথ্য পাওয়া যায়নি।
          </p>
          <button
            onClick={() => router.push("/members")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold font-bengali text-white shadow-md"
            style={{
              background: "linear-gradient(135deg, #166534, #15803d)",
            }}
          >
            সদস্য তালিকায় ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const displayBloodGroup = user.bloodGroup
    ? bloodGroupMap[user.bloodGroup]
    : "উল্লেখ নেই";

  return (
    <div className="min-h-screen pb-16">
      {/* Cover */}
      <div
        className="relative h-40 lg:h-52 w-full"
        style={{
          background:
            "linear-gradient(135deg, #166534 0%, #15803d 45%, #ca8a04 100%)",
        }}
      >
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 lg:top-6 lg:left-6 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="ফিরে যান"
        >
          ←
        </button>
      </div>

      <div className="container mx-auto px-4 lg:px-6 -mt-16 lg:-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Profile header card */}
          <div className="relative mb-5">
            {/* Avatar sits OUTSIDE the overflow-hidden card, as a sibling,
                so its top half (which overlaps the green cover above) never gets clipped */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-14 lg:-top-16 z-10">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl bg-welfare-green-100">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        user.image || "/default-avatar.png"
                      })`,
                    }}
                  />
                </div>
                {user.isActive && (
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-welfare-green-500 border-2 border-white shadow-sm" />
                )}
              </div>
            </div>

            <div
              className="rounded-2xl shadow-lg overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(240,253,244,0.95) 100%)",
                border: "1px solid rgba(22, 101, 52, 0.15)",
              }}
            >
              <div className="pt-16 lg:pt-20 pb-6 lg:pb-8 px-6 flex flex-col items-center text-center">
                <h1 className="text-xl lg:text-2xl font-bold text-welfare-green-900 font-bengali mb-1">
                  {user.name}
                </h1>
                {user.nameEn && (
                  <p className="text-sm text-welfare-green-500 mb-3">
                    {user.nameEn}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
                  <span
                    className="px-4 py-1.5 rounded-full text-xs font-semibold font-bengali text-white"
                    style={{
                      background: "linear-gradient(135deg, #166534, #15803d)",
                    }}
                  >
                    {roleBnMap[user.role]}
                  </span>
                  {user.designation && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold font-bengali text-welfare-green-700 bg-welfare-green-100">
                      {user.designation}
                    </span>
                  )}
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold font-bengali ${
                      user.isActive
                        ? "text-welfare-green-700 bg-welfare-green-100"
                        : "text-slate-500 bg-slate-100"
                    }`}
                  >
                    {user.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Contact info */}
            <div
              className="rounded-2xl p-5 lg:p-6 shadow-md"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(22, 101, 52, 0.12)",
              }}
            >
              <h2 className="text-sm font-bold text-welfare-green-800 font-bengali mb-1 flex items-center gap-2">
                <span>📇</span> যোগাযোগের তথ্য
              </h2>
              <InfoRow icon="✉️" label="ইমেইল" value={user.email} />
              <InfoRow
                icon="📞"
                label="ফোন নম্বর"
                value={user.phone || "উল্লেখ নেই"}
              />

              <InfoRow
                icon="🏠"
                label="ঠিকানা"
                value={user.village || "উল্লেখ নেই"}
              />
            </div>

            {/* Personal info */}
            <div
              className="rounded-2xl p-5 lg:p-6 shadow-md"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(22, 101, 52, 0.12)",
              }}
            >
              <h2 className="text-sm font-bold text-welfare-green-800 font-bengali mb-1 flex items-center gap-2">
                <span>🪪</span> ব্যক্তিগত তথ্য
              </h2>
              <InfoRow
                icon="🩸"
                label="রক্তের গ্রুপ"
                value={displayBloodGroup}
              />

              <InfoRow
                icon="💼"
                label="পেশা"
                value={user.designation || "উল্লেখ নেই"}
              />
              <InfoRow
                icon="🆔"
                label="এনআইডি"
                value={user.nid || "উল্লেখ নেই"}
              />
            </div>

            {/* Membership info */}
            <div
              className="rounded-2xl p-5 lg:p-6 shadow-md md:col-span-2"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(22, 101, 52, 0.12)",
              }}
            >
              <h2 className="text-sm font-bold text-welfare-green-800 font-bengali mb-1 flex items-center gap-2">
                <span>📋</span> সদস্যপদের তথ্য
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <InfoRow
                  icon="🏷️"
                  label="সদস্য ধরন"
                  value={user.memberType || "উল্লেখ নেই"}
                />
                <InfoRow
                  icon="📅"
                  label="যোগদানের তারিখ"
                  value={formatDate(user.createdAt)}
                />
                <InfoRow
                  icon="🔄"
                  label="সর্বশেষ হালনাগাদ"
                  value={formatDate(user.updatedAt)}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
