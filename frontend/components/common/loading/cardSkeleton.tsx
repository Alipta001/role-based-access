import Skeleton from "./skeleton";

export default function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-2/3" />

        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-4 w-5/6" />

        <div className="flex justify-between pt-4">
          <Skeleton className="h-8 w-24 rounded-full" />

          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
