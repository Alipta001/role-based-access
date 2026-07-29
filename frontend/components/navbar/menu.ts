import type { IconType } from "react-icons";
import {
  FiHome,
  FiClipboard,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiFileText,
  FiUserCheck,
  FiUser,
  FiPlusCircle,
} from "react-icons/fi";

export type DashboardRole = "admin" | "manager" | "employee";

export interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
}

export const adminMenu: MenuItem[] = [
  { name: "Dashboard", href: "/admin", icon: FiHome },
  { name: "Users", href: "/users", icon: FiUsers },
  { name: "Records", href: "/records", icon: FiClipboard },
  { name: "Analytics", href: "/analytics", icon: FiBarChart2 },
  { name: "Reports", href: "/reports", icon: FiFileText },
  { name: "Settings", href: "/settings", icon: FiSettings },
  { name: "Managers", href: "/managers", icon: FiUserCheck },
  { name: "Employees", href: "/employees", icon: FiUsers },
];

export const managerMenu: MenuItem[] = [
  { name: "Dashboard", href: "/manager", icon: FiHome },
  { name: "Records", href: "/records", icon: FiClipboard },
  { name: "Team", href: "/team", icon: FiUsers },
  { name: "Reports", href: "/reports", icon: FiFileText },
];

export const employeeMenu: MenuItem[] = [
  { name: "Dashboard", href: "/employee", icon: FiHome },
  { name: "My Records", href: "/records", icon: FiClipboard },
  { name: "Create Record", href: "/records/create", icon: FiPlusCircle },
  { name: "Profile", href: "/profile", icon: FiUser },
];