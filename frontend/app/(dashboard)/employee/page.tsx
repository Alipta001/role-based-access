import DashboardLayout from "@/components/navbar/layout";

export default function EmployeeDashboard() {
  return (
    <DashboardLayout
      role="employee"
      user={{
        name: "Bob",
        email: "employee@gmail.com",
      }}
    >
      <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_16px_60px_-24px_rgba(15,23,42,0.32)] backdrop-blur-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Employee Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500">The workspace now stays aligned and compact across all screen sizes.</p>
      </div>
    </DashboardLayout>
  );
}