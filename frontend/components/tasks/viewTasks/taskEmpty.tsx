"use client";

import { FiClipboard } from "react-icons/fi";

interface TaskEmptyProps {
  title?: string;
  description?: string;
}

export default function TaskEmpty({
  title = "No Tasks Found",
  description = "Create your first task to get started.",
}: TaskEmptyProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-slate-200
        bg-white
        px-8
        py-20
        text-center
        shadow-sm
      "
    >
      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-slate-100
        "
      >
        <FiClipboard
          size={40}
          className="text-slate-400"
        />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>
    </div>
  );
}