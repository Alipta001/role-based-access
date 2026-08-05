import { FiPaperclip } from "react-icons/fi";

export default function TaskAttachments() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="mb-6 text-xl font-semibold">
        Attachments
      </h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4">
          <FiPaperclip />
          payroll.pdf
        </div>
      </div>
    </div>
  );
}