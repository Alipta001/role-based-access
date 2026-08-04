"use client";

import { useRouter } from "next/navigation";

import AddUserLayout from "@/components/admin/addEmployee/addEmployeeLayout";

export default function AddUserPage() {
  const router = useRouter();

  return (
    <AddUserLayout
      onBack={() =>
        router.push("/adminDashboard")
      }
    />
  );
}