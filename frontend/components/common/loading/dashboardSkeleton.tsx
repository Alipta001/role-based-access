import CardSkeleton from "./cardSkeleton";
import TaskSkeleton from "./taskSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 w-48 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-4 w-80 rounded-full bg-slate-200 animate-pulse" />
          </div>
          <div className="h-10 w-28 rounded-full bg-slate-200 animate-pulse" />
        </div>

        <TaskSkeleton count={3} />
      </div>
    </div>
  );
}
