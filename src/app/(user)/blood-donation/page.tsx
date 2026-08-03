
import BloodDonationPageView from "@/features/components/bloodDonationPageViews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "রক্তদান কর্মসূচি | কমিউনিটি সোশ্যাল ক্লাব",
  description:
    "রক্তের অনুরোধ করুন, রক্তদাতা হিসেবে নিবন্ধন করুন এবং স্বেচ্ছাসেবী রক্তদাতাদের তালিকা দেখুন।",
};

export default function BloodDonationPage() {
  return (
    <>
        <BloodDonationPageView />
    </>
  );
}
