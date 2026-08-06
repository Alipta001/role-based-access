"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FiMapPin,
  FiPhone,
  FiUser,
  FiBriefcase,
  FiX,
} from "react-icons/fi";

interface FormValues {
  name: string;
  phone: string;
  address: string;
  department: string;
}

interface Props {
  open: boolean;
  loading: boolean;
  user: FormValues;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
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
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        department: user.department || "",
      });
    }
  }, [user, reset]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-slate-100"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Form */}

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                {...register("name", {
                  required: "Name is required",
                })}
                className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="Enter your name"
              />
            </div>

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone Number
            </label>

            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                {...register("phone")}
                className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Department */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Department
            </label>

            <div className="relative">
              <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                {...register("department")}
                className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="Enter department"
              />
            </div>
          </div>

          {/* Address */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Address
            </label>

            <div className="relative">
              <FiMapPin className="absolute left-4 top-5 text-slate-400" />

              <textarea
                rows={4}
                {...register("address")}
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
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