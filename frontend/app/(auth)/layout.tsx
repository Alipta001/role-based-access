import type { ReactNode } from "react";
import AuthNavbar from "@/components/layout/authNavbar";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <AuthNavbar />
      <main>{children}</main>
    </>
  );
}