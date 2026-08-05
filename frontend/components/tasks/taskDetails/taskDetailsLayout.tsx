import RecordAttachments from "./taskAttachments";
import RecordDescription from "./taskDescription";
import RecordDetails from "./taskDetails";
import RecordHeader from "./taskHeader";
import RecordMetadata from "./taskMetadata";

export default function RecordDetailsLayout() {
  return (
    <div className="space-y-6">
      <RecordHeader />

      <RecordDescription />

      <div className="grid gap-6 xl:grid-cols-2">
        <RecordDetails />
        <RecordMetadata />
      </div>

      <RecordAttachments />
    </div>
  );
}