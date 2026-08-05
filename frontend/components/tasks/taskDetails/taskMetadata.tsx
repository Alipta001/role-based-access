export default function RecordMetadata() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="mb-6 text-xl font-semibold">
        Metadata
      </h2>

      <div className="space-y-5">
        <Row
          title="Record ID"
          value="65a9d1f5f82"
        />

        <Row
          title="Created At"
          value="05 Aug 2026"
        />

        <Row
          title="Updated At"
          value="06 Aug 2026"
        />
      </div>
    </div>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
}