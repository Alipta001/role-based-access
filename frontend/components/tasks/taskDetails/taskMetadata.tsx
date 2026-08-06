"use client";

import { TaskType } from "@/types/task";

interface Props {
  task: TaskType;
}

export default function TaskMetadata({
  task,
}: Props) {
  console.log(task);
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="mb-6 text-xl font-semibold">
        Metadata
      </h2>

      <div className="space-y-5">
        <Row title="Task ID" value={task._id} />

        <Row
  title="Created At"
  value={new Date(task.created_at).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )}
/>

<Row
  title="Updated At"
  value={new Date(task.updated_at).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )}
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