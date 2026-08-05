import CreateTaskForm from "@/components/tasks/createTask/createTaskForm";
import TaskFormLayout from "@/components/tasks/createTask/taskFormLayout";

export default function Records() {
  return (
    <TaskFormLayout
      title="Create Record"
      subtitle="Create and assign tasks, tickets, and projects."
    >
      <CreateTaskForm />
    </TaskFormLayout>
  );
}