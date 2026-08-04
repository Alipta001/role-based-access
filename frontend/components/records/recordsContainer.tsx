"use client";

import { useEffect, useMemo, useState } from "react";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

import RecordHeader from "./viewRecords/recordHeader";
import RecordFilter from "./viewRecords/recordFilter";
import RecordGrid from "./viewRecords/recordGrid";
import RecordEmpty from "./viewRecords/recordEmpty";
import RecordSkeleton from "../common/loading/recordSkeleton";
import Pagination from "../common/pagination";

import { RecordType } from "@/types/record";

export default function RecordsContainer() {
  const [records, setRecords] = useState<RecordType[]>([]);
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
        const [userResponse, recordResponse] =
          await Promise.all([
            AxiosInstance.get(
              endPoints.common.getUser
            ),
            AxiosInstance.get(
              endPoints.records.list
            ),
          ]);

        setRole(userResponse.data.data.role);

        setRecords(recordResponse.data.data || []);
      } catch (error) {
        console.error(error);
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
      await AxiosInstance.delete(
        endPoints.records.delete(id)
      );

      setRecords((previous) =>
        previous.filter(
          (record) => record._id !== id
        )
      );
    } catch (error) {
      console.error(error);
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