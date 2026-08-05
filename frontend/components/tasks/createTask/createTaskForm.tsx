// "use client";

// import { useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// import { AxiosInstance } from "@/api/axios/axios";
// import { endPoints } from "@/api/endpoints/endPoints";

// type TaskFormData = {
//   title: string;
//   description: string;
//   status: string;
//   priority: string;
//   assigned_to: string;
//   due_date: string;
// };

// type Employee = {
//   _id: string;
//   name: string;
//   email: string;
// };

// export default function CreateTaskForm() {
//   const router = useRouter();

//   const [employees, setEmployees] = useState<Employee[]>([]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<TaskFormData>({
//     defaultValues: {
//       status: "Pending",
//       priority: "Medium",
//     },
//   });

// const fetchEmployees = async () => {
//   try {
//     const response = await AxiosInstance.get(
//       endPoints.admin.users.list
//     );

//     console.log(response.data);

//     const users = Array.isArray(response.data.data)
//       ? response.data.data
//       : [];

//     setEmployees(users);
//   } catch (error) {
//     console.error(error);
//   }
// };

// useEffect(() => {
//   fetchEmployees();
// }, []);


//   const onSubmit: SubmitHandler<TaskFormData> =
//     async (data) => {
//       try {
//         const response = await AxiosInstance.post(
//           endPoints.tasks.create,
//           data
//         );

//         toast.success(response.data.message);

//         router.push("/tasks/viewAllTasks");
//       } catch (error: any) {
//         console.error(error);

//         toast.error(
//           error?.response?.data?.message ||
//             "Failed to create task."
//         );
//       }
//     };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="mt-10 space-y-6"
//       >
//         {/* Title */}

//         <div>
//           <label className="mb-2 block font-semibold text-slate-700">
//             Title
//           </label>

//           <input
//             type="text"
//             placeholder="Enter task title"
//             {...register("title", {
//               required: "Title is required",
//             })}
//             className="w-full rounded-xl border border-slate-300 px-5 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//           />

//           {errors.title && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.title.message}
//             </p>
//           )}
//         </div>

//         {/* Description */}

//         <div>
//           <label className="mb-2 block font-semibold text-slate-700">
//             Description
//           </label>

//           <textarea
//             rows={5}
//             placeholder="Describe the task"
//             {...register("description", {
//               required: "Description is required",
//             })}
//             className="w-full resize-none rounded-xl border border-slate-300 px-5 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//           />

//           {errors.description && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.description.message}
//             </p>
//           )}
//         </div>

//         {/* Status & Priority */}

//         <div className="grid gap-5 md:grid-cols-2">
//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Status
//             </label>

//             <select
//               {...register("status")}
//               className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             >
//               <option value="Pending">
//                 Pending
//               </option>

//               <option value="In Progress">
//                 In Progress
//               </option>

//               <option value="Completed">
//                 Completed
//               </option>

//               <option value="Cancelled">
//                 Cancelled
//               </option>
//             </select>
//           </div>

//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Priority
//             </label>

//             <select
//               {...register("priority")}
//               className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             >
//               <option value="Low">Low</option>

//               <option value="Medium">
//                 Medium
//               </option>

//               <option value="High">High</option>

//               <option value="Critical">
//                 Critical
//               </option>
//             </select>
//           </div>
//         </div>

//         {/* Assigned User */}

//         <div className="grid gap-5 md:grid-cols-2">
//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Assign To
//             </label>

//             <select
//               {...register("assigned_to")}
//               className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             >
//               <option value="">
//                 Select employee
//               </option>

//               {employees.map((employee) => (
//                 <option
//                   key={employee._id}
//                   value={employee._id}
//                 >
//                   {employee.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Due Date
//             </label>

//             <input
//               type="date"
//               {...register("due_date")}
//               className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="
//             w-full
//             rounded-xl
//             bg-gradient-to-r
//             from-indigo-600
//             to-purple-600
//             py-4
//             font-semibold
//             text-white
//             shadow-lg
//             transition
//             hover:scale-[1.02]
//             hover:shadow-xl
//             disabled:cursor-not-allowed
//             disabled:opacity-60
//           "
//         >
//           {isSubmitting
//             ? "Creating..."
//             : "Create Task"}
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Select from "react-select";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

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
  role: string;
};

type SelectOption = {
  value: string;
  label: string;
};

export default function CreateTaskForm() {
  const router = useRouter();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState<SelectOption | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: {
      status: "Pending",
      priority: "Medium",
    },
  });

  const fetchEmployees = async () => {
    try {
      const response = await AxiosInstance.get(
        endPoints.admin.users.assignableUsers
      );

      const users = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setEmployees(users);
    } catch (error) {
      console.error(error);

      toast.error("Unable to fetch users.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const employeeOptions = useMemo(() => {
    return employees.map((employee) => ({
      value: employee._id,
      label: `${employee.name} (${employee.role})`,
    }));
  }, [employees]);

  const onSubmit: SubmitHandler<TaskFormData> =
    async (data) => {
      try {
        const response = await AxiosInstance.post(
          endPoints.tasks.create,
          data
        );

        toast.success(response.data.message);

        router.push("/tasks/viewAllTasks");
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.response?.data?.message ||
            "Failed to create task."
        );
      }
    };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-6"
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
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full resize-none rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Status and Priority */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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
              className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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

        {/* Assign user */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Assign To
            </label>

            <Select
              options={employeeOptions}
              value={selectedEmployee}
              placeholder="Search employee..."
              onChange={(option) => {
                setSelectedEmployee(
                  option as SelectOption
                );

                setValue(
                  "assigned_to",
                  option?.value || ""
                );
              }}
            />
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

        {/* Submit */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full rounded-xl bg-gradient-to-r
            from-indigo-600 to-purple-600
            py-4 font-semibold text-white
            shadow-lg transition
            hover:scale-[1.02]
            hover:shadow-xl
          "
        >
          {isSubmitting
            ? "Creating..."
            : "Create Task"}
        </button>
      </form>
    </div>
  );
}