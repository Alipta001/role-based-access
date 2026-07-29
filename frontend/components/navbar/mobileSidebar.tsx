"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiLogOut, FiHome } from "react-icons/fi";
import type { DashboardRole, MenuItem } from "./menu";
import { adminMenu, employeeMenu, managerMenu } from "./menu";

interface MobileSidebarProps {
  role: DashboardRole;
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

export default function MobileSidebar({ role, user, onLogout }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menu = useMemo<MenuItem[]>(() => {
    switch (role) {
      case "admin":
        return adminMenu;
      case "manager":
        return managerMenu;
      default:
        return employeeMenu;
    }
  }, [role]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const initials = (user.name || "U")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 xl:hidden"
        aria-label="Open navigation"
      >
        <FiMenu size={18} />
      </button>

      <div
        className={`fixed inset-0 z-40 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-slate-950/35 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        <aside
          className={`absolute left-0 top-0 flex h-full w-[82vw] max-w-[320px] flex-col border-r border-slate-200/80 bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-600 to-violet-500 text-white shadow-lg">
                <FiHome size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">RecordHub</p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
              aria-label="Close navigation"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-indigo-600 text-sm font-semibold text-white">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {menu.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${
                      active
                        ? "bg-indigo-50 text-indigo-700 shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-white text-indigo-600 shadow-sm" : "bg-slate-100 text-slate-500"}`}>
                      <Icon size={16} />
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-200/80 p-4">
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <FiLogOut size={15} />
              Logout
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
