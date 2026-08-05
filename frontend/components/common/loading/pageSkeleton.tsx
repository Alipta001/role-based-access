"use client";

import Skeleton from "./skeleton";

export default function PageSkeleton() {
  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-5 w-1/2 rounded-xl" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Skeleton className="h-48 rounded-[2rem] xl:col-span-2" />

        <div className="space-y-4">
          <Skeleton className="h-14 rounded-[1.5rem]" />
          <Skeleton className="h-14 rounded-[1.5rem]" />
          <Skeleton className="h-14 rounded-[1.5rem]" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Skeleton className="h-44 rounded-[2rem]" />
        <Skeleton className="h-44 rounded-[2rem]" />
        <Skeleton className="h-44 rounded-[2rem]" />
      </div>
    </div>
  );
}
