"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/dashboard/dashboardShell";

import { DashboardProvider } from "@/context/dashboardContext";
import { useDashboard } from "@/context/dashboardContext";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

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
        const [usersResponse, tasksResponse] =
          await Promise.all([
            AxiosInstance.get(
              endPoints.admin.users.list
            ),
            AxiosInstance.get(
              endPoints.tasks.list
            ),
          ]);

        const users =
          usersResponse.data.data || [];

        const tasks =
          tasksResponse.data.data || [];

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
        const response =
          await AxiosInstance.get(
            endPoints.common.getUser
          );

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
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardProvider>
      <LayoutContent user={user}>
        {children}
      </LayoutContent>
    </DashboardProvider>
  );
}