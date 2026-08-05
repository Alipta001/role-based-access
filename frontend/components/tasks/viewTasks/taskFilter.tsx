"use client";

interface RecordFilterProps {
  status: string;
  priority: string;
  setStatus: (value: string) => void;
  setPriority: (value: string) => void;
}

export default function RecordFilter({
  status,
  priority,
  setStatus,
  setPriority,
}: RecordFilterProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="
          h-12
          rounded-2xl
          border
          border-slate-200
          bg-slate-50/80
          px-4
          outline-none
          transition
          focus:border-indigo-500
          focus:bg-white
          focus:ring-4
          focus:ring-indigo-100
        "
      >
        <option value="">All Status</option>

        <option value="Pending">Pending</option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Completed">
          Completed
        </option>

        <option value="Cancelled">
          Cancelled
        </option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="
          h-12
          rounded-2xl
          border
          border-slate-200
          bg-slate-50/80
          px-4
          outline-none
          transition
          focus:border-indigo-500
          focus:bg-white
          focus:ring-4
          focus:ring-indigo-100
        "
      >
        <option value="">All Priority</option>

        <option value="Low">Low</option>

        <option value="Medium">Medium</option>

        <option value="High">High</option>

        <option value="Critical">Critical</option>
      </select>
    </div>
  );
}