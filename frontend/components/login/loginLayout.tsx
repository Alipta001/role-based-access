import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function LoginLayout({
  children,
  title = "Welcome Back",
  subtitle = "Sign in to access your dashboard, manage your account, and unlock premium features.",
}: LoginLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6">
      {/* Background effects */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* Container */}

      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
        <div className="grid lg:grid-cols-2">
          {/* Left side */}

          <div className="hidden flex-col justify-center p-12 text-white lg:flex">
            <span className="mb-4 text-sm uppercase tracking-widest text-indigo-300">
              Premium Experience
            </span>

            <h1 className="text-5xl font-bold leading-tight">{title}</h1>

            <p className="mt-6 text-lg text-slate-300">{subtitle}</p>

            <div className="mt-10 flex gap-4">
              <div className="rounded-xl bg-white/10 p-4">
                <h3 className="font-semibold">Secure</h3>

                <p className="text-sm text-slate-300">
                  Enterprise-grade authentication
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

          {/* Right side */}

          <div className="flex flex-col justify-center bg-white p-8 lg:p-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
