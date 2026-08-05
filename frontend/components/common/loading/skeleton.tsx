"use client";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="h-full w-full rounded-xl bg-slate-200" />

      <div
        className="
          absolute
          inset-0
          -translate-x-full
          animate-[shimmer_1.8s_infinite]
          bg-gradient-to-r
          from-transparent
          via-white/60
          to-transparent
        "
      />
    </div>
  );
}