import MembersPageView from '@/features/components/membersPageViews';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'সদস্যবৃন্দ | কমিউনিটি সোশ্যাল ক্লাব',
  description: 'কমিউনিটি সোশ্যাল ক্লাবের সকল সদস্যদের তালিকা। আমাদের সদস্যরা এলাকার উন্নয়নে কাজ করছেন।',
};

const MembersPage = () => {
    return (
        <div>
            <MembersPageView/>
        </div>
    );
};

export default MembersPage;