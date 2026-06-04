import BloodDonationSection from "@/features/components/bloodDonation";
import DonationSection from "@/features/components/donationSection";
import GallerySection from "@/features/components/gallerySection";
import HeroSection from "@/features/components/hero";

import LoanRehabSection from "@/features/components/loanResponsible";
import MembersSection from "@/features/components/memberSection";
import NewsSection from "@/features/components/newsection";
import ProgramsSection from "@/features/components/programSection";
import VideoGallery from "@/features/components/videoGallery";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BloodDonationSection />
      <LoanRehabSection/>
      <ProgramsSection/>
      <VideoGallery/>
      < GallerySection/>
      <NewsSection/>
      <MembersSection/>
      <DonationSection/>
      
    </main>
  );
}
