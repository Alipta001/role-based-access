import TaskFormLayout from "@/components/tasks/createTask/taskFormLayout";
import EditTaskForm from "@/components/tasks/updateTask/editTaskForm";

export default function UpdateRecordPage() {
  return (
    <TaskFormLayout
      title="Update Record"
      subtitle="Modify an existing record."
    >
      <EditTaskForm />
    </TaskFormLayout>
  );
}