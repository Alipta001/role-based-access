"use client";
import { ReactNode } from "react";

interface TaskFormLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function TaskFormLayout({
  children,
  title,
  subtitle,
}: TaskFormLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-indigo-50/60 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-[30px] border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6 lg:p-8">
        {/* Header */}

        <div className="mb-8 rounded-[24px] border border-slate-200/70 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 p-6 text-white shadow-lg shadow-indigo-200/50 sm:p-8">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
            Task Management
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            {title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Form */}

        <div className="rounded-[24px] border border-slate-200/70 bg-slate-50/70 p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}