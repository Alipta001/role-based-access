"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiCalendar,
  FiEdit,
  FiEye,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import DeleteModal from "@/components/common/deleteModal";
import { TaskType } from "@/types/task";

interface TaskCardProps {
  task: TaskType;
  role: "admin" | "manager" | "employee";
  onDelete?: (id: string) => void;
  onStatusChange?: (
    id: string,
    status: string
  ) => void;
}

export default function TaskCard({
  task,
  role,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

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

  const getPriorityColor = () => {
    switch (task.priority) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Medium":
        return "bg-indigo-100 text-indigo-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const formattedDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "No due date";

  const handleDelete = () => {
    onDelete?.(task._id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200/80
          bg-white
          p-6
          shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_24px_70px_-24px_rgba(79,70,229,0.35)]
        "
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600" />

        {/* Header */}

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
              {task.title}
            </h3>

            <span
              className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${getStatusColor()}
              `}
            >
              {task.status}
            </span>
          </div>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${getPriorityColor()}
            `}
          >
            {task.priority}
          </span>
        </div>

        {/* Description */}

        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-500">
          {task.description}
        </p>

        {/* Details */}

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <FiUser size={16} />

            <span>
              {task.assigned_to?.name ||
                "Not assigned"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <FiCalendar size={16} />

            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="mt-6">
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Change status
  </label>

  <select
    value={task.status}
    onChange={(e) =>
      onStatusChange?.(
        task._id,
        e.target.value
      )
    }
    className="
      w-full
      rounded-xl
      border
      border-slate-200
      bg-white
      px-4
      py-2
      text-sm
      text-slate-700
      outline-none
      focus:border-indigo-500
    "
  >
    <option value="Pending">
      Pending
    </option>

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
</div>

        {/* Footer */}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/tasks/view/${task._id}`}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-slate-100
              px-4
              py-2
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-200
            "
          >
            <FiEye size={16} />
            <span>View</span>
          </Link>

          {role !== "employee" && (
            <Link
              href={`/tasks/update/${task._id}`}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                shadow-sm
                transition
                hover:shadow-md
              "
            >
              <FiEdit size={16} />
              <span>Edit</span>
            </Link>
          )}

          {role === "admin" && (
            <button
              onClick={() =>
                setIsDeleteModalOpen(true)
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-2
                text-sm
                font-medium
                text-red-600
                transition
                hover:bg-red-100
              "
            >
              <FiTrash2 size={16} />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        title="Delete Task"
        description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        onClose={() =>
          setIsDeleteModalOpen(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}