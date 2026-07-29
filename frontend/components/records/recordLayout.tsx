"use client";

import { ReactNode } from "react";
import { FiCheckCircle, FiShield, FiClipboard } from "react-icons/fi";

interface RecordLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function RecordLayout({
  children,
  title = "Create Record",
  subtitle = "Manage tasks, tickets, projects and work items efficiently.",
}: RecordLayoutProps) {
  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-5">
      <div className="mx-auto h-full max-w-7xl">
        <div className="grid h-full gap-6 lg:grid-cols-5">
          {/* LEFT PANEL */}

          <div
            className="
              hidden
              lg:flex
              lg:col-span-2
              rounded-3xl
              bg-gradient-to-br
              from-indigo-700
              via-indigo-800
              to-purple-700
              p-8
              text-white
              shadow-2xl
              flex-col
              justify-between
            "
          >
            <div>
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-white/20
                  px-4
                  py-2
                  text-sm
                  backdrop-blur
                "
              >
                Record Management
              </span>

              <h1 className="mt-8 text-4xl font-bold leading-tight">{title}</h1>

              <p className="mt-5 text-indigo-100 leading-7">{subtitle}</p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <FiClipboard size={24} />
                  <h3 className="font-semibold">Manage Records</h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-indigo-100">
                  Create, organize and manage projects, tickets and work items
                  from one place.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <FiShield size={24} />
                  <h3 className="font-semibold">Secure Permissions</h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-indigo-100">
                  Role-based access ensures every user only sees what they are
                  allowed to.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <FiCheckCircle size={24} />
                  <h3 className="font-semibold">Productivity</h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-indigo-100">
                  Keep your workflow organized with priorities, due dates and
                  statuses.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}

          <div
            className="
              lg:col-span-3
              rounded-3xl
              bg-white
              shadow-2xl
              overflow-hidden
              flex
              flex-col
            "
          >
            {/* Header */}

            <div className="border-b border-slate-200 px-8 py-6">
              <h2 className="text-3xl font-bold text-slate-800">{title}</h2>

              <p className="mt-2 text-slate-500">
                Fill in the information below.
              </p>
            </div>

            {/* Scrollable Form */}

            <div className="flex-1 overflow-y-auto px-8 py-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
