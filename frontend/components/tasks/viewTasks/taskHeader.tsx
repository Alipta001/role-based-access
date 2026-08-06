// "use client";

// import { useRouter } from "next/navigation";
// import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";

// interface TaskHeaderProps {
//   role: "admin" | "manager" | "employee";
//   totalTasks?: number;
//   search?: string;
//   setSearch?: (value: string) => void;
// }

// export default function TaskHeader({
//   role,
//   totalTasks = 0,
//   search = "",
//   setSearch,
// }: TaskHeaderProps) {
//   const router = useRouter();

//   return (
//     <div className="mb-8 space-y-6">
//       <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
//         <div>
//           <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
//             Task workspace
//           </div>

//           <h1 className="mt-3 text-3xl font-bold text-slate-900">
//             Tasks
//           </h1>

//           <p className="mt-1 text-slate-500">
//             Manage, organize and monitor tasks.
//           </p>

//           <p className="mt-3 text-sm font-medium text-slate-400">
//             Total tasks: {totalTasks}
//           </p>
//         </div>

//         {(role === "admin" || role === "manager") && (
//           <button
//             onClick={() => router.push("/tasks/create")}
//             className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white"
//           >
//             <FiPlus />
//             Create Task
//           </button>
//         )}
//       </div>

//       <div className="mt-6 flex flex-col gap-4 md:flex-row">
//         <div className="relative flex-1">
//           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

//           <input
//             value={search}
//             onChange={(e) => setSearch?.(e.target.value)}
//             placeholder="Search tasks..."
//             className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4"
//           />
//         </div>

//         <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3">
//           <FiFilter />
//           Filter
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useRouter } from "next/navigation";
import {
  FiFilter,
  FiPlus,
  FiSearch,
} from "react-icons/fi";

interface TaskHeaderProps {
  role: "admin" | "manager" | "employee";
  totalTasks?: number;
  search?: string;
  setSearch?: (value: string) => void;

  viewMode?: "myTasks" | "teamTasks";

  setViewMode?: (
    value: "myTasks" | "teamTasks"
  ) => void;
}

export default function TaskHeader({
  role,
  totalTasks = 0,
  search = "",
  setSearch,
  viewMode = "myTasks",
  setViewMode,
}: TaskHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
            Task workspace
          </div>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Tasks
          </h1>

          <p className="mt-1 text-slate-500">
            Manage, organize and monitor tasks.
          </p>

          <p className="mt-3 text-sm font-medium text-slate-400">
            Total tasks: {totalTasks}
          </p>
        </div>

        <div className="flex gap-3">
          {role === "manager" && (
            <div className="flex rounded-2xl border border-slate-200 p-1">
              <button
                onClick={() =>
                  setViewMode?.("myTasks")
                }
                className={`rounded-xl px-4 py-2 text-sm font-medium ${
                  viewMode === "myTasks"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600"
                }`}
              >
                My Tasks
              </button>

              <button
                onClick={() =>
                  setViewMode?.("teamTasks")
                }
                className={`rounded-xl px-4 py-2 text-sm font-medium ${
                  viewMode === "teamTasks"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600"
                }`}
              >
                Team Tasks
              </button>
            </div>
          )}

          {(role === "admin" ||
            role === "manager") && (
            <button
              onClick={() =>
                router.push("/tasks/create")
              }
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white"
            >
              <FiPlus />
              Create Task
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch?.(e.target.value)
            }
            placeholder="Search tasks..."
            className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4"
          />
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3">
          <FiFilter />
          Filter
        </button>
      </div>
    </div>
  );
}