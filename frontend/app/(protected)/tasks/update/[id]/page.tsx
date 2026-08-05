import TaskFormLayout from "@/components/tasks/createTask/taskFormLayout";
import EditTaskForm from "@/components/tasks/updateTask/editTaskForm";

export default function UpdateTaskPage() {
  return (
    <TaskFormLayout
      title="Update Task"
      subtitle="Modify an existing task."
    >
      <EditTaskForm />
    </TaskFormLayout>
  );
}