interface Props {
  total: number;
}

export default function RecordStats({
  total,
}: Props) {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl bg-white p-6">
        <h3>Total Records</h3>

        <p className="mt-3 text-4xl font-bold">
          {total}
        </p>
      </div>
    </div>
  );
}