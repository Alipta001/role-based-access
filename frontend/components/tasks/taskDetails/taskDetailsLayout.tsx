import TaskAttachments from "./taskAttachments";
import TaskDescription from "./taskDescription";
import TaskDetails from "./taskDetails";
import TaskHeader from "./taskHeader";
import TaskMetadata from "./taskMetadata";

export default function TaskDetailsLayout() {
  return (
    <div className="space-y-6">
      <TaskHeader />

      <TaskDescription />

      <div className="grid gap-6 xl:grid-cols-2">
        <TaskDetails />
        <TaskMetadata />
      </div>

      <TaskAttachments />
    </div>
  );
}