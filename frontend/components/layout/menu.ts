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
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

export type DashboardRole = "admin" | "manager" | "employee";

export type Permission =
  | "create_user"
  | "view_user"
  | "create_record"
  | "read_record"
  | "update_record"
  | "delete_record";

export interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
  permission?: Permission;
}

export const adminMenu: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/adminDashboard",
    icon: FiHome,
    permission: "view_user",
  },

  {
    name: "Users",
    href: "/users",
    icon: FiUsers,
    permission: "view_user",
  },

  // {
  //   name: "Managers",
  //   href: "/managers",
  //   icon: FiUserCheck,
  //   permission: "view_user",
  // },

  // {
  //   name: "Employees",
  //   href: "/employees",
  //   icon: FiUsers,
  //   permission: "view_user",
  // },

  {
    name: "Tasks",
    href: "/tasks/viewTasks",
    icon: FiClipboard,
    permission: "read_record",
  },

  {
    name: "Create Tasks",
    href: "/tasks/createTasks",
    icon: FiPlusCircle,
    permission: "create_record",
  },

  // {
  //   name: "Update Record",
  //   href: "/records/update",
  //   icon: FiEdit,
  //   permission: "update_record",
  // },

  // {
  //   name: "Delete Record",
  //   href: "/records/delete",
  //   icon: FiTrash2,
  //   permission: "delete_record",
  // },

  {
    name: "Analytics",
    href: "/analytics",
    icon: FiBarChart2,
  },

  {
    name: "Reports",
    href: "/reports",
    icon: FiFileText,
  },

  {
    name: "Settings",
    href: "/settings",
    icon: FiSettings,
  },
];

export const managerMenu: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/managerDashboard",
    icon: FiHome,
  },

  {
    name: "Records",
    href: "/records/viewRecords",
    icon: FiClipboard,
    permission: "read_record",
  },

  {
    name: "Create Record",
    href: "/records/create",
    icon: FiPlusCircle,
    permission: "create_record",
  },

  {
    name: "Update Record",
    href: "/records/update",
    icon: FiEdit,
    permission: "update_record",
  },

  {
    name: "Reports",
    href: "/reports",
    icon: FiFileText,
  },
];

export const employeeMenu: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/employeeDashboard",
    icon: FiHome,
  },

  {
    name: "My Records",
    href: "/records/viewRecords",
    icon: FiClipboard,
    permission: "read_record",
  },

  {
    name: "Profile",
    href: "/profile",
    icon: FiUser,
  },
];
