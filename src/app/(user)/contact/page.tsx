import ContactPageView from '@/features/components/contactPageViews';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'যোগাযোগ | কমিউনিটি সোশ্যাল ক্লাব',
  description: 'কমিউনিটি সোশ্যাল ক্লাবের সাথে যোগাযোগ করুন। আমাদের এলাকার উন্নয়নে আপনার অংশগ্রহণ করুন।',
};

const Contact = () => {
    return (
        <div>
            <ContactPageView/>
        </div>
    );
};

export default Contact;