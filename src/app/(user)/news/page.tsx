import NewsPageView from "@/features/components/newsPageViews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'সংবাদ | কমিউনিটি সোশ্যাল ক্লাব',
  description: 'কমিউনিটি সোশ্যাল ক্লাবের সর্বশেষ সংবাদ ও আপডেট।',
};

const NewsPages = () => {
    return (
        <div>
            <NewsPageView/>
        </div>
    );
};

export default NewsPages;