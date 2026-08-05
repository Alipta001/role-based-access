"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FiBell, FiCheckCircle, FiAlertCircle, FiClock } from "react-icons/fi";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  icon: ReactNode;
  unread?: boolean;
}

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [
    {
      id: 1,
      title: "New Task Assigned",
      message: "A new task was shared with your team.",
      time: "2 min ago",
      unread: true,
      icon: <FiCheckCircle className="text-emerald-500" />,
    },
    {
      id: 2,
      title: "Status Updated",
      message: "Project Alpha moved to review.",
      time: "20 min ago",
      icon: <FiAlertCircle className="text-amber-500" />,
    },
    {
      id: 3,
      title: "Deadline Reminder",
      message: "Ticket #102 closes today at 6 PM.",
      time: "1 hour ago",
      unread: true,
      icon: <FiClock className="text-indigo-500" />,
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/90 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      >
        <FiBell className="text-lg" />
        <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
          2
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-[min(92vw,24rem)] overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.4)] backdrop-blur-xl">
          <div className="border-b border-slate-200/80 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                <p className="text-sm text-slate-500">Recent updates</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">2 unread</span>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.map((item) => (
              <div key={item.id} className="flex gap-3 border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-lg">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-semibold text-slate-800">{item.title}</h4>
                    {item.unread && <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{item.message}</p>
                  <span className="mt-2 block text-xs text-slate-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="w-full border-t border-slate-200/80 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}