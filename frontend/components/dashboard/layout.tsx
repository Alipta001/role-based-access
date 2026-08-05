"use client";

import DashboardShell from "./dashboardShell";

interface DashboardLayoutProps {
  role: "admin" | "manager" | "employee";
  user: {
    name: string;
    email: string;
  };
  children: React.ReactNode;
}

export default function DashboardLayout({ role, user, children }: DashboardLayoutProps) {
  return <DashboardShell role={role} user={user}>{children}</DashboardShell>;
}
