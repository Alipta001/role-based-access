"use client";

import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({
  placeholder = "Search tasks...",
  onChange,
}: SearchBarProps) {
  return (
    <div className="hidden flex-1 items-center justify-center md:flex">
      <div className="relative w-full min-w-0 max-w-2xl">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200/80 bg-slate-50/80 pl-11 pr-20 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
        <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 sm:flex">
          ⌘K
        </span>
      </div>
    </div>
  );
}