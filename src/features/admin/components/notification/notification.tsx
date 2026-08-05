"use client";

import OrangeSpinner from "@/components/shared/OrangeSpinner";
import {
  Bell,
  Users,
  HeartHandshake,
  Droplets,
  GraduationCap,
  Mail,
} from "lucide-react";
import MembershipRequest from "../membarTable/membarshipRequest";
import DonationRequest from "../transection/transection";
import BloodRequestCard from "./BloodRequestCard";
import ScholarshipRequestCard from "./ScholarshipRequestCard";
import { useGetAllFundsQuery } from "@/Redux/api/fundsApi";
import { useGetAllUsersQuery } from "@/Redux/api/userApi";
import { useGetAllBloodRequestsQuery } from "@/Redux/api/bloodRequestApi";
import { useGetAllScholarshipsQuery } from "@/Redux/api/scholarshipApi";

import { IBloodRequests } from "@/Redux/types/types";
import { IContact, useGetAllContactsQuery } from "@/Redux/api/contactApi";

const paymentMethodLabel: Record<string, string> = {
  BKASH: "bKash",
  NAGAD: "Nagad",
  ROCKET: "Rocket",
  CREDIT_CARD: "Credit Card",
  BANK_TRANSFER: "Bank Transfer",
};

export default function NotificationsPage() {
  const { data: usersResponse, isLoading: usersLoading } = useGetAllUsersQuery(
    {},
  );
  const { data: fundsResponse, isLoading: fundsLoading } =
    useGetAllFundsQuery("");
  const { data: bloodRequestResponse, isLoading: bloodLoading } =
    useGetAllBloodRequestsQuery("");
  const { data: scholarshipResponse, isLoading: scholarshipLoading } =
    useGetAllScholarshipsQuery("");
  const { data: contactResponse, isLoading: contactLoading } =
    useGetAllContactsQuery("");

  const pendingUsers = (usersResponse?.data ?? [])
    .filter((u) => !u.isActive)
    .map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone ?? "",
      village: u.village,
      image: u.image ?? "",
      designation: u.designation ?? "",
      bloodGroup: u.bloodGroup ?? "",
      role: u.role,
      memberType: u.memberType ?? "",
      isActive: u.isActive,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      nid: u.nid ?? "",
      donorId: u.donorId ?? "",
    }));

  const pendingDonations = (fundsResponse?.data ?? [])
    .filter((d) => d.status === "PENDING")
    .map((d) => ({
      id: d.id,
      senderName: d.donorName,
      amount: d.amount,
      method: paymentMethodLabel[d.paymentMethod] ?? d.paymentMethod,
      txId: d.transactionId,
      date: new Date(d.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

  const bloodRequests = (bloodRequestResponse?.data ?? []).map(
    (item: IBloodRequests) => ({
      id: item.id,
      patientName: item.patientName,
      bloodGroup: item.bloodGroup,
      hospital: item.hospitalName,
      phone: item.contactPhone,
      date: new Date(item.requiredDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      units: item.unitsRequired,
      urgency: item.urgency,
      status: item.status,
    }),
  );

  const contactRequests = (contactResponse?.data ?? []).map((c: IContact) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone ?? "",
    subject: c.subject ?? "",
    message: c.message ?? "",
    date: new Date(c.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <div className="min-h-screen bg-[#0b0e14] p-4 md:p-8 text-white">
      <div className="flex items-center gap-3 mb-8 border-b border-white/[0.05] pb-4">
        <Bell className="text-emerald-400" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold">নোটিফিকেশন সেন্টার</h1>
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-blue-400" size={20} />
            <h2 className="text-lg font-bold text-gray-300">
              নতুন মেম্বারশিপ অনুরোধ ({pendingUsers.length})
            </h2>
          </div>
          {usersLoading ? (
            <div className="flex justify-center p-4">
              <OrangeSpinner size={24} />
            </div>
          ) : pendingUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingUsers.map((user) => (
                <MembershipRequest key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-[#161a22]/30 p-4 rounded-xl border border-white/[0.02]">
              কোনো অনুরোধ নেই।
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <HeartHandshake className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-gray-300">
              নতুন অনুদান অনুরোধ ({pendingDonations.length})
            </h2>
          </div>
          {fundsLoading ? (
            <div className="flex justify-center p-4">
              <OrangeSpinner size={24} />
            </div>
          ) : pendingDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingDonations.map((donation) => (
                <DonationRequest key={donation.id} donation={donation} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-[#161a22]/30 p-4 rounded-xl border border-white/[0.02]">
              কোনো অনুরোধ নেই।
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="text-red-500" size={20} />
            <h2 className="text-lg font-bold text-gray-300">
              রক্তের জরুরি অনুরোধ ({bloodRequests.length})
            </h2>
          </div>
          {bloodLoading ? (
            <div className="flex justify-center p-4">
              <OrangeSpinner size={24} />
            </div>
          ) : bloodRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bloodRequests.map((br) => (
                <BloodRequestCard key={br.id} request={br} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-[#161a22]/30 p-4 rounded-xl border border-white/[0.02]">
              কোনো জরুরি রক্তের অনুরোধ নেই।
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-gray-300">
              স্কলারশিপ অনুরোধ ({(scholarshipResponse?.data ?? []).length})
            </h2>
          </div>
          {scholarshipLoading ? (
            <div className="flex justify-center p-4">
              <OrangeSpinner size={24} />
            </div>
          ) : (scholarshipResponse?.data ?? []).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(scholarshipResponse?.data ?? []).map((s) => (
                <ScholarshipRequestCard key={s.id} scholarship={s} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-[#161a22]/30 p-4 rounded-xl border border-white/[0.02]">
              কোনো স্কলারশিপ অনুরোধ নেই।
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-blue-400" size={20} />
            <h2 className="text-lg font-bold text-gray-300">
              যোগাযোগ অনুরোধ ({contactRequests.length})
            </h2>
          </div>
          {contactLoading ? (
            <div className="flex justify-center p-4">
              <OrangeSpinner size={24} />
            </div>
          ) : contactRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactRequests.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-[#161a22] p-4 rounded-xl border border-white/[0.05] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-white">
                      {contact.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {contact.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{contact.email}</p>
                  {contact.phone && (
                    <p className="text-xs text-gray-400">{contact.phone}</p>
                  )}
                  {contact.subject && (
                    <p className="text-sm text-gray-300 font-medium">
                      {contact.subject}
                    </p>
                  )}
                  {contact.message && (
                    <p className="text-xs text-gray-500 line-clamp-3">
                      {contact.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-[#161a22]/30 p-4 rounded-xl border border-white/[0.02]">
              কোনো যোগাযোগ অনুরোধ নেই।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
