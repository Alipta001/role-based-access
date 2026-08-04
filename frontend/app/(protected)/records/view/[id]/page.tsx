import RecordLayout from "@/components/records/viewRecords/recordLayout";

export default function ViewRecordPage() {
  return (
    <RecordLayout>
      <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Record detail view</h1>
        <p className="mt-2 text-sm text-slate-500">The detail view will be wired into this module next.</p>
      </div>
    </RecordLayout>
  );
}
