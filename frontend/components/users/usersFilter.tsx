interface UsersFilterProps {
  role: string;
  status: string;
  setRole: (value: string) => void;
  setStatus: (value: string) => void;
}

export default function UsersFilter({
  role,
  status,
  setRole,
  setStatus,
}: UsersFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 rounded-3xl bg-white p-6 shadow-sm">
      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        className="rounded-xl border p-3"
      >
        <option value="">All Roles</option>

        <option value="admin">Admin</option>

        <option value="manager">
          Manager
        </option>

        <option value="employee">
          Employee
        </option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="rounded-xl border p-3"
      >
        <option value="">All Users</option>

        <option value="active">
          Active
        </option>

        <option value="inactive">
          Inactive
        </option>
      </select>
    </div>
  );
}