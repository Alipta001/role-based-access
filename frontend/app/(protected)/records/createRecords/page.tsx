import CreateRecordForm from "@/components/records/createRecord/createRecordForm";
import CreateRecordLayout from "@/components/records/createRecord/createRecordLayout";

export default function Records() {
  return (
    <CreateRecordLayout
      title="Create Record"
      subtitle="Create and assign tasks, tickets, and projects."
    >
      <CreateRecordForm />
    </CreateRecordLayout>
  );
}