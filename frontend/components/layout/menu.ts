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
  | "create_task"
  | "read_task"
  | "update_task"
  | "delete_task";

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
    href: "/tasks/viewAllTasks",
    icon: FiClipboard,
    permission: "read_task",
  },

  {
    name: "Create Tasks",
    href: "/tasks/createTasks",
    icon: FiPlusCircle,
    permission: "create_task",
  },

  // {
  //   name: "Update Task",
  //   href: "/tasks/update",
  //   icon: FiEdit,
  //   permission: "update_task",
  // },

  // {
  //   name: "Delete Task",
  //   href: "/tasks/delete",
  //   icon: FiTrash2,
  //   permission: "delete_task",
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
    name: "Tasks",
    href: "/tasks/viewAllTasks",
    icon: FiClipboard,
    permission: "read_task",
  },

  {
    name: "Create Task",
    href: "/tasks/createTasks",
    icon: FiPlusCircle,
    permission: "create_task",
  },

  // {
  //   name: "Update Task",
  //   href: "/tasks/update",
  //   icon: FiEdit,
  //   permission: "update_task",
  // },

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
    name: "My Tasks",
    href: "/tasks/viewAllTasks",
    icon: FiClipboard,
    permission: "read_task",
  },

  {
    name: "Profile",
    href: "/profile",
    icon: FiUser,
  },
];
