"use client";

import { useState } from "react";
import OrangeSpinner from "@/components/shared/OrangeSpinner";
import {
  Mail,
  XCircle,
  Info,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { useDeleteContactMutation } from "@/Redux/api/contactApi";
import { toast } from "react-toastify";

interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

interface ContactRequestCardProps {
  contact: ContactData;
}

export default function ContactRequestCard({
  contact,
}: ContactRequestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const handleAction = async () => {
    try {
      await deleteContact(contact.id).unwrap();
      toast.success("যোগাযোগ অনুরোধটি মুছে ফেলা হয়েছে।", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setIsModalOpen(false);
    } catch {
      toast.error("মুছতে সমস্যা হয়েছে।", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="bg-[#1a1c21] border border-gray-700 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-blue-500/50 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
            <Mail className="text-blue-400" />
          </div>
          <div>
            <h4 className="text-white font-bold">{contact.name}</h4>
            <p className="text-gray-400 text-xs">
              {contact.subject || contact.email}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white transition-all"
            title="বিস্তারিত দেখুন"
          >
            <Info size={18} />
          </button>

          <button
            onClick={handleAction}
            className="bg-red-900/50 hover:bg-red-900 p-2 rounded-lg text-red-400 transition-all"
            title="মুছে ফেলুন"
          >
            <XCircle size={18} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c21] border border-blue-500/50 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">যোগাযোগের তথ্য</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <div className="flex justify-between">
                <span>নাম:</span>
                <span className="text-white font-semibold">{contact.name}</span>
              </div>
              <div className="flex justify-between">
                <span>ইমেইল:</span>
                <span className="text-white font-semibold">
                  {contact.email || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ফোন:</span>
                <span className="text-white font-semibold">
                  {contact.phone || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>তারিখ:</span>
                <span className="text-white font-semibold">{contact.date}</span>
              </div>
              {contact.subject && (
                <div className="flex justify-between">
                  <span>বিষয়:</span>
                  <span className="text-white font-semibold">
                    {contact.subject}
                  </span>
                </div>
              )}
              {contact.message && (
                <div className="bg-[#0b0e14] p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">বার্তা:</p>
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAction}
                disabled={isLoading}
                className="flex-1 bg-emerald-600 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <OrangeSpinner size={16} />
                ) : (
                  <CheckCircle2 size={18} />
                )}{" "}
                Accept
              </button>
              <button
                onClick={handleAction}
                disabled={isLoading}
                className="flex-1 bg-red-600/70 py-2 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <OrangeSpinner size={16} />
                ) : (
                  <Trash2 size={18} />
                )}{" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
