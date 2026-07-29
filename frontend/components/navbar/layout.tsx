// // "use client";

// // import { useState } from "react";
// // import { usePathname, useRouter } from "next/navigation";
// // import Navbar from "./navbar";
// // import Sidebar from "./sidebar";
// // import MobileSidebar from "./mobileSidebar";
// // import { AxiosInstance } from "@/api/axios/axios";
// // import { endPoints } from "@/api/endpoints/endPoints";

// // interface DashboardLayoutProps {
// //   role: "admin" | "manager" | "employee";
// //   user: {
// //     name: string;
// //     email: string;
// //   };
// //   children: React.ReactNode;
// // }

// // export default function DashboardLayout({ role, user, children }: DashboardLayoutProps) {
// //   const router = useRouter();
// //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
// //   const pathName = usePathname()

// //   const handleLogout = async () => {
// //   try {
// //     if (pathName.startsWith("/admin")) {
// //       const response = await AxiosInstance.get(endPoints.admin.auth.logout);
// //       alert(response.data.message)
// //       router.replace("/adminLogin");
// //     } else if (pathName.startsWith("/manager")) {
// //       const response = await AxiosInstance.get(endPoints.manager.auth.logout);
// //       alert(response.data.message)
// //       router.replace("/managerLogin");
// //     } else if (pathName.startsWith("/employee")) {
// //       const response = await AxiosInstance.get(endPoints.employee.auth.logout);
// //       alert(response.data.message)
// //       router.replace("/employeeLogin");
// //     } else {
// //       router.replace("/employeeLogin");
// //     }
// //   } catch (error) {
// //     console.error("Logout failed:", error);
// //     alert("Logout Failed!")
// //   }
// // };

// //   return (
// //     <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.16),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#f3f6ff_100%)] text-slate-900">
// //       <Navbar role={role} user={user} onLogout={handleLogout} />
// //       <Sidebar
// //         role={role}
// //         user={user}
// //         collapsed={sidebarCollapsed}
// //         onCollapseChange={setSidebarCollapsed}
// //         onLogout={handleLogout}
// //       />
// //       <div className={`transition-all duration-300 xl:pl-[280px] ${sidebarCollapsed ? "xl:pl-20" : "xl:pl-[280px]"}`}>
// //         <div className="min-h-[calc(100vh-5rem)] overflow-x-hidden px-4 py-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10">
// //           <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col">
// //             <div className="flex-1 overflow-x-hidden">
// //               {children}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="fixed right-4 top-20 z-40 xl:hidden">
// //         <MobileSidebar role={role} user={user} onLogout={handleLogout} />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { UserPlus, UsersRound } from "lucide-react";

// import Navbar from "./navbar";
// import Sidebar from "./sidebar";
// import MobileSidebar from "./mobileSidebar";

// import { AxiosInstance } from "@/api/axios/axios";
// import { endPoints } from "@/api/endpoints/endPoints";

// interface DashboardLayoutProps {
//   role: "admin" | "manager" | "employee";

//   user: {
//     name: string;
//     email: string;
//   };

//   children: React.ReactNode;
// }

// export default function DashboardLayout({
//   role,
//   user,
//   children,
// }: DashboardLayoutProps) {
//   const router = useRouter();

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const pathName = usePathname();

//   const handleLogout = async () => {
//     try {
//       if (pathName.startsWith("/admin")) {
//         const response = await AxiosInstance.get(
//           endPoints.admin.auth.logout
//         );

//         alert(response.data.message);

//         router.replace("/adminLogin");
//       } else if (pathName.startsWith("/manager")) {
//         const response = await AxiosInstance.get(
//           endPoints.manager.auth.logout
//         );

//         alert(response.data.message);

//         router.replace("/managerLogin");
//       } else if (pathName.startsWith("/employee")) {
//         const response = await AxiosInstance.get(
//           endPoints.employee.auth.logout
//         );

//         alert(response.data.message);

//         router.replace("/employeeLogin");
//       } else {
//         router.replace("/employeeLogin");
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);

//       alert("Logout Failed!");
//     }
//   };

//   const handleAddEmployee = () => {
//     router.push("/admin/addEmployee");
//   };

//   const handleAddManager = () => {
//     router.push("/admin/addManager");
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.16),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#f3f6ff_100%)] text-slate-900">
//       <Navbar
//         role={role}
//         user={user}
//         onLogout={handleLogout}
//       />

//       <Sidebar
//         role={role}
//         user={user}
//         collapsed={sidebarCollapsed}
//         onCollapseChange={setSidebarCollapsed}
//         onLogout={handleLogout}
//       />

//       <div
//         className={`transition-all duration-300 ${
//           sidebarCollapsed
//             ? "xl:pl-20"
//             : "xl:pl-[280px]"
//         }`}
//       >
//         <div className="min-h-[calc(100vh-5rem)] overflow-x-hidden px-4 py-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10">
//           <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col">

//             {/* Admin Action Buttons */}
//             {role === "admin" && (
//               <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
//                 <button
//                   type="button"
//                   onClick={handleAddEmployee}
//                   className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98]"
//                 >
//                   <UserPlus size={18} />

//                   Add Employee
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleAddManager}
//                   className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all duration-200 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98]"
//                 >
//                   <UsersRound size={18} />

//                   Add Manager
//                 </button>
//               </div>
//             )}

//             <div className="flex-1 overflow-x-hidden">
//               {children}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="fixed right-4 top-20 z-40 xl:hidden">
//         <MobileSidebar
//           role={role}
//           user={user}
//           onLogout={handleLogout}
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, UsersRound } from "lucide-react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import MobileSidebar from "./mobileSidebar";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

interface DashboardLayoutProps {
  role: "admin" | "manager" | "employee";

  user: {
    name: string;
    email: string;
  };

  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  user,
  children,
}: DashboardLayoutProps) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      if (role === "admin") {
        await AxiosInstance.get(endPoints.admin.auth.logout);

        router.replace("/adminLogin");
      } else if (role === "manager") {
        await AxiosInstance.get(endPoints.manager.auth.logout);

        router.replace("/managerLogin");
      } else {
        await AxiosInstance.get(endPoints.employee.auth.logout);

        router.replace("/employeeLogin");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-white
        to-indigo-50
        text-slate-900
      "
    >
      {/* Navbar */}

      <Navbar role={role} user={user} onLogout={handleLogout} />

      {/* Sidebar */}

      <Sidebar
        role={role}
        user={user}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
        onLogout={handleLogout}
      />

      {/* Main Content */}

      <main
        className={`
          pt-20
          transition-all
          duration-300
          ${collapsed ? "xl:pl-20" : "xl:pl-[280px]"}
        `}
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >
          {/* ADMIN ACTION BUTTONS */}

          {role === "admin" && (
  <div className="mb-6 flex justify-end">
    <button
      onClick={() => router.push("/addUser")}
      className="
        inline-flex
        items-center
        gap-2
        rounded-2xl
        bg-gradient-to-r
        from-indigo-600
        to-violet-600
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-indigo-200/50
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-xl
      "
    >
      <UserPlus size={18} />
      Add User
    </button>
  </div>
)}

          {children}
        </div>
      </main>

      {/* Mobile Sidebar */}

      <div
        className="
          fixed
          right-5
          top-24
          z-50
          xl:hidden
        "
      >
        <MobileSidebar role={role} user={user} onLogout={handleLogout} />
      </div>
    </div>
  );
}
