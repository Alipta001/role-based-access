"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

interface Props {
  open: boolean;
  loading: boolean;
  user: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function EditProfileModal({
  open,
  loading,
  user,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        department: user.department,
      });
    }
  }, [user, reset]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Edit Profile
          </h2>

          <button onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-500"
          />

          <input
            {...register("phone")}
            placeholder="Phone"
            className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-500"
          />

          <input
            {...register("department")}
            placeholder="Department"
            className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-500"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-white"
            >
              {loading
                ? "Updating..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}