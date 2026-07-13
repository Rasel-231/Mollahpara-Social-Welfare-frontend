import EducationAidForm from "@/features/components/educationalAidForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'শিক্ষা সহায়তা | মোল্লাপাড়া সমাজ কল্যাণ সংস্থা',
  description: 'মোল্লাপাড়া সমাজ কল্যাণ সংস্থার শিক্ষা সহায়তা প্রকল্পে আবেদন করুন। প্রতিভাবান শিক্ষার্থীদের জন্য আর্থিক সহায়তা।',
};

const EducationAidFormPages = () => {
  return (
    <div>
      <EducationAidForm />
    </div>
  );
};

export default EducationAidFormPages;
