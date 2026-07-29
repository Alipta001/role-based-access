"use client";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  role?: string;
  redirectPath?: string;
}

export default function LoginForm({
  heading = "Welcome Back",
  description = "Enter your credentials to continue",
  buttonText = "Sign In",
  role = "",
  redirectPath = "/adminDashboard",
}: LoginFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const pathName = usePathname();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      let response;

      switch (pathName) {
        case "/adminLogin":
          response = await AxiosInstance.post(
            endPoints.admin.auth.login,
            {
              email: data.email,
              password: data.password,
            },
            {
              withCredentials: true,
            }
          );

          alert(response.data.message);
          router.push("/adminDashboard");
          break;

        case "/managerLogin":
          response = await AxiosInstance.post(
            endPoints.manager.auth.login,
            {
              email: data.email,
              password: data.password,
            },
            {
              withCredentials: true,
            }
          );

          alert(response.data.message);
          router.push("/manager");
          break;

        case "/employeeLogin":
          response = await AxiosInstance.post(
            endPoints.employee.auth.login,
            {
              email: data.email,
              password: data.password,
            },
            {
              withCredentials: true,
            }
          );

          alert(response.data.message);
          router.push("/employee");
          break;

        default:
          alert("Invalid login page.");
      }
    } catch (error: unknown) {
      console.error(error);

      const message =
        typeof error === "object" && error !== null && "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Login Failed";

      alert(message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800">
        {heading}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
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
  className="
    w-full
    rounded-xl
    border
    border-slate-300
    bg-white
    px-4
    py-3
    text-slate-800
    placeholder:text-slate-400
    placeholder:font-medium
    outline-none
    transition-all
    duration-200
    focus:border-indigo-500
    focus:ring-4
    focus:ring-indigo-100
  "
/>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Password
          </label>

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
  className="
    w-full
    rounded-xl
    border
    border-slate-300
    bg-white
    px-4
    py-3
    text-slate-800
    placeholder:text-slate-400
    placeholder:font-medium
    outline-none
    transition-all
    duration-200
    focus:border-indigo-500
    focus:ring-4
    focus:ring-indigo-100
  "
/>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          {isSubmitting ? "Please wait..." : buttonText}
        </button>
      </form>
    </div>
  );
}