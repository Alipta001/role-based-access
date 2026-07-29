import RecordLayout from "@/components/records/recordLayout";
import RecordForm from "@/components/records/recordForm";

export default function Records() {
  return (
    <RecordLayout
      title="Create Record"
      subtitle="Create and assign tasks, tickets, and projects."
    >
      <RecordForm />
    </RecordLayout>
  );
}