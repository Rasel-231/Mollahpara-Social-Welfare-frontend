// "use client";

// import { useState } from "react";
// import { User, XCircle, Info, ShieldCheck } from "lucide-react";

// interface MembershipRequestUser {
//   name: string;
//   phone: string;
//   blood: string;
//   address: string;
// }

// interface MembershipRequestProps {
//   user: MembershipRequestUser;
// }

// export default function MembershipRequest({ user }: MembershipRequestProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // ব্যাকএন্ড ফাংশন এখানে কল করবেন
//   const handleAction = (action: string) => {
//     console.log(`User ${user.name} action: ${action}`);
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       {/* কার্ড UI */}
//       <div className="bg-[#1a1c21] border border-gray-700 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-gray-500 transition-all">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
//             <User className="text-gray-300" />
//           </div>
//           <div>
//             <h4 className="text-white font-bold">{user.name}</h4>
//             <p className="text-gray-400 text-xs">রক্তের গ্রুপ: {user.blood}</p>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           {/* ভেরিফাই কার্ডের জন্য Info আইকন */}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white transition-all"
//             title="Verify Info"
//           >
//             <Info size={18} />
//           </button>

//           {/* রিজেক্ট করার জন্য XCircle আইকন */}
//           <button
//             onClick={() => handleAction("reject")}
//             className="bg-red-900/50 hover:bg-red-900 p-2 rounded-lg text-red-400 transition-all"
//             title="Reject"
//           >
//             <XCircle size={18} />
//           </button>
//         </div>
//       </div>

//       {/* ভেরিফাই পপআপ */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
//           <div className="bg-[#1a1c21] border border-gray-700 w-full max-w-sm rounded-2xl p-6 text-white shadow-2xl">
//             <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-2">
//               <ShieldCheck className="text-emerald-500" size={24} />
//               <h3 className="text-xl font-bold">সদস্যের তথ্য যাচাই</h3>
//             </div>

//             <div className="space-y-3 text-sm text-gray-300 mb-6">
//               <p>নাম: <span className="text-white font-semibold">{user.name}</span></p>
//               <p>ফোন: <span className="text-white">{user.phone}</span></p>
//               <p>রক্তের গ্রুপ: <span className="text-white">{user.blood}</span></p>
//               <p>ঠিকানা: <span className="text-white">{user.address}</span></p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => handleAction("accept")}
//                 className="flex-1 bg-emerald-600 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="flex-1 bg-gray-700 py-2 rounded-lg font-bold hover:bg-gray-600 transition-all"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import { useState } from "react";
import { User, XCircle, Info, ShieldCheck } from "lucide-react";
import { useUpdateUserMutation } from "@/Redux/api/userApi";
import { toast } from "react-toastify";
import { IUser } from "@/Redux/types/types";

interface MembershipRequestUser {
  id: string;
  name: string;
  phone: string;
  bloodGroup: string;
  village: string;
  isActive: boolean;
}

interface MembershipRequestProps {
  user: MembershipRequestUser;
}

export default function MembershipRequest({ user }: MembershipRequestProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateUser] = useUpdateUserMutation();

  // Accept → isActive: true, Cancel/Reject → isActive: false
  const handleAction = async (action: "accept" | "reject"): Promise<void> => {
    try {
      await updateUser({
        id: user.id,
        data: {
          isActive: action === "accept" ? true : false,
        } as Partial<IUser>,
      }).unwrap();
      toast.success(
        action === "accept"
          ? "সদস্য গ্রহণ করা হয়েছে ✅"
          : "সদস্য বাতিল করা হয়েছে ❌",
      );
      setIsModalOpen(false);
    } catch {
      toast.error("কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন ⚠️");
    }
  };

  return (
    <>
      <div className="bg-[#1a1c21] border border-gray-700 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-gray-500 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="text-gray-300" />
          </div>
          <div>
            <h4 className="text-white font-bold">{user.name}</h4>
            <p className="text-gray-400 text-xs">
              রক্তের গ্রুপ: {user.bloodGroup}
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
            onClick={() => handleAction("reject")}
            className="bg-red-900/50 hover:bg-red-900 p-2 rounded-lg text-red-400 transition-all"
            title="বাতিল করুন"
          >
            <XCircle size={18} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1c21] border border-gray-700 w-full max-w-sm rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-2">
              <ShieldCheck className="text-emerald-500" size={24} />
              <h3 className="text-xl font-bold">সদস্যের তথ্য যাচাই</h3>
            </div>

            {/* সমস্ত তথ্য দেখানো হচ্ছে – কমেন্টেড কোডের মতো */}
            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <p>
                নাম:{" "}
                <span className="text-white font-semibold">{user.name}</span>
              </p>
              <p>
                ফোন: <span className="text-white">{user.phone}</span>
              </p>
              <p>
                রক্তের গ্রুপ:{" "}
                <span className="text-white">{user.bloodGroup}</span>
              </p>
              <p>
                ঠিকানা: <span className="text-white">{user.village}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAction("accept")}
                className="flex-1 bg-emerald-600 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction("reject")}
                className="flex-1 bg-red-600/70 py-2 rounded-lg font-bold hover:bg-red-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
