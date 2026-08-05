"use client";

import Skeleton from "./skeleton";

export default function FormSkeleton() {
  return (
    <div className="space-y-10 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)]">
      <div className="space-y-4">
        <Skeleton className="h-10 w-52 rounded-xl" />
        <Skeleton className="h-5 w-1/2 rounded-xl" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-14 rounded-[1.5rem]" />
        <Skeleton className="h-14 rounded-[1.5rem]" />
        <Skeleton className="h-40 md:col-span-2 rounded-[2rem]" />
        <Skeleton className="h-14 rounded-[1.5rem]" />
        <Skeleton className="h-14 rounded-[1.5rem]" />
      </div>

      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-12 w-32 rounded-full" />
        <Skeleton className="h-12 w-32 rounded-full" />
      </div>
    </div>
  );
}
