export interface UserType {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  role: "admin" | "manager" | "employee";
  status: "active" | "inactive" | "blocked";
  firstLogin: boolean;
  isVerified: boolean;
  createdAt: string;
}