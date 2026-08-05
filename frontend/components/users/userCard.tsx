// "use client";

// import { FiMail, FiShield, FiUser } from "react-icons/fi";

// import { UserType } from "@/types/user";

// interface UserCardProps {
//   user: UserType;
// }

// export default function UserCard({
//   user,
// }: UserCardProps) {
//   return (
//     <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
//       <div className="flex items-start justify-between">
//         <div>
//           <h2 className="text-lg font-bold">
//             {user.name}
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             {user.email}
//           </p>
//         </div>

//         <span
//           className={`rounded-full px-3 py-1 text-xs font-semibold ${
//             user.isActive
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {user.status
//             ? "Active"
//             : "Inactive"}
//         </span>
//       </div>

//       <div className="mt-6 space-y-3">
//         <div className="flex items-center gap-2 text-slate-600">
//           <FiUser />

//           {user.name}
//         </div>

//         <div className="flex items-center gap-2 text-slate-600">
//           <FiMail />

//           {user.email}
//         </div>

//         <div className="flex items-center gap-2 text-slate-600">
//           <FiShield />

//           {user.role}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  FiMail,
  FiShield,
  FiUser,
  FiPower,
} from "react-icons/fi";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

import DeleteModal from "@/components/common/deleteModal";

import { UserType } from "@/types/user";

interface UserCardProps {
  user: UserType;

  onStatusChange?: (
    id: string,
    status: "active" | "inactive"
  ) => void;
}

export default function UserCard({
  user,
  onStatusChange,
}: UserCardProps) {
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] =
    useState(false);

  const handleToggleStatus = async () => {
    try {
      setLoading(true);

      await AxiosInstance.patch(
        endPoints.admin.users.toggleUserStatus(
          user._id
        )
      );

      const updatedStatus =
        user.status === "active"
          ? "inactive"
          : "active";

      onStatusChange?.(
        user._id,
        updatedStatus
      );

      toast.success(
        `User ${updatedStatus} successfully.`
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to change user status."
      );
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {user.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {user.email}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              user.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status === "active"
              ? "Active"
              : "Inactive"}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-slate-600">
            <FiUser />
            <span>{user.name}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <FiMail />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <FiShield />
            <span className="capitalize">
              {user.role}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <button
            disabled={loading}
            onClick={() => setOpenModal(true)}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium text-white transition ${
              user.status === "active"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <FiPower />

            {loading
              ? "Processing..."
              : user.status === "active"
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={openModal}
        title={
          user.status === "active"
            ? "Deactivate User"
            : "Activate User"
        }
        description={`Are you sure you want to ${
          user.status === "active"
            ? "deactivate"
            : "activate"
        } ${user.name}?`}
        onClose={() => setOpenModal(false)}
        onConfirm={handleToggleStatus}
      />
    </>
  );
}