"use client";

import { FiMail, FiPhone } from "react-icons/fi";
import ProfileStatusBadge from "./profileStatusBadge";

import { UserType } from "@/types/user";

interface Props {
  user: UserType;
  onEdit: () => void;
}

export default function ProfileHeader({
  user,
  onEdit,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {user.name}
          </h1>

          <p className="mt-2 capitalize text-slate-500">
            {user.role}
          </p>

          <div className="mt-5 flex flex-wrap gap-5">
            <div className="flex items-center gap-2">
              <FiMail />

              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiPhone />

              <span>
                {user.phone || "Not available"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <ProfileStatusBadge
            status={user.status}
          />

          <button
            onClick={onEdit}
            className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}