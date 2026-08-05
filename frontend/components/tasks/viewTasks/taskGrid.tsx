"use client";

import { TaskType } from "@/types/task";
import RecordCard from "./taskCard";
import RecordEmpty from "./taskEmpty";


interface RecordGridProps {
  records: TaskType[];
  role: "admin" | "manager" | "employee";
  onDelete?: (id: string) => void;
  onStatusChange?: (
    id: string,
    status: string
  ) => void;
}

export default function RecordGrid({
  records,
  role,
  onDelete,
  onStatusChange,
}: RecordGridProps) {
  if (!records.length) {
    return <RecordEmpty />;
  }

  return (
    <div
      className="
        grid
        gap-6
        sm:grid-cols-1
        lg:grid-cols-2
        2xl:grid-cols-3
      "
    >
      {records.map((record) => (
        <RecordCard
          key={record._id}
          record={record}
          role={role}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}