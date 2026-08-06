"use client";

import { FiPaperclip } from "react-icons/fi";

import { TaskType } from "@/types/task";

interface Props {
  task: TaskType;
}

export default function TaskAttachments({
  task,
}: Props) {
  const attachments = task.attachments || [];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="mb-6 text-xl font-semibold">
        Attachments
      </h2>

      {attachments.length ? (
        <div className="space-y-3">
          {attachments.map(
            (
              attachment: string,
              index: number
            ) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-slate-100 p-4"
              >
                <FiPaperclip />

                <a
                  href={attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600"
                >
                  Attachment {index + 1}
                </a>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-slate-500">
          No attachments found.
        </p>
      )}
    </div>
  );
}