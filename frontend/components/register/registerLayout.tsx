
import Link from "next/link";
import { ReactNode } from "react";

interface RegisterLayoutProps {
  children: ReactNode;
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-6 overflow-hidden">

      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">

        <div className="grid lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center p-12 text-white">

            <div className="mb-8">
              <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
                🚀
              </div>
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Build Faster.
              <br />
              Manage Better.
            </h1>

            <p className="mt-6 text-lg text-slate-300">
              Join thousands of users managing products,
              inventory and workflows with a modern
              management platform.
            </p>

            <div className="mt-10 space-y-4">

              <div className="rounded-2xl bg-white/10 p-5">
                <h3 className="font-semibold">
                  🔐 Secure Authentication
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  JWT based login and protected routes.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5">
                <h3 className="font-semibold">
                  📦 Product Management
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  Create, update, delete and restore products.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5">
                <h3 className="font-semibold">
                  ⚡ Lightning Fast
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  Optimized UI built with Next.js and Tailwind CSS.
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="bg-white p-8 lg:p-12 flex items-center">
            <div className="w-full">
              {children}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
