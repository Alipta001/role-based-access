"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/dashboard/dashboardShell";
import DashboardSkeleton from "@/components/common/loading/dashboardSkeleton";

import { DashboardProvider } from "@/context/dashboardContext";
import { useDashboard } from "@/context/dashboardContext";

import {dashboardService, userService } from "@/api/services";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "employee";
}

function LayoutContent({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const { setStats } = useDashboard();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { users, tasks } = await dashboardService.fetchAdminDashboardStats();

        setStats({
          totalUsers: users.length,

          totalManagers: users.filter(
            (user: User) =>
              user.role === "manager"
          ).length,

          totalEmployees: users.filter(
            (user: User) =>
              user.role === "employee"
          ).length,

          totalTasks: tasks.length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (user.role === "admin") {
      fetchDashboardData();
    }
  }, [user.role, setStats]);

  return (
    <DashboardShell
      role={user.role}
      user={{
        name: user.name,
        email: user.email,
      }}
    >
      {children}
    </DashboardShell>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userService.getCurrentUser();

        setUser(response.data.data);
      } catch (error) {
        console.error(error);

        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);



  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <DashboardProvider>
      <LayoutContent user={user}>
        {children}
      </LayoutContent>
    </DashboardProvider>
  );
}