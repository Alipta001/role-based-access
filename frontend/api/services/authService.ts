// import { AxiosInstance } from "@/api/axios/axios";
// import { endPoints } from "@/api/endpoints/endPoints";
// import { Axios } from "axios";

// export interface LoginPayload {
//   email: string;
//   password: string;
// }

// export interface RegisterPayload {
//   name: string;
//   email: string;
//   password: string;
//   role: "employee" | "manager" | "admin";
// }

// export interface ChangePasswordPayload {
//   oldPassword: string;
//   newPassword: string;
// }

// export async function loginAdmin(data: LoginPayload) {
//   return AxiosInstance.post(endPoints.admin.auth.login, data, {
//     withCredentials: true,
//   });
// }

// export async function loginManager(data: LoginPayload) {
//   return AxiosInstance.post(endPoints.manager.auth.login, data, {
//     withCredentials: true,
//   });
// }

// export async function loginEmployee(data: LoginPayload) {
//   return AxiosInstance.post(endPoints.employee.auth.login, data, {
//     withCredentials: true,
//   });
// }

// export async function registerAdmin(data: RegisterPayload) {
//   return AxiosInstance.post(endPoints.admin.auth.register, data);
// }

// // export async function getCurrentUser() {
// //   return AxiosInstance.get(endPoints.common.getUser);
// // }

// export async function resetPasswordLink(data: RegisterPayload){
//   return AxiosInstance.post(endPoints.common.forgotPasswordLink, data)
// }

// export async function resetPassword(data: RegisterPayload){
//   return AxiosInstance.post(
//     `${endPoints.common.forgotPassword}/${userId}/${token}`,
//     data
//   );
// }

// export async function logout() {
//   return AxiosInstance.post(endPoints.common.logout);
// }

// export async function changePassword(payload: ChangePasswordPayload) {
//   return AxiosInstance.patch(endPoints.common.changePassword, payload);
// }


import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "employee" | "manager" | "admin";
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
}

/* =========================
   LOGIN
========================= */

export async function loginAdmin(
  data: LoginPayload
) {
  return AxiosInstance.post(
    endPoints.admin.auth.login,
    data,
    {
      withCredentials: true,
    }
  );
}

export async function loginManager(
  data: LoginPayload
) {
  return AxiosInstance.post(
    endPoints.manager.auth.login,
    data,
    {
      withCredentials: true,
    }
  );
}

export async function loginEmployee(
  data: LoginPayload
) {
  return AxiosInstance.post(
    endPoints.employee.auth.login,
    data,
    {
      withCredentials: true,
    }
  );
}

/* =========================
   REGISTER
========================= */

export async function registerAdmin(
  data: RegisterPayload
) {
  return AxiosInstance.post(
    endPoints.admin.auth.register,
    data
  );
}

/* =========================
   FORGOT PASSWORD
========================= */

export async function resetPasswordLink(
  data: { email: string }
) {
  return AxiosInstance.post(
    endPoints.common.forgotPasswordLink,
    data
  );
}

/* =========================
   RESET PASSWORD
========================= */

export async function resetPassword(
  userId: string,
  token: string,
  data: ResetPasswordPayload
) {
  return AxiosInstance.post(
    `${endPoints.common.forgotPassword}/${userId}/${token}`,
    data
  );
}

/* =========================
   LOGOUT
========================= */

export async function logout() {
  return AxiosInstance.post(
    endPoints.common.logout
  );
}

/* =========================
   CHANGE PASSWORD
========================= */

export async function changePassword(
  payload: ChangePasswordPayload
) {
  return AxiosInstance.patch(
    endPoints.common.changePassword,
    payload
  );
}