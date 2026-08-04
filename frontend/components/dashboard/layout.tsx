"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

interface DashboardLayoutProps {
  role: "admin" | "manager" | "employee";

  user: {
    name: string;
    email: string;
  };

  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  user,
  children,
}: DashboardLayoutProps) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  const canCreateUser = role === "admin";

  const canCreateRecord = role === "admin" || role === "manager";

  const canUpdateRecord = role === "admin" || role === "manager";

  const canDeleteRecord = role === "admin";

  const handleLogout = async () => {
    try {
      let endpoint = "";
      let redirectPath = "";

      switch (role) {
        case "admin":
          endpoint = endPoints.admin.auth.logout;
          redirectPath = "/adminLogin";
          break;

        case "manager":
          endpoint = endPoints.manager.auth.logout;
          redirectPath = "/managerLogin";
          break;

        default:
          endpoint = endPoints.employee.auth.logout;
          redirectPath = "/employeeLogin";
      }

      await AxiosInstance.post(endPoints.common.logout);

      router.replace(redirectPath);

      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-white
        to-indigo-50
        text-slate-900
      "
    >
      {/* Navbar */}

      <Navbar role={role} user={user} onLogout={handleLogout} />

      {/* Sidebar */}

      <Sidebar
        role={role}
        user={user}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
        onLogout={handleLogout}
      />

      {/* Main content */}

      <main
        className={`
          pt-20
          transition-all
          duration-300
          ${collapsed ? "xl:pl-20" : "xl:pl-[280px]"}
        `}
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >
          {/* Admin actions */}

          {canCreateUser && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => router.push("/addUser")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-indigo-200/50
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                "
              >
                <UserPlus size={18} />
                Add User
              </button>
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  );
}
