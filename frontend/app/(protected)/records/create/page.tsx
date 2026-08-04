import CreateRecordForm from "@/components/records/createRecord/createRecordForm";
import RecordFormLayout from "@/components/records/createRecord/recordFormLayout";

export default function CreateRecordPage() {
  return (
    <RecordFormLayout
      title="Create Record"
      subtitle="Create and assign a new record."
    >
      <CreateRecordForm />
    </RecordFormLayout>
  );
}