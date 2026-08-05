import LoginLayout from "@/components/login/loginLayout";
import LoginForm from "@/components/login/loginForm";

export default function ManagerLogin() {
  return (
    <LoginLayout
      title="Manager Login"
      subtitle="Manage inventory and employees."
    >
      <LoginForm
        heading="Manager Sign In"
        description="Enter your manager credentials."
        buttonText="Login as Manager"
        role="manager"
        redirectPath="/managerDashboard"
      />
    </LoginLayout>
  );
}