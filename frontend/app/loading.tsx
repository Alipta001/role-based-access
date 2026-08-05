import DashboardSkeleton from "@/components/common/loading/dashboardSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <DashboardSkeleton />
    </div>
  );
}
