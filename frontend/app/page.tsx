import Image from "next/image";
import RegisterPage from "./(auth)/register/page";
import AuthNavbar from "@/components/layout/authNavbar";
import AdminLogin from "./(auth)/adminLogin/page";

export default function Home() {
  return (
    <div>
      <main>
        <AuthNavbar></AuthNavbar>
       <AdminLogin></AdminLogin>
      </main>
    </div>
  );
}
