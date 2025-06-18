"use client";

import { PaginationControlType } from "@/src/types/PaginationControl.type";
import { usePaginationControls } from "./usePaginationControls";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlType) {
  const { visiblePages } = usePaginationControls(totalPages, currentPage);

  return (
    <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        Anterior
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        Próximo
      </button>
    </div>
  );
}
