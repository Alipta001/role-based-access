import { UserType } from "@/types/user";

export default function ProfileSecurity({
  user,
}: {
  user: UserType;
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-bold">
        Security Information
      </h2>

      <div className="space-y-5">
        <Item
          title="Account Status"
          value={user.status}
        />

        <Item
          title="Email Verified"
          value={
            user.isVerified ? "Yes" : "No"
          }
        />

        <Item
          title="First Login"
          value={
            user.firstLogin ? "Yes" : "No"
          }
        />

        <Item
          title="Joined On"
          value={new Date(
            user.createdAt
          ).toLocaleDateString()}
        />
      </div>
    </div>
  );
}

function Item({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-1 font-medium capitalize text-slate-700">
        {value}
      </p>
    </div>
  );
}