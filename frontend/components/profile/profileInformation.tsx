import { UserType } from "@/types/user";

export default function ProfileInformation({
  user,
}: {
  user: UserType;
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-bold">
        Personal Information
      </h2>

      <div className="space-y-5">
        <Information
          title="Name"
          value={user.name}
        />

        <Information
          title="Email"
          value={user.email}
        />

        <Information
          title="Phone"
          value={user.phone}
        />

        <Information
          title="Department"
          value={user.department}
        />

        <Information
          title="Role"
          value={user.role}
        />
      </div>
    </div>
  );
}

function Information({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {
  return (
    <div>
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-1 font-medium text-slate-700">
        {value || "Not available"}
      </p>
    </div>
  );
}