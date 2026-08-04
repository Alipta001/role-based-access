interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export default function DashboardCard({
  title,
  value,
  description,
}: DashboardCardProps) {
  return (
    <div
      className="
        rounded-[2rem]
        border
        border-slate-200/80
        bg-white/80
        p-6
        shadow-[0_16px_60px_-24px_rgba(15,23,42,0.32)]
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      <p className="text-sm text-slate-500">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-slate-900">{value}</h2>

      {description && (
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      )}
    </div>
  );
}
