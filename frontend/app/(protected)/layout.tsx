"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/dashboard/layout";
import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

interface User {
  name: string;
  email: string;
  role: "admin" | "manager" | "employee";
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<User | null>(
    null
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await AxiosInstance.get(
          endPoints.common.getUser
        );

        const userData = response.data.data;

        setUser(userData);
      } catch (error) {
        console.error("User fetch failed:", error);

        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div
          className="
            h-12
            w-12
            animate-spin
            rounded-full
            border-4
            border-indigo-200
            border-t-indigo-600
          "
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout
      role={user.role}
      user={{
        name: user.name,
        email: user.email,
      }}
    >
      {children}
    </DashboardLayout>
  );
}