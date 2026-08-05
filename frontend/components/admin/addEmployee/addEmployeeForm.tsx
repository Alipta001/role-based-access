"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "react-toastify";
import { authService, userService } from "@/api/services";

export default function AddUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"employee" | "manager">("employee");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      department: String(formData.get("department") || ""),
      role: formData.get("role") === "manager" ? "manager" : "employee",
    } as const;

    try {
      const response = await userService.createUser(payload);

      if (response.data.status) {
        toast.success(response.data.message);

        // Reset form
        form.reset();

        // Reset role select to default
        setRole("employee");
      }
    } catch (error: unknown) {
      console.error("Error creating user:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
      ) {
        toast.error(
          (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
            "Failed to create user."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Create {role === "employee" ? "Employee" : "Manager"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below to create a new {role}.
        </p>
      </div>

      {/* Form */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Full Name */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="name"
              type="text"
              placeholder="Enter full name"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Phone Number */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Department */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Department
          </label>

          <div className="relative">
            <BriefcaseBusiness
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              name="department"
              defaultValue=""
              required
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="" disabled>
                Select Department
              </option>

              <option value="Development">Development</option>

              <option value="Design">Design</option>

              <option value="Marketing">Marketing</option>

              <option value="Sales">Sales</option>

              <option value="Human Resource (HR)">Human Resource (HR)</option>
            </select>
          </div>
        </div>

        {/* Role */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Role
          </label>

          <div className="relative">
            <ShieldCheck
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              name="role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "employee" | "manager")
              }
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="employee">Employee</option>

              <option value="manager">Manager</option>
            </select>
          </div>
        </div>
      </div>

      {/* Info */}

      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
        <p className="text-sm leading-6 text-indigo-800">
          The {role} will receive an email containing their generated login
          credentials. A secure password will be created automatically by the
          system, and they will be required to change it after their first
          successful login.
        </p>
      </div>

      {/* Buttons */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="h-12 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-12 min-w-44 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <User size={18} />
              Create {role === "employee" ? "Employee" : "Manager"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
