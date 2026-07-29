import LoginLayout from "@/components/login/loginLayout";
import LoginForm from "@/components/login/loginForm";

export default function EmployeeLogin() {
  return (
    <LoginLayout
      title="Employee Login"
      subtitle="Access your assigned work."
    >
      <LoginForm
        heading="Employee Sign In"
        description="Enter your employee credentials."
        buttonText="Login as Employee"
        role="employee"
        redirectPath="/employee"
      />
    </LoginLayout>
  );
}