import Link from "next/link";
import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  registerLink?: string;
}

export default function LoginLayout({
  children,
  title = "Welcome Back",
  subtitle = "Sign in to access your dashboard, manage your account, and unlock premium features.",
  registerLink = "/register",
}: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="grid lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center p-12 text-white">
            <span className="mb-4 text-sm uppercase tracking-widest text-indigo-300">
              Premium Experience
            </span>

            <h1 className="text-5xl font-bold leading-tight">
              {title}
            </h1>

            <p className="mt-6 text-slate-300 text-lg">
              {subtitle}
            </p>

            <div className="mt-10 flex gap-4">
              <div className="rounded-xl bg-white/10 p-4">
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-slate-300">
                  Enterprise grade authentication
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <h3 className="font-semibold">Fast</h3>
                <p className="text-sm text-slate-300">
                  Optimized user experience
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
            {children}

            <div className="mt-6 text-center">
              <p className="text-gray-500">
                Don't have an account?
              </p>

              <Link
                href={registerLink}
                className="
                  inline-block
                  mt-3
                  px-6
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  text-white
                  font-semibold
                  hover:from-indigo-700
                  hover:to-purple-700
                  transition
                "
              >
                Create Account
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}