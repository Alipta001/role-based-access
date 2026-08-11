// // app/forgotPassword/page.tsx

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { Mail, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
// import { toast } from "react-toastify";

// import { authService } from "@/api/services";

// interface ForgotPasswordFormValues {
//   email: string;
// }

// export default function ForgotPasswordPage() {
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ForgotPasswordFormValues>();

//   const onSubmit = async (
//     data: ForgotPasswordFormValues
//   ) => {
//     try {
//       setLoading(true);

//       // Make sure your authService contains this method.
//       const response =
//         await authService.forgotPassword(data);

//       toast.success(
//         response.data.message ||
//           "Password reset link has been sent to your email."
//       );
//     } catch (error: any) {
//       console.error(
//         "Forgot password error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Unable to send password reset link."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
//       {/* Background decoration */}

//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

//         <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

//         <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/30 blur-3xl" />
//       </div>

//       {/* Card */}

//       <div className="relative w-full max-w-md">
//         <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_25px_80px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-8">
//           {/* Icon */}

//           <div className="mb-6 flex justify-center">
//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200">
//               <ShieldCheck
//                 size={30}
//                 className="text-white"
//               />
//             </div>
//           </div>

//           {/* Header */}

//           <div className="text-center">
//             <div className="mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
//               Account Recovery
//             </div>

//             <h1 className="text-3xl font-bold tracking-tight text-slate-900">
//               Forgot Password?
//             </h1>

//             <p className="mt-3 text-sm leading-6 text-slate-500">
//               No worries. Enter the email address associated
//               with your account and we'll send you a secure
//               password reset link.
//             </p>
//           </div>

//           {/* Form */}

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="mt-8 space-y-5"
//           >
//             <div>
//               <label
//                 htmlFor="email"
//                 className="mb-2 block text-sm font-semibold text-slate-700"
//               >
//                 Email Address
//               </label>

//               <div className="relative">
//                 <Mail
//                   size={18}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                 />

//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   autoComplete="email"
//                   {...register("email", {
//                     required: "Email address is required.",
//                     pattern: {
//                       value:
//                         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message:
//                         "Please enter a valid email address.",
//                     },
//                   })}
//                   className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:ring-4 ${
//                     errors.email
//                       ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                       : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
//                   }`}
//                 />
//               </div>

//               {errors.email && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Submit */}

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
//             >
//               {loading ? (
//                 <>
//                   <Loader2
//                     size={18}
//                     className="animate-spin"
//                   />
//                   Sending Reset Link...
//                 </>
//               ) : (
//                 "Send Reset Link"
//               )}
//             </button>
//           </form>

//           {/* Information */}

//           <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
//             <div className="flex gap-3">
//               <ShieldCheck
//                 size={19}
//                 className="mt-0.5 shrink-0 text-indigo-600"
//               />

//               <p className="text-xs leading-5 text-indigo-900">
//                 For your security, the password reset link
//                 will expire after 15 minutes.
//               </p>
//             </div>
//           </div>

//           {/* Back to login */}

//           <div className="mt-7 text-center">
//             <Link
//               href="/login"
//               className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
//             >
//               <ArrowLeft size={16} />
//               Back to Login
//             </Link>
//           </div>
//         </div>

//         {/* Footer */}

//         <p className="mt-6 text-center text-xs text-slate-400">
//           Secure account recovery
//         </p>
//       </div>
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Mail,
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";

import { authService } from "@/api/services";

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit = async (
    data: ForgotPasswordFormValues
  ) => {
    try {
      setLoading(true);

      // Call forgot-password API
      const response =
        await authService.resetPasswordLink(data);

      toast.success(
        response.data.message ||
          "Password reset link has been sent to your email."
      );
    } catch (error: any) {
      console.error(
        "Forgot password error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to send password reset link."
      );
    } finally {
      setLoading(false);
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
            <div className="mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              Account Recovery
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Forgot Password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              No worries. Enter the email address
              associated with your account and we'll
              send you a secure password reset link.
            </p>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  disabled={loading}
                  {...register("email", {
                    required:
                      "Email address is required.",

                    pattern: {
                      value:
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:
                        "Please enter a valid email address.",
                    },
                  })}
                  className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:ring-4 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit button */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Sending Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Security information */}

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
            <div className="flex gap-3">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-indigo-600"
              />

              <p className="text-xs leading-5 text-indigo-900">
                For your security, the password reset
                link will expire after 15 minutes.
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

        <p className="mt-6 text-center text-xs text-slate-400">
          Secure account recovery
        </p>
      </div>
    </main>
  );
}

