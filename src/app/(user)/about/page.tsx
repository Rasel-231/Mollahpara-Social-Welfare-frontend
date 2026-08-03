import type { Metadata } from "next";
import AboutPageView from "@/features/components/aboutPageViews";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | কমিউনিটি সোশ্যাল ক্লাব",
  description:
    "কমিউনিটি সোশ্যাল ক্লাবের লক্ষ্য, দৃষ্টিভঙ্গি, ইতিহাস এবং কার্যক্রম সম্পর্কে জানুন।",
};

export default function AboutPage() {
  return (
    <>
      <AboutPageView />
    </>
  );
}
