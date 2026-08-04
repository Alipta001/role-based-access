"use client";

import Skeleton from "./skeleton";

interface RecordSkeletonProps {
  count?: number;
}

export default function RecordSkeleton({ count = 6 }: RecordSkeletonProps) {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
            "
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />

            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          <div className="mt-5 space-y-3">
            <Skeleton className="h-4 w-full" />

            <Skeleton className="h-4 w-5/6" />

            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-32" />

            <Skeleton className="h-4 w-40" />
          </div>

          <div className="mt-8 flex gap-3">
            <Skeleton className="h-10 w-24" />

            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
