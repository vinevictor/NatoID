import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  firstItem: number;
  lastItem: number;
  totalItems: number;
}

export const PaginationControls = React.memo(
  ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
    firstItem,
    lastItem,
    totalItems
  }: PaginationControlsProps) => (
    <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center">
      <div className="text-sm text-gray-700 mb-4 sm:mb-0">
        Mostrando <span className="font-medium">{firstItem}</span> a{" "}
        <span className="font-medium">{lastItem}</span> de{" "}
        <span className="font-medium">{totalItems}</span> clientes
      </div>
      <div className="flex items-center space-x-1">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="px-3 py-1 rounded-md bg-white text-gray-700">{`Página ${currentPage} de ${
          totalPages || 1
        }`}</span>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  )
);

PaginationControls.displayName = "PaginationControls";
