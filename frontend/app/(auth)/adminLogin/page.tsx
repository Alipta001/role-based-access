import LoginLayout from "@/components/login/loginLayout";
import LoginForm from "@/components/login/loginForm";

export default function AdminLogin() {
  return (
    <LoginLayout
      title="Admin Login"
      subtitle="Access the administrator dashboard."
    >
      <LoginForm
        heading="Admin Sign In"
        description="Enter your admin credentials."
        buttonText="Login as Admin"
        role="admin"
        redirectPath="/adminDashboard"
      />
    </LoginLayout>
  );
}