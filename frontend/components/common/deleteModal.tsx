"use client";

import { FiAlertTriangle, FiX } from "react-icons/fi";

interface DeleteModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  confirmText?: string;
  loadingText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  isOpen,
  title = "Delete item",
  description = "This action cannot be undone.",
  loading = false,
  confirmText = "Delete",
  loadingText = "Deleting...",
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-red-100 p-3">
              <FiAlertTriangle
                size={22}
                className="text-red-600"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              {title}
            </h2>
          </div>

          <button onClick={onClose}>
            <FiX
              size={20}
              className="text-slate-500 transition hover:text-slate-700"
            />
          </button>
        </div>

        <div className="p-6">
          <p className="leading-7 text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
          >
            {loading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}