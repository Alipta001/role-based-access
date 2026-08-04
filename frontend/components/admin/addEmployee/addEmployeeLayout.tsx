import { ArrowLeft, ShieldCheck, UserPlus } from "lucide-react";

import AddEmployeeForm from "./addEmployeeForm";

interface AddEmployeeLayoutProps {
  onBack?: () => void;
}

export default function AddUserLayout({ onBack }: AddEmployeeLayoutProps) {
  return (
    <section className="w-full">
      {/* Page Header */}
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <UserPlus size={23} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Add New Employee
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Create a new employee account and send temporary login credentials
            securely by email.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Form Card */}
        <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:p-7">
          <AddEmployeeForm />
        </div>

        {/* Information Card */}
        <aside className="h-fit rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50 to-white p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <ShieldCheck size={21} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            Account Setup
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            The employee account will be created with restricted access based on
            the employee role.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                1
              </span>

              <p className="text-sm leading-6 text-slate-600">
                Employee details are securely saved.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                2
              </span>

              <p className="text-sm leading-6 text-slate-600">
                Temporary credentials are sent by email.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                3
              </span>

              <p className="text-sm leading-6 text-slate-600">
                The employee must change the password during the first login.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
