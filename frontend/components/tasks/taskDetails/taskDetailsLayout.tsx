// import TaskAttachments from "./taskAttachments";
// import TaskDescription from "./taskDescription";
// import TaskDetails from "./taskDetails";
// import TaskHeader from "./taskHeader";
// import TaskMetadata from "./taskMetadata";

// export default function TaskDetailsLayout() {
//   return (
//     <div className="space-y-6">
//       <TaskHeader />

//       <TaskDescription />

//       <div className="grid gap-6 xl:grid-cols-2">
//         <TaskDetails />
//         <TaskMetadata />
//       </div>

//       <TaskAttachments />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { taskService } from "@/api/services";
import { TaskType } from "@/types/task";

import TaskAttachments from "./taskAttachments";
import TaskDescription from "./taskDescription";
import TaskDetails from "./taskDetails";
import TaskHeader from "./taskHeader";
import TaskMetadata from "./taskMetadata";

export default function TaskDetailsLayout() {
  const params = useParams();

  const id = params.id as string;

  const [task, setTask] = useState<TaskType | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response =
          await taskService.getTaskById(id);

        setTask(response.data.data);
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.response?.data?.message ||
            "Unable to fetch task."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  if (loading) {
    return <p>Loading task...</p>;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div className="space-y-6">
      <TaskHeader task={task} />

      <TaskDescription task={task} />

      <div className="grid gap-6 xl:grid-cols-2">
        <TaskDetails task={task} />

        <TaskMetadata task={task} />
      </div>

      <TaskAttachments task={task} />
    </div>
  );
}