// "use client";

// import UserCard from "./userCard";
// import { UserType } from "@/types/user";

// interface UsersGridProps {
//   users: UserType[];
// }

// export default function UsersGrid({
//   users,
// }: UsersGridProps) {
//   return (
//     <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//       {users.map((user) => (
//         <UserCard
//           key={user._id}
//           user={user}
//         />
//       ))}
//     </div>
//   );
// }


"use client";

import UserCard from "./userCard";

import { UserType } from "@/types/user";

interface UsersGridProps {
  users: UserType[];

  onStatusChange: (
    id: string,
    status: "active" | "inactive"
  ) => void;
}

export default function UsersGrid({
  users,
  onStatusChange,
}: UsersGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}