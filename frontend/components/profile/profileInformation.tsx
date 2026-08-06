"use client";

import {
  FiBriefcase,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUser,
} from "react-icons/fi";

import { UserType } from "@/types/user";

interface Props {
  user: UserType;
}

export default function ProfileInformation({
  user,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your account information and contact details.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <InformationCard
          icon={<FiUser />}
          title="Full Name"
          value={user.name}
        />

        <InformationCard
          icon={<FiMail />}
          title="Email Address"
          value={user.email}
        />

        <InformationCard
          icon={<FiPhone />}
          title="Phone Number"
          value={user.phone}
        />

        <InformationCard
          icon={<FiBriefcase />}
          title="Department"
          value={user.department}
        />

        <InformationCard
          icon={<FiShield />}
          title="Role"
          value={user.role}
          capitalize
        />

        <InformationCard
          icon={<FiMapPin />}
          title="Address"
          value={user.address}
        />
      </div>
    </div>
  );
}

interface InformationCardProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
  capitalize?: boolean;
}

function InformationCard({
  icon,
  title,
  value,
  capitalize = false,
}: InformationCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-200 hover:bg-white">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-400">
        {title}
      </p>

      <p
        className={`mt-2 text-base font-semibold text-slate-800 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value || "Not available"}
      </p>
    </div>
  );
}