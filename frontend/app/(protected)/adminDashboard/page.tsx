import DashboardCard from "@/components/dashboard/dashboardCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome card */}

      <div
        className="
          rounded-[2rem]
          border
          border-slate-200/80
          bg-white/80
          p-8
          shadow-[0_16px_60px_-24px_rgba(15,23,42,0.32)]
          backdrop-blur-sm
        "
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, Admin 👋
        </h1>

        <p className="mt-3 text-slate-500">
          Manage employees, managers, records, reports, and system settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total Users" value="120" />
        <DashboardCard title="Managers" value="18" />
        <DashboardCard title="Employees" value="102" />
        <DashboardCard title="Records" value="840" />
      </div>
    </div>
  );
}