"use client";

import { ShieldCheck } from "lucide-react";

interface ChangePasswordLayoutProps {
  children: React.ReactNode;
}

export default function ChangePasswordLayout({
  children,
}: ChangePasswordLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-10">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}

        <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-8 text-white">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <ShieldCheck size={30} />
          </div>

          <h1 className="text-3xl font-bold">Change Password</h1>

          <p className="mt-2 text-sm text-indigo-100">
            Update your password to keep your account secure.
          </p>
        </div>

        {/* Form */}

        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
