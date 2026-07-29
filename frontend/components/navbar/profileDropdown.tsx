"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiUser, FiSettings, FiLogOut, FiLayout } from "react-icons/fi";

interface ProfileDropdownProps {
  name: string;
  email: string;
  role: "admin" | "manager" | "employee";
  onLogout: () => void;
}

export default function ProfileDropdown({ name, email, role, onLogout }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = (name || "U")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const roleColor =
    role === "admin" ? "bg-rose-100 text-rose-600" : role === "manager" ? "bg-sky-100 text-sky-600" : "bg-emerald-100 text-emerald-600";

  const dashboardHref = role === "admin" ? "/admin" : role === "manager" ? "/manager" : "/employee";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-2.5 py-2 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/70"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 via-indigo-600 to-violet-500 text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="hidden text-left xl:block">
          <h4 className="text-sm font-semibold text-slate-800">{name}</h4>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
        <FiChevronDown className={`hidden text-slate-500 transition xl:block ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.4)] backdrop-blur-xl">
          <div className="border-b border-slate-200/80 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 via-indigo-600 to-violet-500 text-lg font-semibold text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-slate-900">{name}</h3>
                <p className="truncate text-sm text-slate-500">{email}</p>
                <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${roleColor}`}>{role.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 p-2">
            <Link href={dashboardHref} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <FiLayout size={16} />
              Dashboard
            </Link>
            <Link href="/profile" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <FiUser size={16} />
              Profile
            </Link>
            <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <FiSettings size={16} />
              Settings
            </Link>
          </div>

          <div className="border-t border-slate-200/80 p-2">
            <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50">
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}