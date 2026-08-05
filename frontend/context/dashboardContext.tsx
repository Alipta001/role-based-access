"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface DashboardStats {
  totalUsers: number;
  totalManagers: number;
  totalEmployees: number;
  totalRecords: number;
}

interface DashboardContextType {
  stats: DashboardStats;
  setStats: React.Dispatch<
    React.SetStateAction<DashboardStats>
  >;
}

const DashboardContext =
  createContext<DashboardContextType | null>(
    null
  );

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalManagers: 0,
    totalEmployees: 0,
    totalRecords: 0,
  });

  return (
    <DashboardContext.Provider
      value={{
        stats,
        setStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(
    DashboardContext
  );

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}