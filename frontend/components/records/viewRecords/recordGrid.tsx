"use client";

import { RecordType } from "@/types/record";
import RecordCard from "./recordCard";
import RecordEmpty from "./recordEmpty";

interface RecordGridProps {
  records: RecordType[];
  role: "admin" | "manager" | "employee";
  onDelete?: (id: string) => void;
}

export default function RecordGrid({
  records,
  role,
  onDelete,
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
        />
      ))}
    </div>
  );
}