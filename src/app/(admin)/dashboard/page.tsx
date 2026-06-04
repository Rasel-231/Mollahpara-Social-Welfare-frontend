import RecentProjectsTable from "@/features/admin/components/historyTable/historyTable";
import StateSection from "@/features/admin/components/stateCard/stateCard";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <StateSection />
      <div className="w-full">
        <RecentProjectsTable />
      </div>
    </div>
  );
}