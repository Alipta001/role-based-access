"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { taskService, userService } from "@/api/services";

import TaskSkeleton from "../common/loading/taskSkeleton";
import TaskHeader from "./viewTasks/taskHeader";
import TaskFilter from "./viewTasks/taskFilter";
import TaskGrid from "./viewTasks/taskGrid";
import Pagination from "../common/pagination";
import TaskEmpty from "./viewTasks/taskEmpty";

import { TaskType } from "@/types/task";

export default function TasksContainer() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState<
    "admin" | "manager" | "employee"
  >("employee");

  const [viewMode, setViewMode] = useState<
    "myTasks" | "teamTasks"
  >("myTasks");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userResponse =
          await userService.getCurrentUser();

        const userRole =
          userResponse.data.data.role;

        setRole(userRole);

        let taskResponse;

        if (userRole === "employee") {
          taskResponse =
            await taskService.fetchAssignedTasks();
        } else if (userRole === "manager") {
          taskResponse =
            viewMode === "myTasks"
              ? await taskService.fetchAssignedTasks()
              : await taskService.fetchAllTasks();
        } else {
          taskResponse =
            await taskService.fetchAllTasks();
        }

        setTasks(taskResponse.data.data || []);
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch tasks."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewMode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, priority]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const titleMatch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        !status || task.status === status;

      const priorityMatch =
        !priority ||
        task.priority === priority;

      return (
        titleMatch &&
        statusMatch &&
        priorityMatch
      );
    });
  }, [tasks, search, status, priority]);

  const totalPages = Math.ceil(
    filteredTasks.length / tasksPerPage
  );

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const deleteTask = async (id: string) => {
    try {
      const response =
        await taskService.deleteTask(id);

      setTasks((previous) =>
        previous.filter(
          (task) => task._id !== id
        )
      );

      toast.success(
        response.data.message ||
          "Task deleted successfully."
      );
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete task."
      );
    }
  };

  const updateStatus = async (
    id: string,
    status: TaskType["status"]
  ) => {
    try {
      const response =
        await taskService.updateTaskStatus(
          id,
          status
        );

      setTasks((previous) =>
        previous.map((task) =>
          task._id === id
            ? {
                ...task,
                status,
              }
            : task
        )
      );

      toast.success(
        response.data.message ||
          "Status updated successfully."
      );
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to update status."
      );
    }
  };

  if (loading) {
    return <TaskSkeleton />;
  }

  return (
    <div className="space-y-6">
      <TaskHeader
        role={role}
        search={search}
        setSearch={setSearch}
        totalTasks={filteredTasks.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <TaskFilter
        status={status}
        priority={priority}
        setStatus={setStatus}
        setPriority={setPriority}
      />

      {filteredTasks.length ? (
        <>
          <TaskGrid
            tasks={paginatedTasks}
            role={role}
            onDelete={deleteTask}
            onStatusChange={
              updateStatus
            }
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <TaskEmpty />
      )}
    </div>
  );
}