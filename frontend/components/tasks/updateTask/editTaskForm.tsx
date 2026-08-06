"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { taskService, userService } from "@/api/services";
import FormSkeleton from "@/components/common/loading/formSkeleton";

type TaskFormData = {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_to: string;
  due_date: string;
};

type Employee = {
  _id: string;
  name: string;
  email: string;
};

export default function EditTaskForm() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: {
      status: "Pending",
      priority: "Medium",
    },
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await userService.fetchAssignableUsers();

        const users = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        setEmployees(users);
      } catch (error) {
        console.error(error);
        setEmployees([]);
      }
    };

    const fetchTask = async () => {
      try {
        const response = await taskService.getTaskById(id);

        const task = response.data.data;

        reset({
          title: task.title ?? "",
          description: task.description ?? "",
          status: task.status ?? "Pending",
          priority: task.priority ?? "Medium",
          assigned_to:
            task.assigned_to?._id ??
            task.assigned_to ??
            "",
          due_date: task.due_date
            ? new Date(task.due_date)
                .toISOString()
                .split("T")[0]
            : "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Unable to fetch task.");
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchEmployees(),
          fetchTask(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, reset]);
  

  const onSubmit: SubmitHandler<TaskFormData> =
    async (data) => {
      try {
const response = await taskService.updateTask(id, data);

        toast.success(response.data.message);

        router.push("/tasks/viewAllTasks");
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.response?.data?.message ||
            "Failed to update task."
        );
      }
    };

  if (loading) {
    return <FormSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Title */}

      <div>
        <label className="mb-2 block font-semibold text-slate-700">
          Title
        </label>

        <input
          type="text"
          placeholder="Enter task title"
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full rounded-xl border border-slate-300 px-5 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-semibold text-slate-700">
          Description
        </label>

        <textarea
          rows={5}
          placeholder="Describe the task"
          {...register("description")}
          className="w-full resize-none rounded-xl border border-slate-300 px-5 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      {/* Status and Priority */}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Priority
          </label>

          <select
            {...register("priority")}
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="Low">Low</option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">High</option>

            <option value="Critical">
              Critical
            </option>
          </select>
        </div>
      </div>

      {/* Assign employee and due date */}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Assign To
          </label>

          <select
            {...register("assigned_to")}
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="">
              Select employee
            </option>

            {employees.map((employee) => (
              <option
                key={employee._id}
                value={employee._id}
              >
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-slate-700">
            Due Date
          </label>

          <input
            type="date"
            {...register("due_date")}
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Updating..."
          : "Update Task"}
      </button>
    </form>
  );
}