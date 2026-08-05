"use client";

import Skeleton from "./skeleton";

interface TaskSkeletonProps {
  count?: number;
}

export default function TaskSkeleton({
  count = 6,
}: TaskSkeletonProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-slate-200
            bg-white/90
            p-6
            shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)]
            backdrop-blur-sm
          "
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40 rounded-lg" />

            <Skeleton className="h-8 w-20 rounded-full" />
          </div>

          <div className="mt-6 space-y-4">
            <Skeleton className="h-4 w-full rounded-lg" />

            <Skeleton className="h-4 w-5/6 rounded-lg" />

            <Skeleton className="h-4 w-3/4 rounded-lg" />
          </div>

          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-32 rounded-lg" />

            <Skeleton className="h-4 w-44 rounded-lg" />
          </div>

          <div className="mt-8 flex gap-4">
            <Skeleton className="h-10 w-24 rounded-xl" />

            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}