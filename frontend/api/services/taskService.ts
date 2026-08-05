import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

export interface TaskPayload {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_to: string;
  due_date: string;
}

export async function fetchAllTasks() {
  return AxiosInstance.get(endPoints.tasks.list);
}

export async function fetchAssignedTasks() {
  return AxiosInstance.get(endPoints.tasks.assignedToUser);
}

export async function getTaskById(id: string) {
  return AxiosInstance.get(endPoints.tasks.getById(id));
}

export async function createTask(payload: TaskPayload) {
  return AxiosInstance.post(endPoints.tasks.create, payload);
}

export async function updateTask(id: string, payload: Partial<TaskPayload>) {
  return AxiosInstance.put(endPoints.tasks.update(id), payload);
}

export async function deleteTask(id: string) {
  return AxiosInstance.delete(endPoints.tasks.delete(id));
}

export async function updateTaskStatus(id: string, status: string) {
  return AxiosInstance.patch(endPoints.tasks.updateStatus(id), {
    status,
  });
}
