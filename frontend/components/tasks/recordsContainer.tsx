"use client";

import { useEffect, useMemo, useState } from "react";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";



import { toast } from "react-toastify";
import RecordSkeleton from "../common/loading/taskSkeleton";
import RecordHeader from "./taskDetails/taskHeader";
import RecordFilter from "./viewTasks/taskFilter";
import RecordGrid from "./viewTasks/taskGrid";
import Pagination from "../common/pagination";
import RecordEmpty from "./viewTasks/taskEmpty";
import { TaskType } from "@/types/task";

export default function RecordsContainer() {
  const [records, setRecords] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState<
    "admin" | "manager" | "employee"
  >("employee");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 6;

useEffect(() => {
  const fetchData = async () => {
    try {
      const userResponse = await AxiosInstance.get(
        endPoints.common.getUser
      );

      const userRole = userResponse.data.data.role;

      setRole(userRole);

      const endpoint =
        userRole === "employee"
          ? endPoints.records.assignedToUser
          : endPoints.records.list;

      const recordResponse = await AxiosInstance.get(
        endpoint
      );

      setRecords(recordResponse.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, priority]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const titleMatch = record.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        !status || record.status === status;

      const priorityMatch =
        !priority ||
        record.priority === priority;

      return (
        titleMatch &&
        statusMatch &&
        priorityMatch
      );
    });
  }, [records, search, status, priority]);

  const totalPages = Math.ceil(
    filteredRecords.length / recordsPerPage
  );

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const deleteRecord = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(
      endPoints.records.delete(id)
    );

    setRecords((previous) =>
      previous.filter(
        (record) => record._id !== id
      )
    );

    toast.success(
      response.data.message ||
        "Record deleted successfully."
    );
  } catch (error: any) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Unable to delete record."
    );
  }
};

const updateStatus = async (
  id: string,
  status: string
) => {
  try {
    const response = await AxiosInstance.patch(
      endPoints.records.updateStatus(id),
      {
        status,
      }
    );

    setRecords((previous) =>
      previous.map((record) =>
        record._id === id
          ? {
              ...record,
              status,
            }
          : record
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
    return <RecordSkeleton />;
  }

  return (
    <div className="space-y-6">
      <RecordHeader
        role={role}
        search={search}
        setSearch={setSearch}
        totalRecords={filteredRecords.length}
      />

      <RecordFilter
        status={status}
        priority={priority}
        setStatus={setStatus}
        setPriority={setPriority}
      />

      {filteredRecords.length ? (
        <>
          <RecordGrid
  records={paginatedRecords}
  role={role}
  onDelete={deleteRecord}
  onStatusChange={updateStatus}
/>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <RecordEmpty />
      )}
    </div>
  );
}