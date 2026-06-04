import DonatePageView from "@/features/components/donatePageViews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "অনুদান করুন | মোল্লাপাড়া সমাজ কল্যাণ সংস্থা",
  description:
    "বিকাশ, নগদ, রকেট বা ক্রেডিট কার্ডের মাধ্যমে অনুদান দিন। আপনার ছোট সহায়তা বড় পরিবর্তন আনে।",
};

export default function DonatePage() {
  return (
    <>
      <main>
        <DonatePageView />
      </main>
    </>
  );
}
