import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsInfo: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsInfo
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center">
      <div className="text-sm text-gray-700 mb-4 sm:mb-0">{itemsInfo}</div>
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-sm">
          Página {currentPage} de {totalPages || 1}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="pagination-button"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};
