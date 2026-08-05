import Skeleton from "./skeleton";

export default function FormSkeleton() {
  return (
    <div className="space-y-8 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-5">
        <Skeleton className="h-8 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </div>
  );
}
