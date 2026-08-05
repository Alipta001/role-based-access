import CardSkeleton from "./cardSkeleton";

export default function UsersSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <div className="space-y-4">
          <div className="h-8 w-1/3 rounded-xl bg-slate-200 animate-pulse" />
          <div className="h-4 w-1/2 rounded-xl bg-slate-200 animate-pulse" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
