import ContactPageView from '@/features/components/contactPageViews';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'যোগাযোগ | মোল্লাপাড়া সমাজ কল্যাণ সংস্থা',
  description: 'মোল্লাপাড়া সমাজ কল্যাণ সংস্থার সাথে যোগাযোগ করুন। আমাদের এলাকার উন্নয়নে আপনার অংশগ্রহণ করুন।',
};

const Contact = () => {
    return (
        <div>
            <ContactPageView/>
        </div>
    );
};

export default Contact;