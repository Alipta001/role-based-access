"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";
import { authService } from "@/api/services";



interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();

  const userId = params.userId as string;
  const token = params.token as string;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>();

  const newPassword = watch("newPassword", "");

  const onSubmit = async (
  data: ResetPasswordFormValues
) => {
  try {
    const response = await authService.resetPassword(
      userId,
      token,
      data
    );

    toast.success(
      response.data.message ||
        "Password reset successful!"
    );

    const role = response.data.data?.role;

    let loginPath = "/login";

    switch (role) {
      case "admin":
        loginPath = "/adminLogin";
        break;

      case "manager":
        loginPath = "/managerLogin";
        break;

      case "employee":
        loginPath = "/employeeLogin";
        break;

      default:
        loginPath = "/login";
    }

    setTimeout(() => {
      router.push(loginPath);
    }, 1500);
  } catch (error: any) {
    console.error(
      "Reset password error:",
      error
    );

    toast.error(
      error?.response?.data?.message ||
        "Unable to reset password."
    );
  }
};

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      {/* Background decoration */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      {/* Main card */}

      <div className="relative w-full max-w-md">
        <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_25px_80px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-8">
          {/* Icon */}

          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200">
              <ShieldCheck
                size={30}
                className="text-white"
              />
            </div>
          </div>

          {/* Header */}

          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <ShieldCheck size={14} />
              Secure Account Recovery
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Reset Password
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Create a new password for your account.
              Make sure your new password is secure and
              easy for you to remember.
            </p>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            {/* New Password */}

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                New Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="newPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  {...register("newPassword", {
                    required:
                      "New password is required.",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters.",
                    },
                  })}
                  className={`h-12 w-full rounded-xl border bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:ring-4 ${
                    errors.newPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required:
                      "Please confirm your password.",
                    validate: (value) =>
                      value === newPassword ||
                      "Passwords do not match.",
                  })}
                  className={`h-12 w-full rounded-xl border bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:ring-4 ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">
                  {
                    errors.confirmPassword
                      .message
                  }
                </p>
              )}
            </div>

            {/* Password requirements */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Password requirements
              </p>

              <div className="space-y-2">
                <Requirement
                  valid={newPassword.length >= 6}
                  text="At least 6 characters"
                />

                <Requirement
                  valid={
                    newPassword.length > 0 &&
                    newPassword ===
                      watch("confirmPassword", "")
                  }
                  text="Passwords match"
                />
              </div>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Resetting Password...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Reset Password
                </>
              )}
            </button>
          </form>

          {/* Security notice */}

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
            <div className="flex gap-3">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-indigo-600"
              />

              <p className="text-xs leading-5 text-indigo-900">
                For your security, reset links expire
                after 15 minutes. If your link has
                expired, please request a new one.
              </p>
            </div>
          </div>

          {/* Back to login */}

          <div className="mt-7 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <CheckCircle2 size={14} />
          Secure password recovery
        </div>
      </div>
    </main>
  );
}

function Requirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          valid
            ? "bg-emerald-500"
            : "border border-slate-300 bg-white"
        }`}
      >
        {valid && (
          <CheckCircle2
            size={12}
            className="text-white"
          />
        )}
      </div>

      <span
        className={`text-xs ${
          valid
            ? "text-emerald-600"
            : "text-slate-500"
        }`}
      >
        {text}
      </span>
    </div>
  );
}