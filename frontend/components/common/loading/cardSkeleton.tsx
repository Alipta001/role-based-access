"use client";

import Skeleton from "./skeleton";

export default function CardSkeleton() {
  return (
    <div
      className="
        rounded-[2rem]
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)]
        backdrop-blur-sm
      "
    >
      <div className="space-y-5">
        <Skeleton className="h-5 w-28 rounded-lg" />

        <Skeleton className="h-10 w-36 rounded-xl" />

        <Skeleton className="h-4 w-3/4 rounded-lg" />

        <div className="flex items-center justify-between pt-3">
          <Skeleton className="h-8 w-24 rounded-full" />

          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}