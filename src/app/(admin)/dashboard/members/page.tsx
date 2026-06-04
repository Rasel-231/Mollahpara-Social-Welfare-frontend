import MemberTable from '@/features/admin/components/membarTable/membarTable';
import React from 'react';

const MemberPages = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-white">সদস্য তালিকা</h1>
            <MemberTable />
        </div>
    );
};

export default MemberPages;