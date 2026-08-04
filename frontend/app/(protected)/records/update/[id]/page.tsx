import RecordFormLayout from "@/components/records/createRecord/recordFormLayout";
import EditRecordForm from "@/components/records/updateRecord/editRecordForm";

export default function UpdateRecordPage() {
  return (
    <RecordFormLayout
      title="Update Record"
      subtitle="Modify an existing record."
    >
      <EditRecordForm />
    </RecordFormLayout>
  );
}