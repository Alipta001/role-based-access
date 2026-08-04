"use client";

interface Props {
  children: React.ReactNode;
}

export default function RecordLayout({
  children,
}: Props) {
  return (
    <div className="rounded-[32px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] backdrop-blur sm:p-6 lg:p-8">
      <div className="rounded-[28px] border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-indigo-50/60 p-4 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}