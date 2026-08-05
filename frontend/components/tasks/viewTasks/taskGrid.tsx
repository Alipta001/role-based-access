"use client";

import { TaskType } from "@/types/task";
import TaskCard from "./taskCard";
import TaskEmpty from "./taskEmpty";


interface TaskGridProps {
  tasks: TaskType[];
  role: "admin" | "manager" | "employee";
  onDelete?: (id: string) => void;
  onStatusChange?: (
    id: string,
    status: string
  ) => void;
}

export default function TaskGrid({
  tasks,
  role,
  onDelete,
  onStatusChange,
}: TaskGridProps) {
  if (!tasks.length) {
    return <TaskEmpty />;
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
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          role={role}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}