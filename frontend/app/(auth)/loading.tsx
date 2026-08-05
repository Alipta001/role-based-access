export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="h-8 w-72 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-4 w-96 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-4 w-80 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}
