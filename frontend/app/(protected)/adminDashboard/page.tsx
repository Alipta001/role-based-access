"use client";

import DashboardCard from "@/components/dashboard/dashboardCard";
import { useDashboard } from "@/context/dashboardContext";

export default function AdminDashboard() {
  const { stats } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <h1 className="text-3xl font-bold">
          Welcome back, Admin 👋
        </h1>

        <p className="mt-3 text-slate-500">
          Manage users and tasks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Users"
          value={stats.totalUsers}
        />

        <DashboardCard
          title="Managers"
          value={stats.totalManagers}
        />

        <DashboardCard
          title="Employees"
          value={stats.totalEmployees}
        />

        <DashboardCard
          title="Tasks"
          value={stats.totalTasks}
        />
      </div>
    </div>
  );
}