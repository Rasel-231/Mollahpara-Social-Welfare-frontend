import type { Metadata } from "next";
import AboutPageView from "@/features/components/aboutPageViews";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | মোল্লাপাড়া সমাজ কল্যাণ সংস্থা",
  description:
    "মোল্লাপাড়া সমাজ কল্যাণ সংস্থার লক্ষ্য, দৃষ্টিভঙ্গি, ইতিহাস এবং কার্যক্রম সম্পর্কে জানুন।",
};

export default function AboutPage() {
  return (
    <>
      <AboutPageView />
    </>
  );
}
