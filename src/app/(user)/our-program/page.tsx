
import ProgramsPageView from "@/features/components/programPageViews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রকল্পসমূহ | মোল্লাপাড়া সমাজ কল্যাণ সংস্থা",
  description:
    "রক্তদান কর্মসূচি, শিক্ষা সহায়তা এবং ঋণ ও পুনর্বাসন — আমাদের তিনটি প্রধান কল্যাণমূলক প্রকল্প।",
};

export default function ProgramsPage() {
  return (
    <>
   
   
        <ProgramsPageView />
      
     
    </>
  );
}
