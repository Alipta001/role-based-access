"use client";

import { authService } from "@/api/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FiUser,
  FiMail,
  FiLock,
  FiUsers,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

interface RegisterFormValues {
  name: string;
  email: string;
  role: "employee" | "manager" | "admin";
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      role: "employee",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await authService.registerAdmin({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      if (response.data.status) {
        alert(response.data.message || "Registration Successful!");
        if (response.data.data.role === "employee") {
          router.push("/employeeLogin");
        }

        if (response.data.data.role === "admin") {
          router.push("/adminLogin");
        }

        if (response.data.data.role === "manager") {
          router.push("/managerLogin");
        }
      }
    } catch (error: unknown) {
      console.error(error);

      const message =
        typeof error === "object" && error !== null && "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Registration failed";

      alert(message);
    }
  };

  
  return (
    <div>
      <h2 className="text-4xl font-extrabold text-slate-800">
        Create Your Account
      </h2>

      <p className="mt-3 text-slate-500 leading-relaxed">
        Join our Inventory Management System and start managing your products
        efficiently.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* Name */}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <div className="relative">
            <FiUser
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Your Name"
              {...register("name", {
                required: "Name is required",
              })}
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-white
                text-gray-900
placeholder:text-gray-500
placeholder:font-medium
                py-3
                pl-12
                pr-4
                outline-none
                transition-all
                duration-300
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                focus:bg-white
              "
            />
          </div>

          {errors.name && (
            <p className="text-sm font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="relative">
            <FiMail
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-white
                text-gray-900
placeholder:text-gray-500
placeholder:font-medium
                py-3
                pl-12
                pr-4
                outline-none
                transition-all
                duration-300
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                focus:bg-white
              "
            />
          </div>

          {errors.email && (
            <p className="text-sm font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Role */}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Select Role
          </label>

          <div className="relative">
            <FiUsers
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
              "
            />

            <select
              {...register("role", {
                required: "Role is required",
              })}
              className="
                w-full
                appearance-none
                rounded-2xl
                border
                border-gray-200
                bg-white
                text-gray-900
placeholder:text-gray-500
placeholder:font-medium
                py-3
                pl-12
                pr-4
                outline-none
                transition-all
                duration-300
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                focus:bg-white
              "
            >
              <option value="employee">Employee</option>

              <option value="manager">Manager</option>

              <option value="admin">Admin</option>
            </select>
          </div>

          {errors.role && (
            <p className="text-sm font-medium text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
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
                border-gray-300
                bg-white
                py-3
                pl-12
                pr-12
                text-gray-900
                placeholder:text-gray-500
                placeholder:text-sm
                outline-none
                focus:ring-4
                focus:ring-indigo-100
                focus:border-indigo-500
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Confirm Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                py-3
                pl-12
                pr-12
                text-gray-900
                placeholder:text-gray-500
                placeholder:text-sm
                outline-none
                focus:ring-4
                focus:ring-indigo-100
                focus:border-indigo-500
                "
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            via-violet-600
            to-purple-600
            py-4
            text-lg
            font-semibold
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
            active:scale-[0.98]
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:hover:translate-y-0
          "
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Divider */}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              Already registered?
            </span>
          </div>
        </div>

        {/* Login Link */}

        <Link
          href="/employeeLogin"
          className="
            block
            w-full
            rounded-2xl
            border
            border-indigo-200
            bg-indigo-50
            py-4
            text-center
            text-lg
            font-semibold
            text-indigo-700
            transition-all
            duration-300
            hover:border-indigo-500
            hover:bg-indigo-100
          "
        >
          Sign In Instead
        </Link>
      </form>
    </div>
  );
}
