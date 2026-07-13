import NewsPageView from "@/features/components/newsPageViews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'সংবাদ | মোল্লাপাড়া সমাজ কল্যাণ সংস্থা',
  description: 'মোল্লাপাড়া সমাজ কল্যাণ সংস্থার সর্বশেষ সংবাদ ও আপডেট।',
};

const NewsPages = () => {
    return (
        <div>
            <NewsPageView/>
        </div>
    );
};

export default NewsPages;