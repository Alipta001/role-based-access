export default function TaskDetails() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="mb-6 text-xl font-semibold">
        Details
      </h2>

      <div className="space-y-5">
        <Row title="Category" value="Finance" />
        <Row title="Priority" value="High" />
        <Row title="Department" value="HR" />
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