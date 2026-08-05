"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiHome,
} from "react-icons/fi";

import type {
  DashboardRole,
  MenuItem,
} from "./menu";

import {
  adminMenu,
  employeeMenu,
  managerMenu,
} from "./menu";

interface MobileSidebarProps {
  role: DashboardRole;
  user: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
}

export default function MobileSidebar({
  role,
  user,
  onLogout,
}: MobileSidebarProps) {
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

  const initials = (user.name || "User")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Hamburger */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
          transition
          hover:bg-slate-50
          xl:hidden
        "
      >
        <FiMenu size={20} />
      </button>

      {/* Overlay */}

      <div
        className={`
          fixed
          inset-0
          z-[998]
          transition-all
          duration-300
          ${
            open
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Sidebar */}

        <aside
          className={`
            fixed
            left-0
            top-0
            z-[999]
            flex
            h-screen
            w-[85%]
            max-w-[320px]
            flex-col
            overflow-y-auto
            border-r
            border-slate-200
            bg-white
            shadow-2xl
            transition-transform
            duration-300
            ${
              open
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <FiHome />
              </div>

              <div>
                <h2 className="font-bold">
                  AccessHub
                </h2>

                <p className="text-sm text-slate-500 capitalize">
                  {role}
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 hover:bg-slate-100"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* User */}

          <div className="m-4 rounded-2xl border bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {user.name}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}

          <div className="space-y-2 px-4">
            {menu.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(
                  `${item.href}/`
                );

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    py-3
                    transition
                    ${
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-slate-100"
                    }
                  `}
                >
                  <Icon size={18} />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout */}

          <div className="mt-auto border-t p-5">
            <button
              onClick={() => onLogout?.()}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-red-50
                py-3
                font-semibold
                text-red-600
                hover:bg-red-100
              "
            >
              <FiLogOut />

              Logout
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}