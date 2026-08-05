"use client";

interface RecordSortProps {
  sort: string;
  setSort: (value: string) => void;
}

export default function RecordSort({
  sort,
  setSort,
}: RecordSortProps) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="
        h-12
        rounded-2xl
        border
        border-slate-200
        px-4
        outline-none
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-100
      "
    >
      <option value="newest">
        Newest First
      </option>

      <option value="oldest">
        Oldest First
      </option>

      <option value="priority">
        Highest Priority
      </option>

      <option value="dueDate">
        Due Date
      </option>
    </select>
  );
}