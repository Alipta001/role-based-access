"use client";

import { FiUsers } from "react-icons/fi";

export default function UserEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
      <FiUsers
        size={60}
        className="mx-auto text-slate-300"
      />

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        No users found
      </h2>

      <p className="mt-2 text-slate-500">
        Try changing your filters.
      </p>
    </div>
  );
}