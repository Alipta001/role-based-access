interface Props {
  status: "active" | "inactive" | "blocked";
}

export default function ProfileStatusBadge({
  status,
}: Props) {
  const styles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-yellow-100 text-yellow-700",
    blocked: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}