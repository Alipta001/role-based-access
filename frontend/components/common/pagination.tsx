"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const createPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);

    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = createPages();

  return (
    <div className="mt-8 space-y-5">
      {/* top section */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {totalItems !== undefined && (
          <p className="text-sm text-slate-500">
            Showing page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span> ({totalItems}{" "}
            tasks)
          </p>
        )}

        {onPageSizeChange && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Rows</span>

            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="
                rounded-xl
                border
                border-slate-200
                px-3
                py-2
                text-sm
                outline-none
                focus:border-indigo-500
              "
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* bottom section */}

      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* previous */}

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            transition
            hover:border-indigo-400
            disabled:opacity-40
          "
        >
          <FiChevronLeft />
        </button>

        {/* numbers */}

        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`
                flex
                h-10
                min-w-[40px]
                items-center
                justify-center
                rounded-xl
                px-3
                text-sm
                font-semibold
                transition

                ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-400"
                }
              `}
            >
              {page}
            </button>
          ),
        )}

        {/* next */}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            transition
            hover:border-indigo-400
            disabled:opacity-40
          "
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
