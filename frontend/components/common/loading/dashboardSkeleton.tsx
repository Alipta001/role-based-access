"use client";

import CardSkeleton from "./cardSkeleton";
import TaskSkeleton from "./taskSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div
        className="
          rounded-[2rem]
          border
          border-slate-200
          bg-white/90
          p-8
          shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)]
        "
      >
        <div className="space-y-4">
          <div className="h-8 w-64 animate-pulse rounded-xl bg-slate-200" />

          <div className="h-5 w-96 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <TaskSkeleton count={3} />
    </div>
  );
}