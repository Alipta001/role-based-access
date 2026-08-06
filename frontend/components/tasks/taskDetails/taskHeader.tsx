"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { TaskType } from "@/types/task";

interface Props {
  task: TaskType;
}

export default function TaskHeader({
  task,
}: Props) {
  const getStatusColor = () => {
    switch (task.status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <Link
          href="/tasks/viewAllTasks"
          className="flex items-center gap-2 text-slate-600"
        >
          <FiArrowLeft />
          Back
        </Link>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor()}`}
        >
          {task.status}
        </span>
      </div>

      <h1 className="mt-6 text-3xl font-bold">
        {task.title}
      </h1>

      <p className="mt-3 text-slate-500">
        Assigned to{" "}
        {task.assigned_to?.name || "Unknown"}
      </p>
    </div>
  );
}