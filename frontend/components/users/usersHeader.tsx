"use client";

import { FiSearch } from "react-icons/fi";

interface UsersHeaderProps {
  search: string;
  totalUsers: number;
  setSearch: (value: string) => void;
}

export default function UsersHeader({
  search,
  totalUsers,
  setSearch,
}: UsersHeaderProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="text-slate-500">
            {totalUsers} users found
          </p>
        </div>

        <div className="relative w-full lg:w-96">
          <FiSearch className="absolute left-4 top-4 text-slate-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search users..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4"
          />
        </div>
      </div>
    </div>
  );
}