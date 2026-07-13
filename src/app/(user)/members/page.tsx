import MembersPageView from '@/features/components/membersPageViews';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'সদস্যবৃন্দ | মোল্লাপাড়া সমাজ কল্যাণ সংস্থা',
  description: 'মোল্লাপাড়া সমাজ কল্যাণ সংস্থার সকল সদস্যদের তালিকা। আমাদের সদস্যরা এলাকার উন্নয়নে কাজ করছেন।',
};

const MembersPage = () => {
    return (
        <div>
            <MembersPageView/>
        </div>
    );
};

export default MembersPage;