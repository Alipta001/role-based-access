"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function TaskHeader() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <Link
          href="/tasks"
          className="flex items-center gap-2 text-slate-600"
        >
          <FiArrowLeft />
          Back
        </Link>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          Active
        </span>
      </div>

      <h1 className="mt-6 text-3xl font-bold">
        Employee Tasks
      </h1>

      <p className="mt-3 text-slate-500">
        Created by Admin
      </p>
    </div>
  );
}