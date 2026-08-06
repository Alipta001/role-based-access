import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { UserType } from "@/types/user";

export interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: "employee" | "manager";
}

export async function createUser(payload: CreateUserPayload) {
  return AxiosInstance.post(endPoints.admin.users.add, payload);
}

export async function fetchUsers() {
  return AxiosInstance.get(endPoints.admin.users.list);
}

export async function fetchAssignableUsers() {
  return AxiosInstance.get(endPoints.admin.users.assignableUsers);
}

export async function toggleUserStatus(id: string) {
  return AxiosInstance.patch(endPoints.admin.users.toggleUserStatus(id));
}

export async function getUserById(id: string) {
  return AxiosInstance.get(endPoints.admin.users.getById(id));
}
export async function getCurrentUser() {
  return AxiosInstance.get(endPoints.common.getUser);
}

export async function updateUserDetails(payload: Partial<UserType>) {
  return AxiosInstance.put(endPoints.common.updateUserDetails, payload);
}

export async function deleteUser(id: string) {
  return AxiosInstance.delete(endPoints.admin.users.delete(id));
}
