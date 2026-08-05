"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-red-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-red-700">Unable to load dashboard</h1>
        <p className="mt-4 text-slate-600">Please refresh or sign in again.</p>
        <button
          onClick={() => router.refresh()}
          className="mt-8 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
