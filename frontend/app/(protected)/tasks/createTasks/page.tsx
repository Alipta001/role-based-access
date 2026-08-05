import CreateTaskForm from "@/components/tasks/createTask/createTaskForm";
import TaskFormLayout from "@/components/tasks/createTask/taskFormLayout";

export default function Tasks() {
  return (
    <TaskFormLayout
      title="Create Task"
      subtitle="Create and assign tasks, tickets, and projects."
    >
      <CreateTaskForm />
    </TaskFormLayout>
  );
}