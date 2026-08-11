// "use client";

// import { authService } from "@/api/services";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// interface LoginFormValues {
//   email: string;
//   password: string;
// }

// interface LoginFormProps {
//   heading?: string;
//   description?: string;
//   buttonText?: string;
//   role?: "admin" | "manager" | "employee";
//   redirectPath?: string;
// }

// export default function LoginForm({
//   heading = "Welcome Back",
//   description = "Enter your credentials to continue",
//   buttonText = "Sign In",
//   role,
//   redirectPath,
// }: LoginFormProps) {
//   const router = useRouter();

//   const getRedirectPath = () => {
//     if (redirectPath) {
//       return redirectPath;
//     }

//     switch (role) {
//       case "admin":
//         return "/adminDashboard";
//       case "manager":
//         return "/managerDashboard";
//       case "employee":
//         return "/employeeDashboard";
//       default:
//         return "/";
//     }
//   };

//   const getLoginHandler = async (data: LoginFormValues) => {
//     switch (role) {
//       case "admin":
//         return authService.loginAdmin(data);
//       case "manager":
//         return authService.loginManager(data);
//       case "employee":
//         return authService.loginEmployee(data);
//       default:
//         throw new Error("Invalid login role.");
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormValues>();

//   const onSubmit = async (data: LoginFormValues) => {
//     try {
//       const response = await getLoginHandler(data);

//       toast.success(response.data.message);

//       setTimeout(() => {
//         if (response.data.data?.firstLogin) {
//           router.push("/changePassword");
//         } else {
//           router.push(getRedirectPath());
//         }
//       }, 1000);
//     } catch (error: any) {
//       console.error(error);

//       toast.error(
//         error?.response?.data?.message ||
//           "Login failed."
//       );
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-slate-800">
//         {heading}
//       </h2>

//       <p className="mt-2 text-slate-500">
//         {description}
//       </p>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="mt-8 space-y-5"
//       >
//         <div>
//           <label className="mb-2 block text-sm font-medium text-black">
//             Email Address
//           </label>

//           <input
//             type="email"
//             placeholder="john@example.com"
//             {...register("email", {
//               required: "Email is required",
//             })}
//             className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:font-medium placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//           />

//           {errors.email && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.email.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium text-black">
//             Password
//           </label>

//           <input
//             type="password"
//             placeholder="Enter your password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Minimum 6 characters",
//               },
//             })}
//             className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:font-medium placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//           />

//           {errors.password && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
//         >
//           {isSubmitting
//             ? "Please wait..."
//             : buttonText}
//         </button>
//       </form>
//     </div>
//   );
// }



"use client";

import { authService } from "@/api/services";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  role?: "admin" | "manager" | "employee";
  redirectPath?: string;
}

export default function LoginForm({
  heading = "Welcome Back",
  description = "Enter your credentials to continue",
  buttonText = "Sign In",
  role,
  redirectPath,
}: LoginFormProps) {
  const router = useRouter();

  const getRedirectPath = () => {
    if (redirectPath) {
      return redirectPath;
    }

    switch (role) {
      case "admin":
        return "/adminDashboard";

      case "manager":
        return "/managerDashboard";

      case "employee":
        return "/employeeDashboard";

      default:
        return "/";
    }
  };

  const getLoginHandler = async (data: LoginFormValues) => {
    switch (role) {
      case "admin":
        return authService.loginAdmin(data);

      case "manager":
        return authService.loginManager(data);

      case "employee":
        return authService.loginEmployee(data);

      default:
        throw new Error("Invalid login role.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await getLoginHandler(data);

      toast.success(response.data.message);

      setTimeout(() => {
        if (response.data.data?.firstLogin) {
          router.push("/changePassword");
        } else {
          router.push(getRedirectPath());
        }
      }, 1000);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Login failed."
      );
    }
  };

  const handleForgotPassword = () => {
    router.push("/resetPasswordLink");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        {heading}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:font-medium placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div className="text-right">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-black">
              Password
            </label>
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:font-medium placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
          <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
            >
              Forgot Password?
            </button>
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Please wait..." : buttonText}
        </button>
      </form>
    </div>
  );
}

