// src/components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  /**
   * @function getPageRange
   * @desc Generates an array of page numbers and ellipses for pagination display
   * @returns {Array<number | string>} An array containing page numbers and ellipses
   */
  const getPageRange = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    pages.push(1);

    // Left ellipsis
    if (currentPage > 4) {
      pages.push("...");
    }

    // Middle #
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Right ellipsis
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Last Page #
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getPageRange();

  return (
    <nav
      className="flex items-center justify-center gap-1 sm:gap-2 my-8 text-sm select-none"
      aria-label="Pagination Navigation"
    >
      {/* > Prev Btn */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2.5 sm:px-3 py-2 rounded-xl cursor-pointer bg-white border border-ash-brown-200 text-ash-brown-800 font-bold hover:bg-ash-brown-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs flex items-center gap-1 shrink-0"
        aria-label="Go to previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* > Page btns container */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
        {visiblePages.map((page, index) => {
          if (typeof page === "string") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-7 h-9 sm:w-8 sm:h-10 flex items-center justify-center text-ash-brown-500 font-bold text-xs sm:text-sm select-none"
              >
                •••
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shrink-0 ${
                isActive
                  ? "bg-ash-brown-950 text-cool-sky-300 shadow-sm border border-ash-brown-800"
                  : "bg-white text-ash-brown-800 border cursor-pointer border-ash-brown-200 hover:bg-ash-brown-100 hover:text-ash-brown-950"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* > Next Btn */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2.5 sm:px-3 py-2 rounded-xl cursor-pointer bg-white border border-ash-brown-200 text-ash-brown-800 font-bold hover:bg-ash-brown-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs flex items-center gap-1 shrink-0"
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;