import * as taskService from "@/api/services/taskService";
import * as userService from "@/api/services/userService";

export async function fetchAdminDashboardStats() {
  const [usersResponse, tasksResponse] = await Promise.all([
    userService.fetchUsers(),
    taskService.fetchAllTasks(),
  ]);

  const users = Array.isArray(usersResponse.data.data)
    ? usersResponse.data.data
    : [];
  const tasks = Array.isArray(tasksResponse.data.data)
    ? tasksResponse.data.data
    : [];

  return {
    users,
    tasks,
  };
}
