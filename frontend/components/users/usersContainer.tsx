"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import Pagination from "../common/pagination";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

import { UserType } from "@/types/user";

import UsersHeader from "./usersHeader";
import UsersFilter from "./usersFilter";
import UsersGrid from "./usersGrid";
import UserEmpty from "./userEmpty";

export default function UsersContainer() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, role, status]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await AxiosInstance.get(
        endPoints.admin.users.list
      );

      setUsers(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (
    id: string,
    status: "active" | "inactive"
  ) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user._id === id
          ? {
              ...user,
              status,
            }
          : user
      )
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const roleMatch =
        !role || user.role === role;

      const statusMatch =
        !status || user.status === status;

      return (
        searchMatch &&
        roleMatch &&
        statusMatch
      );
    });
  }, [users, search, role, status]);

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersHeader
        search={search}
        setSearch={setSearch}
        totalUsers={filteredUsers.length}
      />

      <UsersFilter
        role={role}
        status={status}
        setRole={setRole}
        setStatus={setStatus}
      />

      {filteredUsers.length > 0 ? (
        <>
          <UsersGrid
            users={paginatedUsers}
            onStatusChange={handleStatusChange}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <UserEmpty />
      )}
    </div>
  );
}