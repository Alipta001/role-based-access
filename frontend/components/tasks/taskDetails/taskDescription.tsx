"use client";

import { TaskType } from "@/types/task";

interface Props {
  task: TaskType;
}

export default function TaskDescription({
  task,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="mb-4 text-xl font-semibold">
        Description
      </h2>

      <p className="leading-8 text-slate-600">
        {task.description || "No description available."}
      </p>
    </div>
  );
}