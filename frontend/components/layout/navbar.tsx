"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPlus, FiShield } from "react-icons/fi";

import MobileSidebar from "./mobileSidebar";
import SearchBar from "./searchbar";
import NotificationDropdown from "./notificationDropdown";
import ProfileDropdown from "./profileDropdown";

interface NavbarProps {
  role: "admin" | "manager" | "employee";
  user: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
}

export default function Navbar({ role, user, onLogout = () => {} }: NavbarProps) {
  const pathname = usePathname();

  const dashboardUrl =
    role === "admin"
      ? "/adminDashboard"
      : role === "manager"
      ? "/managerDashboard"
      : "/employeeDashboard";

  const pageTitle = pathname.includes("addEmployee")
    ? "Add Employee"
    : pathname.includes("addManager")
    ? "Add Manager"
    : role === "admin"
    ? "Admin Dashboard"
    : role === "manager"
    ? "Manager Workspace"
    : "Employee Portal";

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl sm:h-20">
      <div className="flex h-full items-center justify-between gap-2 px-2 sm:px-4 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <div className="flex xl:hidden">
  <MobileSidebar
    role={role}
    user={user}
    onLogout={onLogout}
  />
</div>

          <Link href={dashboardUrl} className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-white shadow-lg shadow-indigo-200 sm:h-11 sm:w-11">
              <FiShield size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="hidden min-w-0 sm:block">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-slate-900">
                  AccessHub
                </h1>
                <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600">
                  {role}
                </span>
              </div>
              <p className="truncate text-xs text-slate-500">
                Role Based Access Management
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* <div className="hidden w-[220px] lg:block xl:w-[320px]">
            <SearchBar />
          </div> */}

          {role === "admin" && (
            <Link
              href="/addUser"
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl md:flex"
            >
              <FiPlus size={16} /> Add User
            </Link>
          )}

          <div className="shrink-0">
            <NotificationDropdown />
          </div>

          <div className="shrink-0">
            <ProfileDropdown
              name={user.name}
              email={user.email}
              role={role}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
