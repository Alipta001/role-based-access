"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import { authService } from "@/api/services";

interface DashboardShellProps {
  role: "admin" | "manager" | "employee";
  user: {
    name: string;
    email: string;
  };
  children: React.ReactNode;
}

export default function DashboardShell({ role, user, children }: DashboardShellProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();

      const redirectPath =
        role === "admin"
          ? "/adminLogin"
          : role === "manager"
          ? "/managerLogin"
          : "/employeeLogin";

      router.replace(redirectPath);
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
      <Navbar role={role} user={user} onLogout={handleLogout} />
      <Sidebar
        role={role}
        user={user}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
        onLogout={handleLogout}
      />

      <main
        className={`pt-20 transition-all duration-300 ${collapsed ? "xl:pl-20" : "xl:pl-[280px]"}`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
