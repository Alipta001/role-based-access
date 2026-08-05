import UsersSkeleton from "@/components/common/loading/usersSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <UsersSkeleton />
    </div>
  );
}
